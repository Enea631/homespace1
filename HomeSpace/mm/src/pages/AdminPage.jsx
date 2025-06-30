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
  existingImages: [],
  category: '',
};

const initialAgentState = {
  name: '',
  description: '',
  imageFile: null,
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

  // PROPERTY FORM HANDLERS
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
    setFormData((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, ...files] }));
  };

  const handleRemoveNewImage = (index) => {
    setFormData((prev) => {
      const newFiles = [...prev.imageUrls];
      newFiles.splice(index, 1);
      return { ...prev, imageUrls: newFiles };
    });
  };

  const handleRemoveExistingImage = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((img) => img !== imageUrl),
    }));
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

      data.append('existingImages', JSON.stringify(formData.existingImages));

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

  // AGENT FORM HANDLERS
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

  // Edit Property
  const handleEdit = (property) => {
    setEditingPropertyId(property._id);
    setFormData({
      title: property.title || '',
      price: property.price || '',
      address: {
        street: property.address?.street || '',
        city: property.address?.city || '',
      },
      mapLink: property.mapLink || '',
      bedrooms: property.bedrooms || '',
      bathrooms: property.bathrooms || '',
      size: property.size || '',
      description: property.description || '',
      imageUrls: [],
      existingImages: property.imageUrls || [],
      category: property.category || '',
    });
    window.scrollTo(0, 0);
  };

  // Delete Property
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this property?')) {
      try {
        await axios.delete(`http://localhost:5000/api/properties/${id}`);
        alert('Property deleted');
        fetchProperties();
      } catch (err) {
        alert('Error deleting property');
        console.error(err);
      }
    }
  };

  // Delete Contact
  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure to delete this contact message?')) {
      try {
        await axios.delete(`http://localhost:5000/api/contact/${id}`);
        alert('Contact deleted');
        fetchContacts();
      } catch (err) {
        alert('Error deleting contact');
        console.error(err);
      }
    }
  };

  return (
    <div className="admin-page">
      {/* Left side nav */}
      <nav className="admin-nav">
        <h3>Admin Navigation</h3>
        <ul>
          <li><a href="#contacts">Contact Messages</a></li>
          <li><a href="#properties">Properties</a></li>
          <li><a href="#property-form">Create Properties</a></li>
          <li><a href="#agents">Agents</a></li>
          <li><a href="#agent-form">Add Agents</a></li>
        </ul>
      </nav>

      {/* Main content */}
      <main className="admin-main">
        {/* CONTACTS */}
        <section id="contacts">
          <h1>Contact Messages</h1>
          {loadingContacts ? (
            <p>Loading...</p>
          ) : contacts.length === 0 ? (
            <p>No contact messages found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact._id}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.message}</td>
                    <td>
                      <button className="delete" onClick={() => handleDeleteContact(contact._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* PROPERTIES */}
        <section id="properties" className="section-margin-top">
          <h2>Existing Properties</h2>
          {loadingProperties ? (
            <p>Loading...</p>
          ) : properties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Address</th>
                  <th>Bedrooms</th>
                  <th>Bathrooms</th>
                  <th>Size</th>
                  <th>Category</th>
                  <th>Images</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property._id}>
                    <td>{property.title}</td>
                    <td>${property.price}</td>
                    <td>{property.address?.street}, {property.address?.city}</td>
                    <td>{property.bedrooms}</td>
                    <td>{property.bathrooms}</td>
                    <td>{property.size} sq ft</td>
                    <td>{property.category}</td>
                    <td>
                      {property.imageUrls?.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={property.title}
                          style={{ width: '50px', marginRight: '5px' }}
                        />
                      ))}
                    </td>
                    <td>
                      <button onClick={() => handleEdit(property)}>Edit</button>
                      <button className="delete" onClick={() => handleDelete(property._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* PROPERTY FORM */}
        <section id="property-form" className="section-margin-top">
          <h1>Create Properties</h1>
          <form onSubmit={handlePropertySubmit} encType="multipart/form-data">
            <div>
              <label>Title</label><br />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handlePropertyChange}
                required
              />
            </div>
            <div>
              <label>Price</label><br />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handlePropertyChange}
                required
              />
            </div>
            <div>
              <label>Street</label><br />
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handlePropertyChange}
                required
              />
            </div>
            <div>
              <label>City</label><br />
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handlePropertyChange}
                required
              />
            </div>
            <div>
              <label>Map Link</label><br />
              <input
                type="text"
                name="mapLink"
                value={formData.mapLink}
                onChange={handlePropertyChange}
              />
            </div>
            <div>
              <label>Bedrooms</label><br />
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handlePropertyChange}
                required
              />
            </div>
            <div>
              <label>Bathrooms</label><br />
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handlePropertyChange}
                required
              />
            </div>
            <div>
              <label>Size (sq ft)</label><br />
              <input
                type="number"
                name="size"
                value={formData.size}
                onChange={handlePropertyChange}
                required
              />
            </div>
            <div>
              <label>Description</label><br />
              <textarea
                name="description"
                value={formData.description}
                onChange={handlePropertyChange}
                required
              />
            </div>
            <div>
              <label>Category</label><br />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handlePropertyChange}
                required
              />
            </div>
            <div>
              <label>Upload Images</label><br />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePropertyFileChange}
              />
            </div>
            <div>
              <p>New Images:</p>
              {formData.imageUrls.length === 0 && <p>No new images added</p>}
              <ul>
                {formData.imageUrls.map((file, idx) => (
                  <li key={idx}>
                    {file.name}{' '}
                    <button type="button" onClick={() => handleRemoveNewImage(idx)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p>Existing Images:</p>
              {formData.existingImages.length === 0 && <p>No existing images</p>}
              <ul>
                {formData.existingImages.map((img, idx) => (
                  <li key={idx}>
                    <img src={img} alt="existing" style={{ width: '50px', marginRight: '5px' }} />
                    <button type="button" onClick={() => handleRemoveExistingImage(img)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ marginTop: '15px' }}>
              <button type="submit">{editingPropertyId ? 'Update' : 'Create'} Property</button>
              {editingPropertyId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingPropertyId(null);
                    setFormData(initialPropertyState);
                  }}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* AGENTS */}
        <section id="agents" className="section-margin-top">
          <h1>Agents</h1>
          {loadingAgents ? (
            <p>Loading...</p>
          ) : agents.length === 0 ? (
            <p>No agents found.</p>
          ) : (
            <table>
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
                      {agent.imageUrl && (
                        <img
                          src={agent.imageUrl}
                          alt={agent.name}
                          style={{ width: '50px' }}
                        />
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleEditAgent(agent)}>Edit</button>
                      <button className="delete" onClick={() => handleDeleteAgent(agent._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* AGENT FORM */}
        <section id="agent-form" className="section-margin-top">
          <h1>{editingAgentId ? 'Edit Agent' : 'Add Agent'}</h1>
          <form onSubmit={handleAgentSubmit} encType="multipart/form-data">
            <div>
              <label>Name</label><br />
              <input
                type="text"
                name="name"
                value={agentForm.name}
                onChange={handleAgentChange}
                required
              />
            </div>
            <div>
              <label>Description</label><br />
              <textarea
                name="description"
                value={agentForm.description}
                onChange={handleAgentChange}
                required
              />
            </div>
            <div>
              <label>Image</label><br />
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleAgentChange}
              />
            </div>
            <div style={{ marginTop: '15px' }}>
              <button type="submit">{editingAgentId ? 'Update' : 'Add'} Agent</button>
              {editingAgentId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingAgentId(null);
                    setAgentForm(initialAgentState);
                  }}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AdminPage;
