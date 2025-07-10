import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation"; // Adjust path as needed
import { Card, CardContent } from "../components/ui/card"; // Adjust path as needed
import { Button } from "../components/ui/button"; // Adjust path as needed
import { Heart, Star } from "lucide-react";
import { useCart, Product } from "../context/CartContext"; // Import useCart and Product type from your CartContext

const Shop: React.FC = () => {
    // State to hold the fetched products
    const [products, setProducts] = useState<Product[]>([]);
    // State to manage loading status
    const [loading, setLoading] = useState<boolean>(true);
    // State to manage any errors during fetching
    const [error, setError] = useState<string | null>(null);

    // Destructure properties and functions from the CartContext
    const { likes, toggleLike, addToCart } = useCart();

    // useEffect hook to fetch products when the component mounts
    useEffect(() => {
        // Fetch products from your backend API
        fetch("http://localhost:5000/api/products")
            .then((res) => {
                // Check if the network response was successful
                if (!res.ok) {
                    // If not successful, throw an error with the status
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                // Parse the JSON response
                return res.json();
            })
            .then((data: Product[]) => {
                // Map over the fetched data to ensure 'price' is a number
                // This is crucial if your API might return price as a string
                const parsedProducts = data.map(p => ({
                    ...p,
                    price: typeof p.price === 'string' ? parseFloat(p.price) : p.price
                }));
                // Set the fetched and parsed products to state
                setProducts(parsedProducts);
                // Set loading to false as data has been fetched
                setLoading(false);
            })
            .catch((err) => {
                // Log the error to the console for debugging
                console.error("Failed to fetch products:", err);
                // Set an error message for display
                setError("Failed to fetch products. Please try again later.");
                // Set loading to false even if there's an error
                setLoading(false);
            });
    }, []); // Empty dependency array means this effect runs once on mount

    // Conditional rendering for loading state
    if (loading) {
        return (
            <>
                <Navigation />
                <div className="pt-20 text-center">
                    <p className="text-lg text-gray-700">Loading products...</p>
                </div>
            </>
        );
    }

    // Conditional rendering for error state
    if (error) {
        return (
            <>
                <Navigation />
                <div className="pt-20 text-center">
                    <p className="text-lg text-red-600">{error}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navigation />
            {/* Main content area, with padding-top to account for fixed navigation */}
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pt-20">
                <h1 className="text-3xl font-bold mb-8 text-center text-rose-600">
                    Shop Our Collection
                </h1>
                {/* Grid layout for products, responsive across different screen sizes */}
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {/* Map through the products array to render each product card */}
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg"
                        >
                            <div className="relative group">
                                {/* Product image */}
                                <img
                                    src={`http://localhost:5000/uploads/${product.image}`}
                                    alt={product.name}
                                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Like/Unlike button with Heart icon */}
                                <button
                                    className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg cursor-pointer"
                                    onClick={() => toggleLike(product.id)}
                                    aria-label={
                                        likes.includes(product.id)
                                            ? "Unlike product"
                                            : "Like product"
                                    }
                                    title="Like"
                                >
                                    <Heart
                                        className={`h-5 w-5 transition-colors ${
                                            likes.includes(product.id)
                                                ? "fill-rose-500 text-rose-500"
                                                : "text-rose-500"
                                        }`}
                                    />
                                </button>
                            </div>
                            <CardContent className="p-6">
                                {/* Product name */}
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {product.name}
                                </h3>
                                {/* Product description, limited to 2 lines */}
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {product.description}
                                </p>
                                <div className="flex items-center justify-between mb-4">
                                    {/* Product price, formatted to two decimal places */}
                                    <span className="text-2xl font-bold text-rose-600">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    {/* Placeholder for 5-star rating */}
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="h-4 w-4 text-yellow-400 fill-current"
                                            />
                                        ))}
                                    </div>
                                </div>
                                {/* Add to Cart button */}
                                <Button
                                    onClick={() => addToCart(product)} // Pass the entire product object to addToCart
                                    className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white"
                                >
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Shop;