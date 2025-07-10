// // import React, { useState } from "react"; // Import useState
// // import { CreditCard, Smartphone, Building, Banknote } from "lucide-react";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { toast } from "sonner"; // Assuming sonner for notifications

// // // Define an interface for a single payment method for better type safety
// // interface PaymentMethod {
// //   icon: React.ElementType; // Type for Lucide icons
// //   name: string;
// //   description: string;
// //   color: string;
// //   id: string; // Add a unique ID for easier selection handling
// // }

// // const PaymentMethods = () => {
// //   const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
// //   const [loading, setLoading] = useState<boolean>(false);

// //   const paymentMethods: PaymentMethod[] = [ // Use the defined interface
// //     {
// //       icon: Smartphone,
// //       name: "Mobile Money",
// //       description: "CBE Birr, M-Birr, HelloCash",
// //       color: "from-green-500 to-emerald-600",
// //       id: "mobile_money",
// //     },
// //     {
// //       icon: Building,
// //       name: "Bank Transfer",
// //       description: "CBE, Dashen, Awash Bank",
// //       color: "from-blue-500 to-indigo-600",
// //       id: "bank_transfer",
// //     },
// //     {
// //       icon: CreditCard,
// //       name: "Card Payment",
// //       description: "Visa, Mastercard accepted",
// //       color: "from-purple-500 to-pink-600",
// //       id: "card_payment",
// //     },
// //     {
// //       icon: Banknote,
// //       name: "Cash on Delivery",
// //       description: "Pay when you receive",
// //       color: "from-orange-500 to-red-600",
// //       id: "cash_on_delivery",
// //     },
// //   ];

// //   // Function to simulate getting cart details.
// //   // In a real app, you'd fetch this from a cart context, Redux store, or local storage.
// //   const getCartDetails = () => {
// //     // Example cart data. Replace with actual cart data from your app.
// //     return {
// //       items: [
// //         { productId: "prod123", name: "Classic T-Shirt", price: 19.99, quantity: 1 },
// //         { productId: "prod456", name: "Denim Jeans", price: 49.50, quantity: 1 },
// //       ],
// //       totalAmount: 69.49, // Sum of prices
// //       currency: "ETB", // Ethiopian Birr, assuming your context
// //     };
// //   };

// //   const handleMethodSelect = async (methodId: string) => {
// //     setSelectedMethod(methodId);
// //     setLoading(true); // Start loading state

// //     const cartDetails = getCartDetails(); // Get current cart details

// //     try {
// //       const response = await fetch("http://localhost:5000/api/payment/process", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           // You might need an Authorization header here if your API is protected
// //           // 'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
// //         },
// //         body: JSON.stringify({
// //           paymentMethod: methodId,
// //           orderId: "ORDER_ABC_123", // Replace with actual order ID if already created
// //           amount: cartDetails.totalAmount,
// //           currency: cartDetails.currency,
// //           items: cartDetails.items,
// //           // Add any other necessary order details like user ID, shipping address, etc.
// //         }),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.error || "Failed to process payment.");
// //       }

// //       const result = await response.json();
// //       toast.success(result.message || "Payment method selected successfully!");

// //       // Handle successful payment initiation based on method
// //       if (methodId === "cash_on_delivery") {
// //         // For CoD, you might just confirm the order and redirect
// //         toast.info("Order placed for Cash on Delivery!");
// //         // Example: Redirect to order confirmation page
// //         // window.location.href = "/order-confirmation/" + result.orderId;
// //       } else {
// //         // For other methods, backend might return a URL to redirect to (e.g., payment gateway)
// //         if (result.redirectUrl) {
// //           window.location.href = result.redirectUrl;
// //         } else {
// //           toast.info("Proceeding with " + methodId + ". Please follow instructions.");
// //           // You might want to show specific instructions for Mobile Money/Bank Transfer
// //         }
// //       }
// //     } catch (error: any) {
// //       console.error("Payment submission error:", error);
// //       toast.error(error.message || "An unexpected error occurred during payment.");
// //     } finally {
// //       setLoading(false); // End loading state
// //       setSelectedMethod(null); // Reset selection (or keep it if you want to highlight)
// //     }
// //   };

// //   return (
// //     <section className="py-16 bg-white">
// //       <div className="container mx-auto px-4">
// //         <div className="text-center mb-12">
// //           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
// //             Flexible Payment Options
// //           </h2>
// //           <p className="text-gray-600 text-lg">
// //             Choose the payment method that works best for you
// //           </p>
// //         </div>

// //         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
// //           {paymentMethods.map((method) => {
// //             const IconComponent = method.icon;
// //             const isSelected = selectedMethod === method.id;
// //             const isDisabled = loading && selectedMethod !== method.id; // Disable other cards while one is processing

// //             return (
// //               <Card
// //                 key={method.id} // Use method.id as key
// //                 className={`text-center transition-all duration-300 border-2 ${
// //                   isSelected
// //                     ? "border-blue-500 shadow-xl scale-105" // Highlight selected
// //                     : "border-gray-200 hover:shadow-lg hover:scale-105" // Default hover
// //                 } ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
// //                 onClick={() => !isDisabled && handleMethodSelect(method.id)} // Only clickable if not disabled
// //               >
// //                 <CardHeader className="pb-4">
// //                   <div
// //                     className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center mb-4`}
// //                   >
// //                     <IconComponent className="h-8 w-8 text-white" />
// //                   </div>
// //                   <CardTitle className="text-lg font-semibold text-gray-800">
// //                     {method.name}
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <p className="text-gray-600 text-sm">{method.description}</p>
// //                   {isSelected && loading && (
// //                     <p className="text-blue-500 mt-2">Processing...</p>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             );
// //           })}
// //         </div>

// //         <div className="mt-12 text-center">
// //           <div className="bg-gradient-to-r from-rose-100 to-purple-100 rounded-lg p-6 max-w-2xl mx-auto">
// //             <h3 className="text-xl font-semibold text-gray-800 mb-2">
// //               Need Help with Payment?
// //             </h3>
// //             <p className="text-gray-600">
// //               Our customer service team is here to assist you with any payment questions or concerns.
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// export default PaymentMethods;
import React, { useState } from "react"; // Import useState
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Smartphone, Building, DollarSign } from "lucide-react";
import { toast } from "sonner"; // Assuming you have sonner installed and configured

// Define an interface for a single payment method for better type safety (if using TypeScript)
// If not using TypeScript, you can remove this interface.
// interface PaymentMethod {
//   icon: JSX.Element;
//   title: string;
//   subtitle: string;
//   description: string;
//   details: string;
//   id: string; // Crucial for backend identification
// }

const Payment = () => {
  const [selectedMethodId, setSelectedMethodId] = useState(null); // State to track selected method by its ID
  const [loading, setLoading] = useState(false); // State for loading indicator

  const paymentMethods = [
    {
      icon: <Smartphone className="h-12 w-12 text-green-600" />,
      title: "Mobile Banking",
      subtitle: "Awash Bank, CBE Birr, M-Birr", // More generic to match backend
      description: "Pay securely using local mobile banking options",
      details: "Account: 123456789 (example)",
      id: "mobile_money" // Unique ID for backend
    },
    {
      icon: <CreditCard className="h-12 w-12 text-blue-600" />,
      title: "Credit/Debit Card",
      subtitle: "Visa, MasterCard",
      description: "Secure online payment with your card",
      details: "SSL encrypted",
      id: "card_payment" // Unique ID for backend
    },
    {
      icon: <Building className="h-12 w-12 text-purple-600" />,
      title: "Bank Transfer",
      subtitle: "Direct Transfer",
      description: "Transfer directly to our bank account",
      details: "Account details provided via email/SMS",
      id: "bank_transfer" // Unique ID for backend
    },
    {
      icon: <DollarSign className="h-12 w-12 text-orange-600" />,
      title: "Cash on Delivery",
      subtitle: "Pay on Delivery",
      description: "Pay when you receive your order",
      details: "Available in Addis Ababa",
      id: "cash_on_delivery" // Unique ID for backend
    }
  ];

  // Dummy function to simulate getting cart details.
  // In a real application, this data would come from a cart context, Redux store, or an API call.
  const getCartDetails = () => {
    // This is example data. Replace with your actual cart data.
    return {
      items: [
        { productId: 1, name: "Traditional Female Kemiss", price: 250.00, quantity: 1 },
        { productId: 2, name: "Leather Crossbody Bag", price: 75.00, quantity: 1 },
      ],
      totalAmount: 325.00, // Sum of prices
      currency: "ETB",
      orderId: "ORDER_HABESHA_" + Date.now(), // A simple dynamic order ID for testing
      userId: 123, // Example user ID, could be null for guests
      shippingAddress: "Bole Road, Addis Ababa, Ethiopia", // Example address
      // ... other necessary details like billing address, notes
    };
  };

  const handlePaymentMethodSelect = async (methodId) => {
    setSelectedMethodId(methodId);
    setLoading(true); // Start loading state

    const cartDetails = getCartDetails(); // Get the current cart/order details

    try {
      const response = await fetch("http://localhost:5000/api/payment/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${localStorage.getItem('userToken')}`, // Include if your API requires authentication
        },
        body: JSON.stringify({
          paymentMethod: methodId,
          orderId: cartDetails.orderId,
          amount: cartDetails.totalAmount,
          currency: cartDetails.currency,
          items: cartDetails.items,
          userId: cartDetails.userId,
          shippingAddress: cartDetails.shippingAddress,
          // You can add more data here like billingAddress, notes, etc.
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to process ${methodId} payment.`);
      }

      const result = await response.json();
      toast.success(result.message || "Payment method selected successfully!");

      // Handle actions based on the backend response
      if (result.redirectUrl) {
        // For payment gateways or COD confirmation
        toast.info("Redirecting to complete payment...");
        window.location.href = result.redirectUrl;
      } else {
        // For mobile money / bank transfer where instructions are given
        toast.info(result.message || "Please follow instructions for payment.");
      }

    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // End loading state
      setSelectedMethodId(null); // Reset selected method
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
                Payment Methods
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your preferred payment method for a secure and convenient shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {paymentMethods.map((method) => {
              const isSelected = selectedMethodId === method.id;
              const isDisabled = loading && selectedMethodId !== method.id; // Disable other cards while one is processing

              return (
                <Card
                  key={method.id} // Use method.id as key
                  className={`
                    hover:shadow-xl transition-all duration-300 border-2
                    ${isSelected ? "border-blue-500 shadow-xl scale-105" : "border-gray-200 hover:shadow-lg hover:scale-105"}
                    ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  `}
                  onClick={() => !isDisabled && handlePaymentMethodSelect(method.id)} // Only clickable if not disabled
                >
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
                    {isSelected && loading && (
                      <p className="text-blue-500 mt-2 font-semibold">Processing...</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
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