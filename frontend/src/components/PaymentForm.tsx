import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, Smartphone, Building } from 'lucide-react';
import { PaymentResult } from '@/lib/payment';

interface PaymentFormProps {
  amount: number;
  onPaymentComplete: (result: PaymentResult) => void;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

const PaymentForm = ({ amount, onPaymentComplete, customerInfo }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
  ];

  const handleCardPayment = async () => {
    if (!stripe || !elements) {
      setError('Payment system not initialized');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Create payment intent on backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100),
          currency: 'inr',
          customer: customerInfo,
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
          },
        },
      });

      if (paymentError) {
        throw paymentError;
      }

      onPaymentComplete({
        success: true,
        paymentIntent,
        orderId: paymentIntent.id,
      });
    } catch (err: any) {
      setError(err.message || 'Payment failed');
      onPaymentComplete({
        success: false,
        error: err.message || 'Payment failed',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUPIPayment = async () => {
    if (!upiId) {
      setError('Please enter your UPI ID');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate UPI payment (in real implementation, integrate with UPI gateway)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onPaymentComplete({
        success: true,
        orderId: 'UPI_' + Date.now(),
      });
    } catch (err: any) {
      setError(err.message || 'UPI payment failed');
      onPaymentComplete({
        success: false,
        error: err.message || 'UPI payment failed',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNetbankingPayment = async () => {
    if (!selectedBank) {
      setError('Please select your bank');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate netbanking payment (in real implementation, integrate with bank gateway)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onPaymentComplete({
        success: true,
        orderId: 'NB_' + Date.now(),
      });
    } catch (err: any) {
      setError(err.message || 'Netbanking payment failed');
      onPaymentComplete({
        success: false,
        error: err.message || 'Netbanking payment failed',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    switch (paymentMethod) {
      case 'card':
        handleCardPayment();
        break;
      case 'upi':
        handleUPIPayment();
        break;
      case 'netbanking':
        handleNetbankingPayment();
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Method Selection */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Select Payment Method</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              paymentMethod === 'card'
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <CreditCard className="w-6 h-6 mb-2 text-primary" />
            <p className="font-medium">Card Payment</p>
            <p className="text-sm text-muted-foreground">Credit/Debit Card</p>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('upi')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              paymentMethod === 'upi'
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <Smartphone className="w-6 h-6 mb-2 text-primary" />
            <p className="font-medium">UPI Payment</p>
            <p className="text-sm text-muted-foreground">GPay, PhonePe, Paytm</p>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('netbanking')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              paymentMethod === 'netbanking'
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <Building className="w-6 h-6 mb-2 text-primary" />
            <p className="font-medium">Net Banking</p>
            <p className="text-sm text-muted-foreground">Bank Transfer</p>
          </button>
        </div>
      </div>

      {/* Payment Details */}
      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <Label className="text-base font-medium">Card Details</Label>
          <div className="p-4 border-2 border-border rounded-xl">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      )}

      {paymentMethod === 'upi' && (
        <div className="space-y-4">
          <Label htmlFor="upiId" className="text-base font-medium">UPI ID</Label>
          <Input
            id="upiId"
            type="text"
            placeholder="yourname@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="text-base"
          />
        </div>
      )}

      {paymentMethod === 'netbanking' && (
        <div className="space-y-4">
          <Label htmlFor="bank" className="text-base font-medium">Select Bank</Label>
          <select
            id="bank"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="w-full p-3 border-2 border-border rounded-xl bg-background"
          >
            <option value="">Choose your bank</option>
            {banks.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="festive"
        disabled={loading}
        className="w-full py-6 text-lg font-medium"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing Payment...
          </>
        ) : (
          `Pay ₹${amount.toLocaleString('en-IN')}`
        )}
      </Button>

      {/* Security Note */}
      <div className="text-center text-sm text-muted-foreground">
        <p>🔒 Secured by 256-bit SSL encryption</p>
        <p>Your payment information is safe and secure</p>
      </div>
    </form>
  );
};

export default PaymentForm;
