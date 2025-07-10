import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminProductForm from "./AdminProductForm";

const AdminProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const data = await res.json();

      // Defensive check: ensure data is an array
      if (!Array.isArray(data)) {
        setError("Invalid product data received from server.");
        setProducts([]);
        return;
      }

      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setError("Failed to load products. Please try again later.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = (product: any) => {
    setProducts((prev) => [product, ...prev]);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Error deleting product.");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Product Management</h1>
      <AdminProductForm onProductAdded={handleProductAdded} />

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {!loading && !error && (
        <table className="w-full mt-10 border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2 border">{p.name}</td>
                  <td className="p-2 border">{p.price}</td>
                  <td className="p-2 border">
                    <Link
                      to={`/admin/products/edit/${p.id}`}
                      className="text-blue-600 underline"
                    >
                      Edit
                    </Link>
                    {" | "}
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 underline ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-600">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProductList;
