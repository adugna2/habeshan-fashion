import React from 'react';
import Navigation from '../components/Navigation'; // Adjust path
import { useCart } from '../context/CartContext'; // Adjust path
import { Button } from '../components/ui/button'; // Assuming you have this Button component
import { Link } from 'react-router-dom'; // For navigation

const CartPage: React.FC = () => {
    // Destructure the actual values and functions from useCart hook
    const { cart, removeFromCart, updateCartItemQuantity, getCartTotalItems, getCartTotalPrice, clearCart } = useCart();

    const totalCount = getCartTotalItems(); // Get total items using the provided function
    const cartTotal = getCartTotalPrice(); // Get total price using the provided function

    const handleQuantityChange = (productId: string, event: React.ChangeEvent<HTMLSelectElement>) => {
        const newQuantity = parseInt(event.target.value, 10);
        updateCartItemQuantity(productId, newQuantity);
    };

    if (cart.length === 0) {
        return (
            <>
                <Navigation />
                <div className="pt-20 text-center text-gray-600">
                    <p className="mb-4">Your cart is empty.</p>
                    <Link to="/shop">
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Navigation />
            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 pt-20">
                <h1 className="text-3xl font-bold mb-8 text-center text-rose-600">Your Shopping Cart</h1>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b py-4 last:border-b-0">
                            <div className="flex items-center space-x-4">
                                {item.image && (
                                    <img
                                        src={`http://localhost:5000/uploads/${item.image}`}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                )}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <select
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, e)}
                                    className="border rounded p-2"
                                >
                                    {[...Array(10).keys()].map(i => ( // Max quantity 10 for example
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                                <span className="text-lg font-semibold text-gray-800">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                                <Button
                                    variant="ghost" // Assuming 'ghost' variant exists in your Button component
                                    onClick={() => removeFromCart(item.id)} // Use removeFromCart
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between items-center mt-6 pt-4 border-t">
                        <span className="text-xl font-bold text-gray-800">Total:</span>
                        <span className="text-2xl font-bold text-rose-600">${cartTotal.toFixed(2)}</span>
                    </div>

                    <div className="mt-8 text-center flex justify-between gap-4">
                        <Button
                            onClick={clearCart} // Use clearCart
                            className="flex-1 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                        >
                            Clear Cart
                        </Button>
                        <Link to="/payment" className="flex-1">
                            <Button
                                className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white text-lg py-3 px-8 rounded-full"
                            >
                                Proceed to Checkout
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartPage;