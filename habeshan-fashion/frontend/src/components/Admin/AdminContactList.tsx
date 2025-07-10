import React, { useEffect, useState } from 'react';

interface Contact {
  id: number;
  service_type: string;
  message: string;
  contact_method: string;
  created_at: string;
}

const AdminContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) throw new Error('No admin token found, please login.');

        const res = await fetch('http://localhost:5000/api/contact', {
          headers: {
            Authorization: `Bearer ${token}`,  // Important: include 'Bearer ' prefix
          },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to fetch contact messages');
        }

        const data = await res.json();
        setContacts(data);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message);
      }
    };

    fetchContacts();
  }, []);

  const deleteContact = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        alert('No admin token found. Please login.');
        return;
      }

      const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        alert('Failed to delete contact message.');
        return;
      }

      setContacts((prev) => prev.filter((contact) => contact.id !== id));
    } catch (err) {
      alert('Network error');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {contacts.length === 0 ? (
        <p>No contact messages found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Service Type</th>
              <th className="p-2">Message</th>
              <th className="p-2">Contact Method</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-t">
                <td className="p-2">{contact.service_type}</td>
                <td className="p-2">{contact.message}</td>
                <td className="p-2">{contact.contact_method}</td>
                <td className="p-2">{new Date(contact.created_at).toLocaleString()}</td>
                <td className="p-2">
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    aria-label="Delete contact message"
                    title="Delete contact message"
                  >
                    {/* Trash icon SVG */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminContactList;
