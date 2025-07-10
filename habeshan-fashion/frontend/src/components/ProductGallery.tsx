
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";

const ProductGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products = [
    {
      id: 1,
      name: "Classic Red Floral Habesha Dress",
      price: "6,500 ETB",
      category: "traditional",
      color: "Red & White",
      type: "Kemis",
      image: "/asset/4c19ea0b-02c9-485e-ae2a-58120cc4eb3f.png",
      description: "Beautiful traditional dress with red floral patterns"
    },
    {
      id: 2,
      name: "Purple Garden Dress",
      price: "6,000 ETB",
      category: "modern",
      color: "Purple & White",
      type: "Chiffon Dress",
      image: "/asset/f13593f4-9bd7-4df3-986c-b8cf9d0e0433.png",
      description: "Elegant purple floral pattern dress"
    },
    {
      id: 3,
      name: "Vibrant Floral Gown",
      price: "8,000 ETB",
      category: "premium",
      color: "Multi-color",
      type: "Ceremonial Dress",
      image: "/asset/d6594243-63ea-48a8-b548-fd96481720ef.png",
      description: "Stunning multi-colored floral ceremonial dress"
    },
    {
      id: 4,
      name: "Turquoise Elegance",
      price: "7,000 ETB",
      category: "premium",
      color: "Turquoise & Gold",
      type: "Habesha Kemis",
      image: "/asset/f8a86d3d-aac8-408a-acc2-b9392778d329.png",
      description: "Luxurious turquoise dress with golden accents"
    },
    {
      id: 5,
      name: "Golden Leaf Pattern",
      price: "6,800 ETB",
      category: "traditional",
      color: "White & Gold",
      type: "Traditional Kemis",
      image: "/asset/a2c0dfcf-e4f1-4b41-811a-e8af0210cfb9.png",
      description: "Classic white dress with intricate golden leaf patterns"
    }
  ];

  const categories = [
    { id: "all", name: "All Dresses", count: products.length },
    { id: "traditional", name: "Traditional", count: products.filter(p => p.category === "traditional").length },
    { id: "modern", name: "Modern", count: products.filter(p => p.category === "modern").length },
    { id: "premium", name: "Premium", count: products.filter(p => p.category === "premium").length }
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (productName: string) => {
    toast.success(`${productName} added to cart!`);
  };

  const handleAddToWishlist = (productName: string) => {
    toast.success(`${productName} added to wishlist!`);
  };

  return (
    <section id="products" className="py-16 bg-gradient-to-b from-purple-50 to-rose-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Beautiful Collection
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Handpicked traditional and modern Ethiopian dresses crafted with love and attention to detail
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-rose-500 to-purple-600 text-white"
                  : "border-gray-300 text-gray-600 hover:border-rose-300"
              } transition-all duration-300`}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg group">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {product.type}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/90 border-none"
                    onClick={() => handleAddToWishlist(product.name)}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-sm text-gray-500">Color: {product.color}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-rose-600">{product.price}</span>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white"
                    onClick={() => handleAddToCart(product.name)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
