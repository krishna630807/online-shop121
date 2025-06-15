
import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products', searchQuery, selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          categories (
            id,
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const handleSearchClick = () => {
    if (searchBarRef.current) {
      searchBarRef.current.scrollIntoView({ behavior: 'smooth' });
      // Focus the search input after scrolling
      setTimeout(() => {
        const searchInput = searchBarRef.current?.querySelector('input');
        if (searchInput) {
          searchInput.focus();
        }
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchClick={handleSearchClick} />
      
      {!searchQuery && !selectedCategory && (
        <>
          <HeroSection />
          <CategorySection 
            categories={categories} 
            onCategorySelect={setSelectedCategory}
          />
        </>
      )}

      <div className="container mx-auto px-4 py-8" ref={searchBarRef}>
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />
        
        {(searchQuery || selectedCategory) && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              {searchQuery ? `Search results for "${searchQuery}"` : 
               selectedCategory ? `Products in ${categories.find(c => c.id === selectedCategory)?.name}` : 
               'All Products'}
            </h2>
            <p className="text-muted-foreground mt-2">
              {products.length} product{products.length !== 1 ? 's' : ''} found
            </p>
          </div>
        )}

        <ProductGrid products={products} />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
