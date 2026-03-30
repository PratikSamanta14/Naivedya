import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const initializeStripe = async () => {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Failed to load Stripe');
    }
    return stripe;
  } catch (error) {
    console.error('Stripe initialization error:', error);
    throw error;
  }
};

export const createPaymentIntent = async (amount: number, currency: string = 'inr') => {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const { clientSecret } = await response.json();
    return clientSecret;
  } catch (error) {
    console.error('Payment intent creation error:', error);
    throw error;
  }
};

export const confirmPayment = async (clientSecret: string, paymentMethodId: string) => {
  try {
    const stripe = await initializeStripe();
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodId,
    });

    if (error) {
      throw error;
    }

    return paymentIntent;
  } catch (error) {
    console.error('Payment confirmation error:', error);
    throw error;
  }
};

export const createRazorpayOrder = async (amount: number, receipt: string) => {
  try {
    const response = await fetch('/api/create-razorpay-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to paise
        currency: 'INR',
        receipt,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create Razorpay order');
    }

    const { order } = await response.json();
    return order;
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    throw error;
  }
};

export const initRazorpayPayment = (order: any, options: {
  name: string;
  description: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  handler: (response: any) => void;
}) => {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;

  script.onload = () => {
    const razorpay = new (window as any).Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: options.name,
      description: options.description,
      order_id: order.id,
      prefill: options.prefill,
      handler: options.handler,
      theme: {
        color: '#e11d48',
      },
    });

    razorpay.open();
  };

  document.body.appendChild(script);
};

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking' | 'wallet';
  last4?: string;
  brand?: string;
  expiry_month?: number;
  expiry_year?: number;
}

export interface PaymentResult {
  success: boolean;
  paymentIntent?: any;
  error?: string;
  orderId?: string;
}
