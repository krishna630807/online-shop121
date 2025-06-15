
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Cart } from "./Cart";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <h1 className="text-2xl font-bold text-primary cursor-pointer">CatalogHaven</h1>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <a href="#categories" className="text-sm font-medium hover:text-primary transition-colors">Categories</a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Cart />
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
