
import { MapPin, Phone, Mail, MessageCircle, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <img 
              src="/asset/1dfdc235-8d6b-4b94-93ef-bb46a9b8d35b.png" 
              alt="Raha Habeshan Corner" 
              className="h-16 w-auto"
            />
            <p className="text-gray-300 text-sm leading-relaxed">
              Traditional Ethiopian women's clothing with modern elegance. Quality craftsmanship and cultural heritage in every piece.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-rose-400 transition-colors">Home</a></li>
              <li><a href="/shop" className="text-gray-300 hover:text-rose-400 transition-colors">Shop</a></li>
              <li><a href="/payment" className="text-gray-300 hover:text-rose-400 transition-colors">Payment</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-rose-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Custom Design</li>
              <li>Alterations</li>
              <li>Home Delivery</li>
              <li>Bulk Orders</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-rose-400" />
                <span className="text-sm text-gray-300">ቦሌ ቡልቡላ 93 ማዞሪያ</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-rose-400" />
                <span className="text-sm text-gray-300">0940076225</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-4 w-4 text-rose-400" />
                <span className="text-sm text-gray-300">Telegram Available</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Raha Habeshan Corner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
