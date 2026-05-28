import { useState } from 'react';
import { products, formatPrice } from '../data/products';

const AdminPanel = () => {
  const [items, setItems] = useState(products);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [message, setMessage] = useState('');

  const startEdit = (phone) => {
    setEditingId(phone.id);
    setEditName(phone.name);
    setEditPrice(phone.price);
  };

  const saveEdit = async (id) => {
    const updatedPhones = items.phones.map(p =>
      p.id === id ? { ...p, name: editName, price: Number(editPrice) } : p
    );
    const updatedProducts = { ...items, phones: updatedPhones };

    try {
      const token = sessionStorage.getItem('admin_token');
      const res = await fetch('/api/update-products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ products: updatedProducts })
      });
      if (res.ok) {
        setItems(updatedProducts);
        setEditingId(null);
        setMessage('Saved! Redeploying...');
      } else {
        const err = await res.json();
        setMessage('Error: ' + err.error);
      }
    } catch (err) {
      setMessage('Network error');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Panel</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <h3>Phones</h3>
      <ul>
        {items.phones.map(phone => (
          <li key={phone.id}>
            {editingId === phone.id ? (
              <>
                <input value={editName} onChange={e => setEditName(e.target.value)} />
                <input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} />
                <button onClick={() => saveEdit(phone.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <strong>{phone.name}</strong> – {formatPrice(phone.price)}
                <button onClick={() => startEdit(phone)} style={{ marginLeft: '10px' }}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {/* You can add similar sections for laptops, headsets, tablets later */}
    </div>
  );
};

export default AdminPanel;
