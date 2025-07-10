
import { Button } from "@/components/ui/button";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Raha Habeshan Corner",
      subtitle: "ሽፎን እና የሐበሻ ልብስ",
      description: "Discover the elegance of traditional Ethiopian women's clothing. Beautiful handcrafted dresses with modern style and cultural heritage.",
      image: "/asset/f8a86d3d-aac8-408a-acc2-b9392778d329.png",
      bgGradient: "from-rose-100 via-purple-50 to-emerald-50"
    },
    {
      title: "Traditional Elegance",
      subtitle: "የባህል ቅርስ",
      description: "Experience the beauty of authentic Ethiopian fashion with contemporary touches. Each piece tells a story of heritage and craftsmanship.",
      image: "/asset/a2c0dfcf-e4f1-4b41-811a-e8af0210cfb9.png",
      bgGradient: "from-purple-100 via-rose-50 to-blue-50"
    },
    {
      title: "Modern Heritage",
      subtitle: "የዘመናዊ ባህል",
      description: "Where tradition meets innovation. Stunning designs that celebrate Ethiopian culture while embracing modern fashion trends.",
      image: "/asset/4c19ea0b-02c9-485e-ae2a-58120cc4eb3f.png",
      bgGradient: "from-emerald-100 via-teal-50 to-rose-50"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br ${slides[currentSlide].bgGradient} transition-all duration-1000`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-rose-400 to-pink-300 rounded-full opacity-30 animate-pulse blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-purple-400 to-indigo-300 rounded-full opacity-25 animate-pulse delay-1000 blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full opacity-20 animate-pulse delay-500 blur-xl"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-rose-400 rounded-full animate-float delay-100"></div>
        <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-purple-400 rounded-full animate-float delay-300"></div>
        <div className="absolute top-1/3 left-1/3 w-8 h-8 bg-emerald-400 rounded-full animate-float delay-500"></div>
      </div>

      {/* Carousel Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="h-6 w-6 text-gray-700" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="h-6 w-6 text-gray-700" />
      </button>

      {/* Carousel Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            {/* Logo */}
            <div className="mb-8 transform transition-all duration-1000 ease-out" key={`logo-${currentSlide}`}>
              <img 
                src="/asset/1dfdc235-8d6b-4b94-93ef-bb46a9b8d35b.png" 
                alt="Raha Habeshan Corner Logo" 
                className="mx-auto lg:mx-0 h-32 w-auto hover:scale-110 transition-all duration-500 ease-out animate-glow"
              />
            </div>

            {/* Dynamic Content */}
            <div className="transform transition-all duration-1000 ease-out" key={`content-${currentSlide}`}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 animate-slide-up">
                <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  {slides[currentSlide].title}
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-4 font-medium animate-slide-up delay-300">
                {slides[currentSlide].subtitle}
              </p>

              <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-slide-up delay-500">
                {slides[currentSlide].description}
              </p>

              <div className="animate-slide-up delay-700">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Shop Collection
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="order-1 lg:order-2">
            <div className="relative transform transition-all duration-1000 ease-out" key={`image-${currentSlide}`}>
              <img 
                src={slides[currentSlide].image}
                alt="Featured dress"
                className="w-full max-w-md mx-auto h-auto object-cover rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 animate-fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-rose-500 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <ArrowDown className="h-6 w-6 text-gray-400 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
