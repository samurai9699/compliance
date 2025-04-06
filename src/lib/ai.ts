import OpenAI from 'openai';
import { supabase } from './supabase';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function processRegulatoryUpdate(text: string) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a legal compliance expert. Analyze the following regulatory update and provide:
            1. A concise summary
            2. The category (GDPR, CCPA, ISO, or Other)
            3. The severity level (low, medium, high)
            Format the response as JSON with keys: summary, category, severity`
        },
        {
          role: 'user',
          content: text
        }
      ],
      model: 'gpt-3.5-turbo',
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');

    // Store the processed update
    const { error } = await supabase.from('ai_updates').insert({
      source_text: text,
      processed_summary: result.summary,
      category: result.category,
      severity: result.severity
    });

    if (error) throw error;

    return result;
  } catch (error) {
    console.error('Error processing regulatory update:', error);
    throw error;
  }
}