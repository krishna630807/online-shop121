
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [orderCleared, setOrderCleared] = useState(false);

  useEffect(() => {
    if (sessionId && !orderCleared) {
      // Clear the cart after successful payment
      clearCart();
      setOrderCleared(true);
    }
  }, [sessionId, clearCart, orderCleared]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            Payment Successful!
          </CardTitle>
          <CardDescription>
            Thank you for your purchase. Your order has been confirmed.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {sessionId && (
            <p className="text-sm text-muted-foreground">
              Order ID: {sessionId.slice(-8).toUpperCase()}
            </p>
          )}
          <p className="text-sm">
            You will receive an email confirmation shortly with your order details.
          </p>
          <Button asChild className="w-full">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutSuccess;
