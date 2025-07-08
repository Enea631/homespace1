import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.scss";

const initialPropertyState = {
  title: "",
  price: "",
  address: { street: "", city: "" },
  mapLink: "",
  bedrooms: "",
  bathrooms: "",
  size: "",
  description: "",
  imageUrls: [],       // new uploaded files (File objects)
  existingImages: [],  // existing image URLs (strings)
  category: "",
  propertyType: "",
  agent: "",           // agent _id string
};

const initialAgentState = {
  name: "",
  description: "",
  imageFile: null,
};

function AdminPage() {
  // States
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState(initialPropertyState);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [loadingProperties, setLoadingProperties] = useState(false);

  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  const [agents, setAgents] = useState([]);
  const [agentForm, setAgentForm] = useState(initialAgentState);
  const [editingAgentId, setEditingAgentId] = useState(null);
  const [loadingAgents, setLoadingAgents] = useState(false);

  // Fetch all data on mount
  useEffect(() => {
    fetchProperties();
    fetchContacts();
    fetchAgents();
  }, []);

  // Fetch functions
  const fetchProperties = async () => {
    setLoadingProperties(true);
    try {
      const res = await axios.get("http://localhost:5000/api/properties");
      setProperties(res.data);
    } catch (err) {
      alert("Error fetching properties");
      console.error(err);
    }
    setLoadingProperties(false);
  };

  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      setContacts(res.data);
    } catch (err) {
      alert("Error fetching contacts");
      console.error(err);
    }
    setLoadingContacts(false);
  };

  const fetchAgents = async () => {
    setLoadingAgents(true);
    try {
      const res = await axios.get("http://localhost:5000/api/agents");
      setAgents(res.data);
    } catch (err) {
      alert("Error fetching agents");
      console.error(err);
    }
    setLoadingAgents(false);
  };

  // Handle changes in property form
  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle new image files selection
  const handlePropertyFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ...files],
    }));
  };

  // Remove a newly added image file (before upload)
  const handleRemoveNewImage = (index) => {
    setFormData((prev) => {
      const newFiles = [...prev.imageUrls];
      newFiles.splice(index, 1);
      return { ...prev, imageUrls: newFiles };
    });
  };

  // Remove an existing image (URL)
  const handleRemoveExistingImage = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((img) => img !== imageUrl),
    }));
  };

  // Submit property form (create or update)
  const handlePropertySubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("price", formData.price);
      data.append("address.street", formData.address.street);
      data.append("address.city", formData.address.city);
      data.append("mapLink", formData.mapLink);
      data.append("bedrooms", formData.bedrooms);
      data.append("bathrooms", formData.bathrooms);
      data.append("size", formData.size);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("propertyType", formData.propertyType);
      data.append("agent", formData.agent);

      // Append new image files
      formData.imageUrls.forEach((file) => {
        data.append("images", file);
      });

      // Append existing images (URLs) as JSON string
      if (formData.existingImages.length > 0) {
        data.append("existingImages", JSON.stringify(formData.existingImages));
      }

      if (editingPropertyId) {
        await axios.put(
          `http://localhost:5000/api/properties/${editingPropertyId}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Property updated");
      } else {
        await axios.post(
          "http://localhost:5000/api/properties",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Property created");
      }

      setFormData(initialPropertyState);
      setEditingPropertyId(null);
      fetchProperties();
    } catch (err) {
      alert("Error saving property");
      console.error(err);
    }
  };

  // Agent form change handler
  const handleAgentChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setAgentForm((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setAgentForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit agent form (create/update)
  const handleAgentSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", agentForm.name);
      data.append("description", agentForm.description);
      if (agentForm.imageFile) {
        data.append("image", agentForm.imageFile);
      }

      if (editingAgentId) {
        await axios.put(
          `http://localhost:5000/api/agents/${editingAgentId}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Agent updated");
      } else {
        await axios.post(
          "http://localhost:5000/api/agents",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Agent created");
      }

      setAgentForm(initialAgentState);
      setEditingAgentId(null);
      fetchAgents();
    } catch (err) {
      alert("Error saving agent");
      console.error(err);
    }
  };

  // Edit agent - prefill form
  const handleEditAgent = (agent) => {
    setEditingAgentId(agent._id);
    setAgentForm({
      name: agent.name || "",
      description: agent.description || "",
      imageFile: null,
    });
    window.scrollTo(0, 0);
  };

  // Delete agent
  const handleDeleteAgent = async (id) => {
    if (window.confirm("Are you sure to delete this agent?")) {
      try {
        await axios.delete(`http://localhost:5000/api/agents/${id}`);
        alert("Agent deleted");
        fetchAgents();
      } catch (err) {
        alert("Error deleting agent");
        console.error(err);
      }
    }
  };

  // Edit property - prefill form
  const handleEdit = (property) => {
    setEditingPropertyId(property._id);
    setFormData({
      title: property.title || "",
      price: property.price || "",
      address: {
        street: property.address?.street || "",
        city: property.address?.city || "",
      },
      mapLink: property.mapLink || "",
      bedrooms: property.bedrooms || "",
      bathrooms: property.bathrooms || "",
      size: property.size || "",
      description: property.description || "",
      imageUrls: [],
      existingImages: property.imageUrls || [],
      category: property.category || "",
      propertyType: property.propertyType || "",
      agent: property.agent || "",
    });
    window.scrollTo(0, 0);
  };

  // Delete property
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this property?")) {
      try {
        await axios.delete(`http://localhost:5000/api/properties/${id}`);
        alert("Property deleted");
        fetchProperties();
      } catch (err) {
        alert("Error deleting property");
        console.error(err);
      }
    }
  };

  // Delete contact message
  const handleDeleteContact = async (id) => {
    if (window.confirm("Are you sure to delete this contact message?")) {
      try {
        await axios.delete(`http://localhost:5000/api/contact/${id}`);
        alert("Contact deleted");
        fetchContacts();
      } catch (err) {
        alert("Error deleting contact");
        console.error(err);
      }
    }
  };

  // Helper to get full URL for images (adjust if needed)
  const getFullImageUrl = (url) =>
    url.startsWith("http") ? url : `http://localhost:5000${url}`;

  return (
    <div className="admin-page">
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

      <main className="admin-main">

        {/* CONTACT MESSAGES */}
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
                  <th>Agent</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact._id}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.message}</td>
                    <td>{contact.agent?.name || contact.agent || "N/A"}</td>
                    <td>{new Date(contact.createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => handleDeleteContact(contact._id)}
                      >
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
                  <th>Size (sq ft)</th>
                  <th>Category</th>
                  <th>Property Type</th>
                  <th>Agent</th>
                  <th>Images</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property._id}>
                    <td>{property.title}</td>
                    <td>${property.price.toLocaleString()}</td>
                    <td>
                      {property.address?.street}, {property.address?.city}
                    </td>
                    <td>{property.bedrooms}</td>
                    <td>{property.bathrooms}</td>
                    <td>{property.size}</td>
                    <td>{property.category}</td>
                    <td>{property.propertyType}</td>
                    <td>{property.agent?.name || property.agent || "N/A"}</td>
                    <td>
                      {property.imageUrls?.map((img, idx) => (
                        <img
                          key={idx}
                          src={getFullImageUrl(img)}
                          alt={property.title}
                          style={{ width: "50px", marginRight: "5px" }}
                        />
                      ))}
                    </td>
                    <td>
                      <button onClick={() => handleEdit(property)}>Edit</button>
                      <button
                        className="delete"
                        onClick={() => handleDelete(property._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* PROPERTY FORM */}
        <section id="property-form" className="section-margin-top">
          <h1>{editingPropertyId ? "Edit Property" : "Create Property"}</h1>
          <form onSubmit={handlePropertySubmit} encType="multipart/form-data">
            {/* Title */}
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

            {/* Price */}
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

            {/* Address street */}
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

            {/* Address city */}
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

            {/* Map link */}
            <div>
              <label>Map Link</label><br />
              <input
                type="text"
                name="mapLink"
                value={formData.mapLink}
                onChange={handlePropertyChange}
              />
            </div>

            {/* Bedrooms */}
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

            {/* Bathrooms */}
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

            {/* Size */}
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

            {/* Description */}
            <div>
              <label>Description</label><br />
              <textarea
                name="description"
                value={formData.description}
                onChange={handlePropertyChange}
                required
              />
            </div>

            {/* Property Type */}
            <div>
              <label>Property Type</label><br />
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handlePropertyChange}
                required
              >
                <option value="">-- Select Type --</option>
                <option value="villa">Villa</option>
                <option value="apartament">Apartament</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label>Category</label><br />
              <select
                name="category"
                value={formData.category}
                onChange={handlePropertyChange}
                required
              >
                <option value="">-- Select Category --</option>
                <option value="for sale">Sale</option>
                <option value="for rent">Rent</option>
              </select>
            </div>

            {/* Agent */}
            <div>
              <label>Agent</label><br />
              <select
                name="agent"
                value={formData.agent || ""}
                onChange={handlePropertyChange}
                required
              >
                <option value="">-- Select Agent --</option>
                {agents.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload images */}
            <div>
              <label>Upload Images</label><br />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePropertyFileChange}
              />
            </div>

            {/* New images preview */}
            <div>
              <p>New Images:</p>
              {formData.imageUrls.length === 0 && <p>No new images added</p>}
              <ul>
                {formData.imageUrls.map((file, idx) => (
                  <li key={idx}>
                    {file.name}{" "}
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(idx)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Existing images preview */}
            <div>
              <p>Existing Images:</p>
              {formData.existingImages.length === 0 && (
                <p>No existing images</p>
              )}
              <ul>
                {formData.existingImages.map((url, idx) => (
                  <li key={idx}>
                    <img
                      src={getFullImageUrl(url)}
                      alt={`Existing ${idx}`}
                      style={{ width: "100px", marginRight: "10px" }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(url)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button type="submit">{editingPropertyId ? "Update" : "Create"}</button>
            {editingPropertyId && (
              <button
                type="button"
                onClick={() => {
                  setFormData(initialPropertyState);
                  setEditingPropertyId(null);
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </section>

        {/* AGENTS TABLE */}
        <section id="agents" className="section-margin-top">
          <h2>Agents</h2>
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
                      {agent.imageUrl ? (
                        <img
                          src={getFullImageUrl(agent.imageUrl)}
                          alt={agent.name}
                          style={{ width: "50px" }}
                        />
                      ) : (
                        "No image"
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleEditAgent(agent)}>Edit</button>
                      <button
                        className="delete"
                        onClick={() => handleDeleteAgent(agent._id)}
                      >
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
          <h1>{editingAgentId ? "Edit Agent" : "Add Agent"}</h1>
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

            <button type="submit">{editingAgentId ? "Update" : "Add"}</button>
            {editingAgentId && (
              <button
                type="button"
                onClick={() => {
                  setAgentForm(initialAgentState);
                  setEditingAgentId(null);
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}

export default AdminPage;
