import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.scss';


const initialFormState = {
  title: '',
  price: '',
  address: { street: '', city: '', state: '' },
  mapLink: '',
  bedrooms: '',
  bathrooms: '',
  size: '',
  description: '',
  imageUrls: '',
};

function AdminPage() {
  // Properties state & handlers
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [loadingProperties, setLoadingProperties] = useState(false);

  // Contacts state
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  useEffect(() => {
    fetchProperties();
    fetchContacts();
  }, []);

  // Fetch properties
  const fetchProperties = async () => {
    setLoadingProperties(true);
    try {
      const res = await axios.get('http://localhost:5000/api/properties');
      setProperties(res.data);
    } catch (err) {
      alert('Error fetching properties');
    }
    setLoadingProperties(false);
  };

  // Fetch contacts
  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const res = await axios.get('http://localhost:5000/api/contact');
      setContacts(res.data);
    } catch (err) {
      alert('Error fetching contacts');
    }
    setLoadingContacts(false);
  };

  // Handle property form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else if (name === 'imageUrls') {
      setFormData((prev) => ({
        ...prev,
        imageUrls: value.split(',').map((url) => url.trim()),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit property form for create or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/properties/${editingId}`, formData);
        alert('Property updated');
      } else {
        await axios.post('http://localhost:5000/api/properties', formData);
        alert('Property created');
      }
      setFormData(initialFormState);
      setEditingId(null);
      fetchProperties();
    } catch (err) {
      alert('Error saving property');
    }
  };

  // Edit property
  const handleEdit = (property) => {
    setEditingId(property._id);
    setFormData({
      title: property.title || '',
      price: property.price || '',
      address: property.address || { street: '', city: '', state: '' },
      mapLink: property.mapLink || '',
      bedrooms: property.bedrooms || '',
      bathrooms: property.bathrooms || '',
      size: property.size || '',
      description: property.description || '',
      imageUrls: property.imageUrls ? property.imageUrls.join(', ') : '',
    });
    window.scrollTo(0, 0);
  };

  // Delete property
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this property?')) {
      try {
        await axios.delete(`http://localhost:5000/api/properties/${id}`);
        alert('Property deleted');
        fetchProperties();
      } catch (err) {
        alert('Error deleting property');
      }
    }
  };

  // Delete contact
  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure to delete this contact message?')) {
      try {
        await axios.delete(`http://localhost:5000/api/contact/${id}`);
        alert('Contact message deleted');
        fetchContacts();
      } catch (err) {
        alert('Error deleting contact message');
      }
    }
  };

  return (
    <div className="admin-page" style={{ padding: 20, maxWidth: 900, margin: 'auto' }}>
      <h1>Admin - Manage Properties</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <h2>{editingId ? 'Edit Property' : 'Create Property'}</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="text"
          name="address.street"
          placeholder="Street"
          value={formData.address.street}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="text"
          name="address.city"
          placeholder="City"
          value={formData.address.city}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="text"
          name="address.state"
          placeholder="State"
          value={formData.address.state}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="text"
          name="mapLink"
          placeholder="Map Link"
          value={formData.mapLink}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="number"
          name="size"
          placeholder="Size (sq meters)"
          value={formData.size}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 8 }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="text"
          name="imageUrls"
          placeholder="Image URLs (comma separated)"
          value={formData.imageUrls}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 8 }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          {editingId ? 'Update Property' : 'Add Property'}
        </button>
        {editingId && (
          <button
            type="button"
            style={{ marginLeft: 10, padding: '10px 20px' }}
            onClick={() => {
              setEditingId(null);
              setFormData(initialFormState);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Existing Properties</h2>
      {loadingProperties ? (
        <p>Loading properties...</p>
      ) : properties.length === 0 ? (
        <p>No properties found</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Bedrooms</th>
              <th>Bathrooms</th>
              <th>Size (m²)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id}>
                <td>{property.title}</td>
                <td>{property.price}</td>
                <td>{property.bedrooms}</td>
                <td>{property.bathrooms}</td>
                <td>{property.size}</td>
                <td>
                  <button onClick={() => handleEdit(property)}>Edit</button>
                  <button
                    onClick={() => handleDelete(property._id)}
                    style={{ marginLeft: 10, color: 'red' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h1 style={{ marginTop: 40 }}>Contact Messages</h1>
      {loadingContacts ? (
        <p>Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p>No contact messages found</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" width="100%" style={{ marginTop: 10 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Received At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(({ _id, name, email, message, createdAt }) => (
              <tr key={_id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{message}</td>
                <td>{new Date(createdAt).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => handleDeleteContact(_id)}
                    style={{ color: 'red' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPage;
