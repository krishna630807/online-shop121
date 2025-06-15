
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
}

interface CategorySectionProps {
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
}

export const CategorySection = ({ categories, onCategorySelect }: CategorySectionProps) => {
  return (
    <section id="categories" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our carefully organized categories to find exactly what you need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-300 group"
              onClick={() => onCategorySelect(category.id)}
            >
              <CardContent className="p-0">
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <img
                    src={category.image_url || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
