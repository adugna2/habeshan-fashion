// AdminMenu.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAdminAuth } from '../../auth/AdminAuthContext'; // Adjust path if AdminAuthContext is elsewhere

// Sidebar navigation for the admin panel.
const AdminMenu: React.FC = () => {
  const { logout } = useAdminAuth(); // Get logout function from context.
  const navigate = useNavigate(); // Hook for navigation.

  // Handle admin logout.
  const handleLogout = () => {
    logout(); // Clear token and update login status.
    toast.info('Logged out successfully!');
    navigate('/admin/login'); // Redirect to login page.
  };

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-5 fixed top-0 left-0 overflow-y-auto shadow-lg rounded-r-lg">
      <h2 className="text-3xl font-extrabold mb-8 text-indigo-400">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/admin/products"
            className="flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
            </svg>
            <span className="text-lg">View Products</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/products/add"
            className="flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-lg">Add Product</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/orders"
            className="flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span className="text-lg">View Orders</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/payment-methods"
            className="flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span className="text-lg">Payment Methods</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/contacts"
            className="flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-lg">Contact Messages</span>
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-left p-2 rounded-md hover:bg-red-700 transition duration-200 mt-8"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-lg">Logout</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default AdminMenu; // This line ensures it's exported as a named export