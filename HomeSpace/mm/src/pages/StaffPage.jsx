import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StaffPage.scss";

function StaffPage() {
  const [properties, setProperties] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProperty, setNewProperty] = useState({
    title: "",
    price: "",
    category: "",
    street: "",
    city: "",
    description: "",
    imageFiles: [],
  });

  // Get token from localStorage after login
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please log in");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [propertyRes, contactRes] = await Promise.all([
          axios.get("http://localhost:5000/api/properties", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/contact", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setProperties(propertyRes.data);
        setContacts(contactRes.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewProperty((prev) => ({ ...prev, imageFiles: [...e.target.files] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Please log in");

    const formData = new FormData();
    formData.append("title", newProperty.title);
    formData.append("price", newProperty.price);
    formData.append("category", newProperty.category);
    formData.append("description", newProperty.description);
    formData.append("street", newProperty.street);
    formData.append("city", newProperty.city);
    newProperty.imageFiles.forEach((file) => formData.append("images", file));

    try {
      const res = await axios.post("http://localhost:5000/api/properties", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties((prev) => [...prev, res.data]);
      setNewProperty({
        title: "",
        price: "",
        category: "",
        street: "",
        city: "",
        description: "",
        imageFiles: [],
      });
      alert("Property created!");
    } catch (err) {
      console.error(err);
      alert("Error creating property");
    }
  };

  if (!token) {
    return <p>Please log in to access your dashboard.</p>;
  }

  return (
    <div className="staff-page">
      <h1>Agent Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Contact Messages */}
          <section>
            <h2>Contact Messages</h2>
            {contacts.length === 0 ? (
              <p>No messages found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((msg) => (
                    <tr key={msg._id}>
                      <td>{msg.name}</td>
                      <td>{msg.email}</td>
                      <td>{msg.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          {/* Properties */}
          <section style={{ marginTop: "40px" }}>
            <h2>Properties</h2>
            {properties.length === 0 ? (
              <p>No properties found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Address</th>
                    <th>Category</th>
                    <th>Images</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((prop) => (
                    <tr key={prop._id}>
                      <td>{prop.title}</td>
                      <td>${prop.price}</td>
                      <td>
                        {prop.address?.street}, {prop.address?.city}
                      </td>
                      <td>{prop.category}</td>
                      <td>
                        {prop.imageUrls?.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt="property"
                            style={{ width: "40px", marginRight: "5px" }}
                          />
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          {/* Create Property */}
          <section className="section-margin-top">
            <h2>Create New Property</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={newProperty.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProperty.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={newProperty.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Street</label>
                <input
                  type="text"
                  name="street"
                  value={newProperty.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={newProperty.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Description</label>
                <textarea
                  name="description"
                  value={newProperty.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <button type="submit">Create Property</button>
            </form>
          </section>
        </>
      )}
    </div>
  );
}

export default StaffPage;
