// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Menu, X, ShoppingCart } from "lucide-react";  // Add ShoppingCart icon
// import { Link, useLocation } from "react-router-dom";
// import { useCart } from "@/context/CartContext"; // Import your cart context

// const Navigation = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();

//   const { cart } = useCart();  // Get cart from context
//   const cartCount = cart.length;

//   const navigationItems = [
//     { name: "Home", path: "/" },
//     { name: "Shop", path: "/shop" },
//     { name: "Payment", path: "/payment" },
//     { name: "Contact", path: "/contact" },
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center">
//             <img
//               src="/asset/1dfdc235-8d6b-4b94-93ef-bb46a9b8d35b.png"
//               alt="Raha Habeshan Corner"
//               className="h-12 w-auto hover:scale-105 transition-transform duration-300"
//             />
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navigationItems.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 className={`text-lg font-medium transition-colors duration-300 hover:text-rose-600 ${
//                   isActive(item.path)
//                     ? "text-rose-600 border-b-2 border-rose-600 pb-1"
//                     : "text-gray-700"
//                 }`}
//               >
//                 {item.name}
//               </Link>
//             ))}

//             {/* Cart Icon with count */}
//             <Link to="/cart" className="relative text-gray-700 hover:text-rose-600">
//               <ShoppingCart className="w-6 h-6" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-2 bg-rose-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="md:hidden"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t">
//             <div className="flex flex-col space-y-4">
//               {navigationItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   className={`text-lg font-medium transition-colors duration-300 hover:text-rose-600 ${
//                     isActive(item.path) ? "text-rose-600" : "text-gray-700"
//                   }`}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               ))}

//               {/* Cart Icon + Count on Mobile */}
//               <Link
//                 to="/cart"
//                 className="relative text-gray-700 hover:text-rose-600 flex items-center gap-2"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <ShoppingCart className="w-6 h-6" />
//                 Cart
//                 {cartCount > 0 && (
//                   <span className="bg-rose-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navigation;
// src/components/Navigation.tsx
import React from "react";
import { Link } from "react-router-dom"; // Use react-router-dom Link
import { ShoppingCart } from "lucide-react"; // Assuming lucide-react for icons
import { useCart } from "../context/CartContext"; // Adjust path if needed
import { Button } from "./ui/button"; // Assuming you have this Button component

const Navigation: React.FC = () => {
    const { getCartTotalItems } = useCart();
    const totalCount = getCartTotalItems(); // Get total items from context

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                   Home
                </Link>
                <div className="flex items-center space-x-6">
                    <Link to="/shop" className="text-gray-600 hover:text-gray-900 transition-colors">
                        Shop
                    </Link>
                    <Link to="/payment" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Payment
                    </Link>
                    <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                        About
                    </Link>
                    <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                        Contact
                    </Link>

                    {/* Cart Icon and Count - Link to CartPage */}
                    <Link to="/cart" className="relative text-gray-600 hover:text-gray-900 transition-colors">
                        <ShoppingCart className="h-6 w-6" />
                        {totalCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {totalCount}
                            </span>
                        )}
                    </Link>

                    {/* Checkout Button - Only visible if items are in cart */}
                    {totalCount > 0 && (
                        <Link to="/payment">
                            <Button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                                Checkout ({totalCount})
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;