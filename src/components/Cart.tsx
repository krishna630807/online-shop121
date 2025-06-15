
// Cart component for unauthenticated, no payment - just view and manage cart
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Plus, Minus, Trash2, CheckCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

export const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, getCartItemCount, clearCart } = useCart();
  const [showThankYou, setShowThankYou] = useState(false);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items before checking out.",
        variant: "destructive",
      });
      return;
    }

    // Create WhatsApp message with cart details
    const orderDetails = items.map(item => 
      `• ${item.name} - Qty: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const totalAmount = getCartTotal().toFixed(2);
    const message = `Hi! I would like to place an order:\n\n${orderDetails}\n\nTotal: $${totalAmount}\n\nPlease let me know how to proceed with the payment and delivery.`;
    
    // Replace with your actual WhatsApp number (in international format without + sign)
    const phoneNumber = "916306151952"; // Replace with owner's WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and show thank you message
    clearCart();
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  const cartItemCount = getCartItemCount();
  const cartTotal = getCartTotal();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItemCount > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {cartItemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({cartItemCount})</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {items.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                    <img
                      src={item.image_url || '/placeholder.svg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-medium min-w-[2rem] text-center">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {items.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Button onClick={handleWhatsAppCheckout} className="w-full" size="lg">
                Order via WhatsApp
              </Button>
              {showThankYou && (
                <div className="flex flex-col items-center justify-center py-4">
                  <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-green-600 font-bold">Order sent to WhatsApp!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
