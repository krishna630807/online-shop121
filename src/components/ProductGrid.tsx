import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stock_quantity: number | null;
  featured: boolean | null;
  categories?: {
    id: string;
    name: string;
  } | null;
}

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: 1,
    });
    toast({
      title: "Added to cart",
      description: `${product.name} was added to your cart.`,
    });
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No products found.</p>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="p-0">
            <div className="aspect-square overflow-hidden rounded-t-lg">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <CardTitle className="text-lg font-semibold line-clamp-1">
                {product.name}
              </CardTitle>
              {product.featured && (
                <Badge variant="secondary" className="ml-2 shrink-0">
                  Featured
                </Badge>
              )}
            </div>
            {product.categories && (
              <Badge variant="outline" className="mb-2">
                {product.categories.name}
              </Badge>
            )}
            {product.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {product.description}
              </p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">${Number(product.price).toFixed(2)}</span>
              {product.stock_quantity !== null && product.stock_quantity <= 5 && (
                <Badge variant="destructive">
                  {product.stock_quantity === 0 ? "Out of Stock" : `${product.stock_quantity} left`}
                </Badge>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button
              className="w-full"
              onClick={() => handleAddToCart(product)}
              disabled={product.stock_quantity !== null && product.stock_quantity === 0}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
