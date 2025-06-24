// src/pages/PropertyDetail.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`/api/properties/${id}`) // your Express route for single property
      .then(res => res.json())
      .then(data => setProperty(data))
      .catch(err => console.error('Error fetching property:', err));
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h1>{property.title}</h1>

      {/* Show all images */}
      <div style={styles.imageGallery}>
        {(property.imageUrls || []).map((url, i) => (
          <img key={i} src={url} alt={`${property.title} ${i + 1}`} style={styles.image} />
        ))}
      </div>

      <p style={styles.text}><strong>Location:</strong> {property.location}</p>
      {property.address && (
        <p style={styles.text}>
          <strong>Address:</strong> {property.address.street}, {property.address.city}
        </p>
      )}
      <p style={styles.text}><strong>Size:</strong> {property.size} m²</p>
      <p style={styles.text}><strong>Bedrooms:</strong> {property.bedrooms}</p>
      <p style={styles.text}><strong>Bathrooms:</strong> {property.bathrooms}</p>
      <p style={styles.text}><strong>Description:</strong> {property.description}</p>
      <p style={styles.price}><strong>Price:</strong> ${property.price}</p>

      {/* Optional Google Maps link */}
      {property.mapLink && (
        <p>
          <a href={property.mapLink} target="_blank" rel="noopener noreferrer">
            📍 View on Google Maps
          </a>
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  imageGallery: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '1rem',
  },
  image: {
    width: '100%',
    maxWidth: '250px',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  text: {
    marginBottom: '0.5rem',
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: '1rem',
  },
};

export default PropertyDetail;
