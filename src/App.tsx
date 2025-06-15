
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <CartProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* All custom routes above the catch-all "*" route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </TooltipProvider>
);

export default App;
