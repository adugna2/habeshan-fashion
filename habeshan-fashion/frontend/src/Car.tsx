"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"

const slides = [
  {
    id: 1,
    title: "Development Partners",
    description: "Our development partners are playing an important role in the socio-economic development through budgetary support, projects/programmes and technical assistance.",
    backgroundImage: "https://ext.same-assets.com/3047121243/662854960.jpeg",
    buttonText: "VIEW DETAILS"
  },
  {
    id: 2,
    title: "Global Health Innovation and Quality Summit GHIQS",
    description: "Advancing healthcare innovation and quality standards across Ethiopia through international collaboration and knowledge sharing.",
    backgroundImage: "https://ext.same-assets.com/3047121243/1664600009.jpeg",
    buttonText: "VIEW DETAILS"
  },
  {
    id: 3,
    title: "Pillars",
    description: "Ethiopia experiences a heavy burden of diseases with a growing prevalence of communicable infections. In response to such prevailing and newly emerging health problems, the Ethiopian Government-developed a 20-year rolling Health Sector Development Program (HSDP).",
    backgroundImage: "https://ext.same-assets.com/3047121243/854800619.jpeg",
    buttonText: "VIEW DETAILS"
  },
  {
    id: 4,
    title: "Programs",
    description: "Our initiatives covers several areas: AIDS, tuberculosis and malaria, immunization programmes, maternal and child health, tobacco use, human resources, emerging diseases, nutrition, health promotion and health system strengthening.",
    backgroundImage: "https://ext.same-assets.com/3047121243/2296138730.jpeg",
    buttonText: "VIEW DETAILS"
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Main Slide */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${slides[currentSlide].backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg mb-8 leading-relaxed">
                {slides[currentSlide].description}
              </p>
              <Button 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-3"
              >
                {slides[currentSlide].buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Slide Thumbnails at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-0">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={`p-4 text-left text-white border-t-4 transition-all duration-300 hover:bg-white hover:bg-opacity-10 ${
                  index === currentSlide ? 'border-teal-400 bg-white bg-opacity-10' : 'border-transparent'
                }`}
                onClick={() => setCurrentSlide(index)}
              >
                <h3 className="font-semibold text-sm truncate">{slide.title}</h3>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}