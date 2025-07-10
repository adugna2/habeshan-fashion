// AdminPaymentMethodList.tsx
// Component to display a list of payment methods.
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner'; // Using sonner for consistent notifications

interface PaymentMethod {
    id: number; // Changed to number based on your latest SQL schema
    method_key: string; // Added method_key as per schema
    name: string;
    description: string;
    is_active: boolean; // Changed from 'status' to 'is_active'
    created_at: string;
    updated_at: string; // Added updated_at
}

const AdminPaymentMethodList: React.FC = () => {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            setLoading(true);
            setError('');
            try {
                const token = localStorage.getItem('adminToken');
                if (!token) throw new Error('No admin token found, please login.');

                const res = await fetch('http://localhost:5000/api/payment-methods', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || 'Failed to fetch payment methods');
                }

                const data = await res.json();
                setPaymentMethods(data);
            } catch (err: any) {
                console.error('Fetch payment methods error:', err);
                setError(err.message);
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentMethods();
    }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Manage Payment Methods</h1>
            {loading ? (
                <p className="text-center text-gray-600">Loading payment methods...</p>
            ) : error ? (
                <p className="text-center text-red-500">❌ {error}</p>
            ) : paymentMethods.length === 0 ? (
                <p className="text-center text-gray-600">No payment methods found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 border-b text-left text-sm font-semibold text-gray-700">ID</th>
                                <th className="p-3 border-b text-left text-sm font-semibold text-gray-700">Method Key</th>
                                <th className="p-3 border-b text-left text-sm font-semibold text-gray-700">Name</th>
                                <th className="p-3 border-b text-left text-sm font-semibold text-gray-700">Description</th>
                                <th className="p-3 border-b text-left text-sm font-semibold text-gray-700">Status</th>
                                <th className="p-3 border-b text-left text-sm font-semibold text-gray-700">Created At</th>
                                <th className="p-3 border-b text-left text-sm font-semibold text-gray-700">Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentMethods.map((method) => (
                                <tr key={method.id} className="border-b hover:bg-gray-50 transition duration-150">
                                    <td className="p-3 text-sm">{method.id}</td>
                                    <td className="p-3 text-sm">{method.method_key}</td>
                                    <td className="p-3 text-sm">{method.name}</td>
                                    <td className="p-3 text-sm">{method.description}</td>
                                    <td className="p-3 text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                            ${method.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                                        `}>
                                            {method.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-3 text-sm">{new Date(method.created_at).toLocaleString()}</td>
                                    <td className="p-3 text-sm">{new Date(method.updated_at).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminPaymentMethodList;