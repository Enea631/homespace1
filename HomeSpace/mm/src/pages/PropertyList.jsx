import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PropertyList.scss';

function PropertyList() {
  const [properties, setProperties] = useState([]);
  // We'll keep track of current image index for each property by property _id
  const [currentImages, setCurrentImages] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then(res => setProperties(res.data))
      .catch(err => console.error('Error fetching properties:', err));
  }, []);

  const truncate = (str, maxLength) => {
    if (!str) return '';
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
  };

  const getImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/300x200';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `http://localhost:5000${url}`;
  };

  // Handlers to go to next or previous image for a property
  const nextImage = (propertyId, totalImages) => {
    setCurrentImages(prev => {
      const currentIndex = prev[propertyId] ?? 0;
      const nextIndex = (currentIndex + 1) % totalImages;
      return { ...prev, [propertyId]: nextIndex };
    });
  };

  const prevImage = (propertyId, totalImages) => {
    setCurrentImages(prev => {
      const currentIndex = prev[propertyId] ?? 0;
      const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
      return { ...prev, [propertyId]: prevIndex };
    });
  };

  return (
    <div className="property-list">
      {properties.length === 0 && <p>No properties found.</p>}
      {properties.map((property) => {
        const totalImages = property.imageUrls?.length || 0;
        const currentIndex = currentImages[property._id] ?? 0;
        const currentImageUrl = totalImages > 0 ? getImageUrl(property.imageUrls[currentIndex]) : 'https://via.placeholder.com/300x200';

        return (
          <Link to={`/property/${property._id}`} key={property._id} className="property-card" onClick={e => e.stopPropagation()}>
            <div className="carousel">
              <button
                type="button"
                className="carousel-button prev"
                onClick={e => {
                  e.preventDefault(); // prevent link navigation
                  prevImage(property._id, totalImages);
                }}
              >
                &#10094;
              </button>

              <img src={currentImageUrl} alt={`img-${currentIndex}`} className="carousel-image" />

              <button
                type="button"
                className="carousel-button next"
                onClick={e => {
                  e.preventDefault();
                  nextImage(property._id, totalImages);
                }}
              >
                &#10095;
              </button>
            </div>
            <div className="property-info">
              <h2>{property.title}</h2>
              <p>{property.address?.city || property.location}</p>
              <span>${property.price.toLocaleString()}</span>
              <p>{truncate(property.description, 100)}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default PropertyList;
