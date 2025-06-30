import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.scss';

const initialPropertyState = {
  title: '',
  price: '',
  address: { street: '', city: '' },
  mapLink: '',
  bedrooms: '',
  bathrooms: '',
  size: '',
  description: '',
  imageUrls: [],
  category: '',
};

const initialAgentState = {
  name: '',
  description: '',
  imageFile: null, // single image file
};

function AdminPage() {
  // Properties state
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState(initialPropertyState);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [loadingProperties, setLoadingProperties] = useState(false);

  // Contacts state
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  // Agents state
  const [agents, setAgents] = useState([]);
  const [agentForm, setAgentForm] = useState(initialAgentState);
  const [editingAgentId, setEditingAgentId] = useState(null);
  const [loadingAgents, setLoadingAgents] = useState(false);

  // Fetch on mount
  useEffect(() => {
    fetchProperties();
    fetchContacts();
    fetchAgents();
  }, []);

  // Fetch Properties
  const fetchProperties = async () => {
    setLoadingProperties(true);
    try {
      const res = await axios.get('http://localhost:5000/api/properties');
      setProperties(res.data);
    } catch {
      alert('Error fetching properties');
    }
    setLoadingProperties(false);
  };

  // Fetch Contacts
  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const res = await axios.get('http://localhost:5000/api/contact');
      setContacts(res.data);
    } catch {
      alert('Error fetching contacts');
    }
    setLoadingContacts(false);
  };

  // Fetch Agents
  const fetchAgents = async () => {
    setLoadingAgents(true);
    try {
      const res = await axios.get('http://localhost:5000/api/agents');
      setAgents(res.data);
    } catch {
      alert('Error fetching agents');
    }
    setLoadingAgents(false);
  };

  // === PROPERTY FORM HANDLERS ===
  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePropertyFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, imageUrls: files }));
  };

  const handlePropertySubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('price', formData.price);
      data.append('address.street', formData.address.street);
      data.append('address.city', formData.address.city);
      data.append('mapLink', formData.mapLink);
      data.append('bedrooms', formData.bedrooms);
      data.append('bathrooms', formData.bathrooms);
      data.append('size', formData.size);
      data.append('description', formData.description);
      data.append('category', formData.category);
      formData.imageUrls.forEach((file) => {
        data.append('images', file);
      });

      if (editingPropertyId) {
        await axios.put(`http://localhost:5000/api/properties/${editingPropertyId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Property updated');
      } else {
        await axios.post('http://localhost:5000/api/properties', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Property created');
      }
      setFormData(initialPropertyState);
      setEditingPropertyId(null);
      fetchProperties();
    } catch (err) {
      alert('Error saving property');
      console.error(err);
    }
  };

  // === AGENT FORM HANDLERS ===
  const handleAgentChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setAgentForm((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setAgentForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAgentSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', agentForm.name);
      data.append('description', agentForm.description);
      if (agentForm.imageFile) {
        data.append('image', agentForm.imageFile);
      }

      if (editingAgentId) {
        await axios.put(`http://localhost:5000/api/agents/${editingAgentId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Agent updated');
      } else {
        await axios.post('http://localhost:5000/api/agents', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Agent created');
      }

      setAgentForm(initialAgentState);
      setEditingAgentId(null);
      fetchAgents();
    } catch (err) {
      alert('Error saving agent');
      console.error(err);
    }
  };

  // Edit Agent
  const handleEditAgent = (agent) => {
    setEditingAgentId(agent._id);
    setAgentForm({
      name: agent.name || '',
      description: agent.description || '',
      imageFile: null,
    });
    window.scrollTo(0, 0);
  };

  // Delete Agent
  const handleDeleteAgent = async (id) => {
    if (window.confirm('Are you sure to delete this agent?')) {
      try {
        await axios.delete(`http://localhost:5000/api/agents/${id}`);
        alert('Agent deleted');
        fetchAgents();
      } catch {
        alert('Error deleting agent');
      }
    }
  };

  // Your existing delete handlers for properties and contacts remain as they are...

  return (
    <div className="admin-page" style={{ padding: 20, maxWidth: 900, margin: 'auto' }}>
      {/* CONTACTS */}
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
                  <button onClick={() => handleDeleteContact(_id)} style={{ color: 'red' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* PROPERTIES */}
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
                  <button onClick={() => handleDelete(property._id)} style={{ marginLeft: 10, color: 'red' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h1>Admin - Manage Properties</h1>

      {/* Property Form */}
      <form onSubmit={handlePropertySubmit} style={{ marginBottom: 30 }}>
        <h2>{editingPropertyId ? 'Edit Property' : 'Create Property'}</h2>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handlePropertyChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handlePropertyChange} required />
        <input type="text" name="address.street" placeholder="Street" value={formData.address.street} onChange={handlePropertyChange} />
        <input type="text" name="address.city" placeholder="City" value={formData.address.city} onChange={handlePropertyChange} />
        <input type="text" name="mapLink" placeholder="Map Link" value={formData.mapLink} onChange={handlePropertyChange} />
        <input type="number" name="bedrooms" placeholder="Bedrooms" value={formData.bedrooms} onChange={handlePropertyChange} required />
        <input type="number" name="bathrooms" placeholder="Bathrooms" value={formData.bathrooms} onChange={handlePropertyChange} required />
        <input type="number" name="size" placeholder="Size (sq meters)" value={formData.size} onChange={handlePropertyChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handlePropertyChange} />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handlePropertyChange} />
        <input type="file" multiple onChange={handlePropertyFileChange} />
        <button type="submit" style={{ padding: '10px 20px', marginTop: 10 }}>
          {editingPropertyId ? 'Update Property' : 'Add Property'}
        </button>
        {editingPropertyId && (
          <button
            type="button"
            style={{ marginLeft: 10, padding: '10px 20px' }}
            onClick={() => {
              setEditingPropertyId(null);
              setFormData(initialPropertyState);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* === AGENT MANAGEMENT SECTION === */}
      <h1>Admin - Manage Agents</h1>

      <form onSubmit={handleAgentSubmit} style={{ marginBottom: 30 }}>
        <h2>{editingAgentId ? 'Edit Agent' : 'Create Agent'}</h2>
        <input
          type="text"
          name="name"
          placeholder="Agent Name"
          value={agentForm.name}
          onChange={handleAgentChange}
          required
        />
        <textarea
          name="description"
          placeholder="Agent Description"
          value={agentForm.description}
          onChange={handleAgentChange}
        />
        <input type="file" name="imageFile" accept="image/*" onChange={handleAgentChange} />
        <button type="submit" style={{ padding: '10px 20px', marginTop: 10 }}>
          {editingAgentId ? 'Update Agent' : 'Add Agent'}
        </button>
        {editingAgentId && (
          <button
            type="button"
            style={{ marginLeft: 10, padding: '10px 20px' }}
            onClick={() => {
              setEditingAgentId(null);
              setAgentForm(initialAgentState);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Existing Agents</h2>
      {loadingAgents ? (
        <p>Loading agents...</p>
      ) : agents.length === 0 ? (
        <p>No agents found</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent._id}>
                <td>{agent.name}</td>
                <td>{agent.description}</td>
                <td>
                  {agent.imageUrl ? (
                    <img
                      src={`http://localhost:5000/${agent.imageUrl}`}
                      alt={agent.name}
                      style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>
                  <button onClick={() => handleEditAgent(agent)}>Edit</button>
                  <button
                    onClick={() => handleDeleteAgent(agent._id)}
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
    </div>
  );
}

export default AdminPage;
