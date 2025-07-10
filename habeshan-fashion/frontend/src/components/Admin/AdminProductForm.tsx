// AdminProductForm.tsx
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

interface ProductData {
  name: string;
  description: string;
  price: string;
  image?: File | null;
}

interface Props {
  onProductAdded?: (product: ProductData) => void;
  initialData?: ProductData;
  editingId?: string;
}

const AdminProductForm: React.FC<Props> = ({ onProductAdded, initialData, editingId }) => {
  const [formData, setFormData] = useState<ProductData>({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price.toString(),
        image: null,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? (target.files && target.files[0]) || null : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    // --- NEW Frontend Price Validation ---
    const numericPrice = parseFloat(formData.price);
    if (isNaN(numericPrice) || numericPrice < 0) {
        toast.error("Price must be a valid non-negative number (e.g., 29.99).");
        return; // Stop submission
    }
    // --- END NEW Validation ---

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("price", formData.price); // Send as string, backend will parse
    if (formData.image) {
      payload.append("image", formData.image);
    }

    if (!formData.name || !formData.price) {
      toast.error("Product Name and Price are required.");
      return;
    }

    if (!editingId && !formData.image) {
      toast.error("An image is required for new products.");
      return;
    }

    try {
      const url = `http://localhost:5000/api/products${editingId ? `/${editingId}` : ""}`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to process product request.");
      }

      const data = await res.json();
      toast.success(editingId ? "Product updated successfully!" : "Product added successfully!");

      if (onProductAdded && !editingId) {
        onProductAdded(data);
      }

      if (!editingId) {
        setFormData({ name: "", description: "", price: "", image: null });
      }
    } catch (err: any) {
      console.error("Product form submission error:", err);
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-6 bg-white shadow rounded" encType="multipart/form-data">
      <h2 className="text-xl font-bold mb-4">
        {editingId ? "Edit Product" : "Add New Product"}
      </h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description (optional)"
        className="w-full p-2 border rounded"
      />

      <input
        type="text" // Keep as type="text" to allow decimals
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="w-full p-2 border rounded"
        accept="image/*"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {editingId ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default AdminProductForm;