import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StaffPage.scss";

function StaffPage() {
  const [agentInfo, setAgentInfo] = useState(null);
  const [properties, setProperties] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please login");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Assuming your backend can decode the token and send agent info
        const agentRes = await axios.get("http://localhost:5000/api/agents/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAgentInfo(agentRes.data);

        // Fetch only properties belonging to this agent
        const propRes = await axios.get(
          `http://localhost:5000/api/properties?agent=${agentRes.data._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProperties(propRes.data);

        // Fetch only contact messages related to this agent
        const contactRes = await axios.get(
          `http://localhost:5000/api/contact?agent=${agentRes.data._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setContacts(contactRes.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (!token) return <p>Please log in to access your dashboard.</p>;

  if (loading) return <p>Loading...</p>;

  if (!agentInfo) return <p>Agent info not found.</p>;

  return (
    <div className="staff-page">
      <nav className="staff-nav">
        <h3>My Dashboard</h3>
        <ul>
          <li><a href="#info">My Info</a></li>
          <li><a href="#properties">My Properties</a></li>
          <li><a href="#contacts">My Contacts</a></li>
        </ul>
      </nav>

      <main className="staff-main">
        <section id="info">
          <h1>My Information</h1>
          <p><strong>Name:</strong> {agentInfo.name}</p>
          <p><strong>Description:</strong> {agentInfo.description}</p>
          {agentInfo.imageUrl && (
            <img
              src={agentInfo.imageUrl.startsWith("http") ? agentInfo.imageUrl : `http://localhost:5000${agentInfo.imageUrl}`}
              alt={agentInfo.name}
              style={{ maxWidth: "150px", borderRadius: "8px" }}
            />
          )}
        </section>

        <section id="properties" className="section-margin-top">
          <h2>My Properties</h2>
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
                    <td>${prop.price.toLocaleString()}</td>
                    <td>{prop.address?.street}, {prop.address?.city}</td>
                    <td>{prop.category}</td>
                    <td>
                      {prop.imageUrls?.map((img, idx) => (
                        <img
                          key={idx}
                          src={img.startsWith("http") ? img : `http://localhost:5000${img}`}
                          alt={prop.title}
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

        <section id="contacts" className="section-margin-top">
          <h2>My Contact Messages</h2>
          {contacts.length === 0 ? (
            <p>No contact messages found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((msg) => (
                  <tr key={msg._id}>
                    <td>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td>{msg.message}</td>
                    <td>{new Date(msg.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

export default StaffPage;
