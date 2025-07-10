import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import ClientSellerChat from "@/components/ClientSellerChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.message.trim()) {
      alert("Message cannot be empty");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_type: "general",       // or customize as needed
          message: formData.message,
          contact_method: formData.phone || formData.fullName,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({ fullName: "", phone: "", message: "" });
      } else {
        alert(data.error || "Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message, please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-purple-50">
      <Navigation />

      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                Contact Us
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Visit our store, get in touch, or chat with our designer about your perfect dress
            </p>
          </div>

          {/* Map Section */}
          <div className="mb-12">
            <Card className="overflow-hidden shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-center text-2xl font-semibold text-gray-800">
                  Find Our Store
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Map />
              </CardContent>
            </Card>
          </div>

          {/* Communication Section */}
          <div className="mb-12">
            <ClientSellerChat />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
                    <MapPin className="h-6 w-6 text-rose-600 mr-3" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    ቦሌ ቡልቡላ 93 ማዞሪያ<br />
                    ቅዱስ ብዙአየሁ የገበያ ማዕከል<br />
                    2ተኛ ፎቅ የሱቅ ቁጥር 42<br />
                    አዲስ አበባ, ኢትዮጵያ
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
                    <Phone className="h-6 w-6 text-green-600 mr-3" />
                    Phone Numbers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-gray-600">📱 0940076225</p>
                    <p className="text-gray-600">📱 0941485880</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
                    <Clock className="h-6 w-6 text-blue-600 mr-3" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-gray-600">
                    <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                    <p>Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
                  <MessageCircle className="h-6 w-6 text-purple-600 mr-3" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
