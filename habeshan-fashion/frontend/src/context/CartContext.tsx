// import React, { createContext, useContext, useState } from "react";

// // Product and CartItem types
// type Product = {
//   id: string;
//   name: string;
//   price: number;
// };

// type CartItem = Product & { quantity: number };

// // Cart context type definition
// type CartContextType = {
//   state: {
//     items: CartItem[];
//   };
//   addToCart: (product: Product) => void;
//   likes: string[];
//   toggleLike: (productId: string) => void;
// };

// // Create context
// const CartContext = createContext<CartContextType | undefined>(undefined);

// // CartProvider
// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [items, setItems] = useState<CartItem[]>([]);
//   const [likes, setLikes] = useState<string[]>([]);

//   const addToCart = (product: Product) => {
//     setItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prevItems.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prevItems, { ...product, quantity: 1 }];
//     });
//   };

//   const toggleLike = (productId: string) => {
//     setLikes((prevLikes) =>
//       prevLikes.includes(productId)
//         ? prevLikes.filter((id) => id !== productId)
//         : [...prevLikes, productId]
//     );
//   };

//   const state = { items };

//   return (
//     <CartContext.Provider value={{ state, addToCart, likes, toggleLike }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Hook to use the context
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
// src/context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of a product as received from your API
export interface Product {
    id: string; // Assuming id is a string
    name: string;
    price: number; // Assuming price is a number
    image: string; // Assuming image is a string
    description: string;
}

// Define the shape of a cart item (what's actually stored in the cart)
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

// Define the shape of the Cart Context value
interface CartContextType {
    cart: CartItem[];
    likes: string[]; // State for liked product IDs
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateCartItemQuantity: (productId: string, quantity: number) => void;
    getCartTotalItems: () => number;
    getCartTotalPrice: () => number;
    clearCart: () => void;
    toggleLike: (productId: string) => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the provider component
interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [likes, setLikes] = useState<string[]>([]);

    // Load cart and likes from localStorage on initial render
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (e) {
                console.error("Failed to parse cart from localStorage", e);
                setCart([]); // Reset if parsing fails
            }
        }
        const storedLikes = localStorage.getItem('likes');
        if (storedLikes) {
            try {
                setLikes(JSON.parse(storedLikes));
            } catch (e) {
                console.error("Failed to parse likes from localStorage", e);
                setLikes([]); // Reset if parsing fails
            }
        }
    }, []);

    // Save cart and likes to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('likes', JSON.stringify(likes));
    }, [likes]);

    const addToCart = (productToAdd: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === productToAdd.id);

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === productToAdd.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [
                    ...prevCart,
                    {
                        id: productToAdd.id,
                        name: productToAdd.name,
                        price: productToAdd.price,
                        image: productToAdd.image,
                        quantity: 1,
                    },
                ];
            }
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const updateCartItemQuantity = (productId: string, quantity: number) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === productId ? { ...item, quantity: quantity } : item
                )
                .filter((item) => item.quantity > 0) // Remove if quantity drops to 0
        );
    };

    const getCartTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const getCartTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const clearCart = () => {
        setCart([]);
    };

    const toggleLike = (productId: string) => {
        setLikes((prevLikes) => {
            if (prevLikes.includes(productId)) {
                return prevLikes.filter((id) => id !== productId);
            } else {
                return [...prevLikes, productId];
            }
        });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                likes,
                addToCart,
                removeFromCart,
                updateCartItemQuantity,
                getCartTotalItems,
                getCartTotalPrice,
                clearCart,
                toggleLike,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};