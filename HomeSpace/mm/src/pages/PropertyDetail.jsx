import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './PropertyDetail.scss';

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const getImageUrl = (url) => `http://localhost:5000${url}`;

  useEffect(() => {
    axios.get(`http://localhost:5000/api/properties/${id}`)
      .then(res => {
        setProperty(res.data);
        if (res.data.imageUrls && res.data.imageUrls.length > 0) {
          setMainImage(getImageUrl(res.data.imageUrls[0]));
        }
      })
      .catch(err => console.error('Error fetching property:', err));
  }, [id]);

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent to agent!');
    setFormData({ name: '', email: '', message: '' });
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
        {/* Left content */}
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

        {/* Right content - agent info and contact form */}
        <div className="right-sidebar">
          <div className="agent-card">
            <h3>Agent Information</h3>
            <p><strong>Name:</strong> {property.agent || 'Unknown Agent'}</p>
            <p><strong>Email:</strong> agent@example.com</p>
            <p><strong>Phone:</strong> +355 69 123 4567</p>
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
