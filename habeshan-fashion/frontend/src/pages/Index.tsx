
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductGallery from "@/components/ProductGallery";
import PaymentMethods from "@/pages/Payment";
import ContactInfo from "@/components/ContactInfo";
import DailySpecials from "@/components/DailySpecials";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-purple-50">
      <Navigation />
      <div className="pt-16">
        <Hero />
        <DailySpecials />
        <ProductGallery />
        <PaymentMethods />
        <ContactInfo />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
