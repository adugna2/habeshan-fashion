
import { Calendar, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const DailySpecials = () => {
  const todaysSpecials = [
    {
      id: 1,
      image: "/asset/f8a86d3d-aac8-408a-acc2-b9392778d329.png",
      name: "Elegant Turquoise Habesha Dress",
      originalPrice: "8,000 ETB",
      salePrice: "7,000 ETB",
      description: "Beautiful flowing dress with intricate patterns"
    },
    {
      id: 2,
      image: "/asset/a2c0dfcf-e4f1-4b41-811a-e8af0210cfb9.png",
      name: "Traditional White & Gold Kemis",
      originalPrice: "8,000 ETB",
      salePrice: "6,500 ETB",
      description: "Classic white dress with golden floral accents"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-rose-500 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Today's Special Collection
            </h2>
          </div>
          <p className="text-gray-600 text-lg">New arrivals and featured designs updated daily</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {todaysSpecials.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  Special
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-rose-600">{item.salePrice}</span>
                    <span className="text-lg text-gray-400 line-through ml-2">{item.originalPrice}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailySpecials;
