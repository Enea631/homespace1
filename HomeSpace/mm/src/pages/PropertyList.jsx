import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('/api/propertieslist')
      .then(res => setProperties(res.data))
      .catch(err => console.error('Error fetching houses:', err));
  }, []);

  return (
    <div style={styles.list}>
      {properties.map((property) => (
        <Link to={`/property/${property._id}`} key={property._id} style={styles.card}>
          <img
            src={property.imageUrls?.[0] || 'https://via.placeholder.com/300x200'}
            alt={property.title}
            style={styles.image}
          />
          <div style={styles.details}>
            <h2 style={styles.title}>{property.title}</h2>
            <p style={styles.location}>{property.location}</p>
            <span style={styles.price}>${property.price}</span>
            {property.mapLink && (
              <p>
                <a href={property.mapLink} target="_blank" rel="noopener noreferrer">
                  📍 View on Map
                </a>
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

// Basic styling (unchanged)
const styles = {
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    padding: '2rem',
  },
  card: {
    display: 'block',
    border: '1px solid #ddd',
    borderRadius: '12px',
    overflow: 'hidden',
    textDecoration: 'none',
    color: 'inherit',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'box-shadow 0.2s ease',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  details: {
    padding: '1rem',
  },
  title: {
    fontSize: '1.2rem',
    margin: '0 0 0.5rem 0',
  },
  location: {
    color: '#666',
    marginBottom: '0.5rem',
  },
  price: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
};

export default PropertyList;
