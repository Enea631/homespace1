import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './PropertyDetail.scss';

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [agent, setAgent] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    agent: '',  // <-- keep this key as `agent`
  });

  const getImageUrl = (url) => `http://localhost:5000${url}`;

  useEffect(() => {
    // Fetch property details
    axios.get(`http://localhost:5000/api/properties/${id}`)
      .then(res => {
        setProperty(res.data);
        if (res.data.imageUrls && res.data.imageUrls.length > 0) {
          setMainImage(getImageUrl(res.data.imageUrls[0]));
        }

        // Fetch agent info
        if (res.data.agent) {
          axios.get(`http://localhost:5000/api/agents/${res.data.agent}`)
            .then(agentRes => {
              setAgent(agentRes.data);
              setFormData(prev => ({
                ...prev,
                agent: agentRes.data._id  // <-- set agent id here correctly
              }));
            })
            .catch(err => {
              console.error('Error fetching agent:', err);
              setAgent(null);
            });
        } else {
          setAgent(null);
        }
      })
      .catch(err => console.error('Error fetching property:', err));
  }, [id]);

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      alert('Message sent to agent!');
      setFormData({
        name: '',
        email: '',
        message: '',
        agent: agent ? agent._id : '',  // reset with agent id for next message
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  if (!property) return <p>Loading...</p>;

  return (
    <div className="property-detail">
      <h1>{property.title}</h1>

      <div className="image-gallery">
        <div className="main-image">
          <img src={mainImage} alt={property.title} />
        </div>
        <div className="thumbnails">
          {(property.imageUrls || []).map((url, i) => {
            const fullUrl = getImageUrl(url);
            return (
              <img
                key={i}
                src={fullUrl}
                alt={`${property.title} ${i + 1}`}
                className={mainImage === fullUrl ? 'active' : ''}
                onClick={() => setMainImage(fullUrl)}
              />
            );
          })}
        </div>
      </div>

      <div className="property-main-content">
        <div className="left-content">
          <p><strong>Location:</strong> {property.location}</p>
          {property.address && (
            <p>
              <strong>Address:</strong> {property.address.street}, {property.address.city}
            </p>
          )}
          <p><strong>Size:</strong> {property.size} m²</p>
          <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
          <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
          <p><strong>Description:</strong> {property.description}</p>
          <p className="price"><strong>Price:</strong> ${property.price.toLocaleString()}</p>

          {property.mapLink && (
            <p>
              <a href={property.mapLink} target="_blank" rel="noopener noreferrer">
                📍 View on Google Maps
              </a>
            </p>
          )}
        </div>

        <div className="right-sidebar">
          <div className="agent-card">
            <h3>Agent Information</h3>
            {agent ? (
              <>
                <img
                  src={getImageUrl(agent.imageUrl)}
                  alt={agent.name}
                  style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
                />
                <p><strong>Name:</strong> {agent.name}</p>
                <p><strong>Email:</strong> {agent.email}</p>
                <p><strong>Phone:</strong> {agent.phone}</p>
                <p><strong>Description:</strong> {agent.description}</p>
              </>
            ) : (
              <p>Loading agent info...</p>
            )}
          </div>

          <div className="contact-form">
            <h3>Contact Agent</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your message"
                rows="4"
                value={formData.message}
                onChange={handleFormChange}
                required
              />
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
