
-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category_id UUID REFERENCES public.categories(id),
  stock_quantity INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create product images table for multiple images per product
CREATE TABLE public.product_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (catalogue is public)
CREATE POLICY "Categories are viewable by everyone" 
  ON public.categories FOR SELECT 
  USING (true);

CREATE POLICY "Products are viewable by everyone" 
  ON public.products FOR SELECT 
  USING (true);

CREATE POLICY "Product images are viewable by everyone" 
  ON public.product_images FOR SELECT 
  USING (true);

-- Insert sample categories
INSERT INTO public.categories (name, description, image_url) VALUES
('Electronics', 'Latest gadgets and electronic devices', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400'),
('Clothing', 'Fashion and apparel for all ages', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'),
('Books', 'Books and educational materials', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'),
('Home & Garden', 'Everything for your home and garden', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400');

-- Insert sample products
INSERT INTO public.products (name, description, price, image_url, category_id, stock_quantity, featured) VALUES
('Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 299.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', (SELECT id FROM public.categories WHERE name = 'Electronics'), 50, true),
('Smart Watch', 'Feature-rich smartwatch with health tracking', 199.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', (SELECT id FROM public.categories WHERE name = 'Electronics'), 30, true),
('Casual T-Shirt', 'Comfortable cotton t-shirt in various colors', 29.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', (SELECT id FROM public.categories WHERE name = 'Clothing'), 100, false),
('Programming Book', 'Learn modern web development', 49.99, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400', (SELECT id FROM public.categories WHERE name = 'Books'), 25, false),
('Plant Pot', 'Beautiful ceramic plant pot for indoor plants', 24.99, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400', (SELECT id FROM public.categories WHERE name = 'Home & Garden'), 40, false),
('Laptop Stand', 'Ergonomic laptop stand for better posture', 79.99, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', (SELECT id FROM public.categories WHERE name = 'Electronics'), 20, true);
