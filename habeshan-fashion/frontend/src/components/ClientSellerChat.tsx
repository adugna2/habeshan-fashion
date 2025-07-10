import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, Package, Truck, Clock } from "lucide-react";

const ClientSellerChat = () => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [message, setMessage] = useState("");
  const [contactMethod, setContactMethod] = useState("Phone"); // Default contact method

  const services = [
    { id: "consultation", label: "Cloth Consultation", icon: MessageCircle },
    { id: "custom", label: "Custom Design", icon: Package },
    { id: "delivery", label: "Delivery Options", icon: Truck },
    { id: "appointment", label: "Schedule Visit", icon: Clock }
  ];

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedService) return;

    try {
      const payload = {
        service_type: selectedService,
        message,
        contact_method: contactMethod
      };

      await axios.post("http://localhost:5000/api/contact", payload);
      alert("Message sent successfully!");

      // Reset form
      setMessage("");
      setSelectedService("");
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
          <MessageCircle className="h-6 w-6 text-purple-600 mr-3" />
          Talk to Our Designer
        </CardTitle>
        <p className="text-gray-600">
          Discuss your requirements, ask about delivery, or get consultation about our clothing
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Service Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What would you like to discuss?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    selectedService === service.id
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                  }`}
                >
                  <IconComponent className="h-5 w-5 mx-auto mb-2" />
                  <span className="text-sm font-medium">{service.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Questions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Common Questions
          </label>
          <div className="space-y-2">
            {[
              "What sizes are available?",
              "How long does custom design take?",
              "Do you offer home delivery?",
              "Can I see more designs?",
              "What are your alteration services?"
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => setMessage(question)}
                className="w-full text-left p-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Message
          </label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your requirements, ask about delivery options, or any questions you have..."
            className="min-h-[100px]"
          />
        </div>

        {/* Contact Preference */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Preferred Contact Method</h4>
          <div className="flex flex-wrap gap-2">
            {["Phone", "Telegram", "Visit"].map((method) => (
              <button
                key={method}
                onClick={() => setContactMethod(method)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  contactMethod === method
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* Send Button */}
        <Button
          onClick={handleSendMessage}
          disabled={!selectedService || !message.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-rose-600 hover:from-purple-600 hover:to-rose-700 text-white"
        >
          <Send className="h-4 w-4 mr-2" />
          Send Message
        </Button>
      </CardContent>
    </Card>
  );
};

export default ClientSellerChat;
