import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminProductForm from "./AdminProductForm";

const AdminEditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">❌ {error}</p>;

  return (
    <div className="px-4 sm:px-8 py-6">
      <h1 className="text-2xl font-bold text-indigo-700 text-center mb-6">
        Edit Product
      </h1>
      <AdminProductForm initialData={product} editingId={id} />
    </div>
  );
};

export default AdminEditProduct;
