
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Smartphone, Building, DollarSign } from "lucide-react";

const Payment = () => {
  const paymentMethods = [
    {
      icon: <Smartphone className="h-12 w-12 text-green-600" />,
      title: "Mobile Banking",
      subtitle: "Awash Bank",
      description: "Pay securely using Awash Bank mobile banking",
      details: "Account: 123456789"
    },
    {
      icon: <CreditCard className="h-12 w-12 text-blue-600" />,
      title: "Credit/Debit Card",
      subtitle: "Visa, MasterCard",
      description: "Secure online payment with your card",
      details: "SSL encrypted"
    },
    {
      icon: <Building className="h-12 w-12 text-purple-600" />,
      title: "Bank Transfer",
      subtitle: "Direct Transfer",
      description: "Transfer directly to our bank account",
      details: "Account details provided"
    },
    {
      icon: <DollarSign className="h-12 w-12 text-orange-600" />,
      title: "Cash on Delivery",
      subtitle: "Pay on Delivery",
      description: "Pay when you receive your order",
      details: "Available in Addis Ababa"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-purple-50">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                Payment Methods
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your preferred payment method for a secure and convenient shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {paymentMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {method.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {method.title}
                  </CardTitle>
                  <p className="text-sm text-rose-600 font-medium">{method.subtitle}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-3">{method.description}</p>
                  <p className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                    {method.details}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Security & Trust</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-green-600 mb-2">🔒</div>
                <p className="text-sm text-gray-600">SSL Encrypted</p>
              </div>
              <div>
                <div className="text-blue-600 mb-2">🛡️</div>
                <p className="text-sm text-gray-600">Secure Payments</p>
              </div>
              <div>
                <div className="text-purple-600 mb-2">✅</div>
                <p className="text-sm text-gray-600">Verified Merchant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
