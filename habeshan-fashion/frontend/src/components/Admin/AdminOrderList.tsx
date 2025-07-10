import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Order {
  id: string;
  user_id: number;
  total_amount: number;
  currency: string;
  shipping_address: string;
  payment_status:
    | 'pending'
    | 'paid'
    | 'failed'
    | 'refunded'
    | 'awaiting_transfer'
    | 'confirmed_cod'
    | 'cancelled';
  order_status:
    | 'pending'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'returned';
  created_at: string;
}

const AdminOrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) throw new Error('No admin token found, please login.');

        const res = await fetch('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to fetch orders');
        }

        const data = await res.json();
        setOrders(data);
      } catch (err: any) {
        console.error('Fetch orders error:', err);
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Customer Orders</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">❌ {error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b text-left text-sm font-semibold text-gray-700">Order ID</th>
                <th className="p-3 border-b text-left text-sm font-semibold text-gray-700">User ID</th>
                <th className="p-3 border-b text-left text-sm font-semibold text-gray-700">Total Amount</th>
                <th className="p-3 border-b text-left text-sm font-semibold text-gray-700">Payment Status</th>
                <th className="p-3 border-b text-left text-sm font-semibold text-gray-700">Order Status</th>
                <th className="p-3 border-b text-left text-sm font-semibold text-gray-700">Created At</th>
                <th className="p-3 border-b text-left text-sm font-semibold text-gray-700">Shipping Address</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50 transition duration-150">
                  <td className="p-3 text-sm">{order.id}</td>
                  <td className="p-3 text-sm">{order.user_id}</td>
                  <td className="p-3 text-sm">{order.total_amount.toFixed(2)} {order.currency}</td>
                  <td className="p-3 text-sm capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : ''}
                        ${order.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${['failed', 'cancelled'].includes(order.payment_status) ? 'bg-red-100 text-red-800' : ''}
                        ${order.payment_status === 'refunded' ? 'bg-blue-100 text-blue-800' : ''}
                      `}
                    >
                      {order.payment_status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="p-3 text-sm capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${order.order_status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                        ${order.order_status === 'shipped' ? 'bg-blue-100 text-blue-800' : ''}
                        ${['pending', 'processing'].includes(order.order_status) ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${['cancelled', 'returned'].includes(order.order_status) ? 'bg-red-100 text-red-800' : ''}
                      `}
                    >
                      {order.order_status}
                    </span>
                  </td>
                  <td className="p-3 text-sm">{new Date(order.created_at).toLocaleString()}</td>
                  <td className="p-3 text-sm">{order.shipping_address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrderList;
