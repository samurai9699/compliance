import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '../lib/supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export function useSubscription() {
  const [loading, setLoading] = useState(false);

  const startSubscription = async () => {
    try {
      setLoading(true);
      
      // Call Supabase Edge Function to create Stripe checkout session
      const { data: { sessionId }, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { priceId: 'price_monthly_subscription' }
      });

      if (error) throw error;

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId
      });

      if (stripeError) throw stripeError;

    } catch (error) {
      console.error('Error starting subscription:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    startSubscription
  };
}