import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PropertyList.scss';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [currentImages, setCurrentImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then((res) => {
        setProperties(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching properties:', err);
        setLoading(false);
      });
  }, []);

  const handleImageChange = (propertyId, totalImages, direction) => {
    setCurrentImages((prev) => {
      const currentIndex = prev[propertyId] ?? 0;
      const newIndex = direction === 'next'
        ? (currentIndex + 1) % totalImages
        : (currentIndex - 1 + totalImages) % totalImages;
      return { ...prev, [propertyId]: newIndex };
    });
  };

  const getImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/300x200';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `http://localhost:5000${url}`;
  };

  const truncate = (str, maxLength) =>
    !str ? '' : str.length > maxLength ? str.slice(0, maxLength) + '...' : str;

  const renderPropertyCard = (property) => {
    const totalImages = property.imageUrls?.length || 0;
    const currentIndex = currentImages[property._id] ?? 0;
    const imageUrl = totalImages > 0
      ? getImageUrl(property.imageUrls[currentIndex])
      : getImageUrl(null);

    return (
      <Link to={`/property/${property._id}`} key={property._id} className="property-card" onClick={(e) => e.stopPropagation()}>
        <div className="carousel">
          <button className="carousel-button prev" onClick={(e) => {
            e.preventDefault();
            handleImageChange(property._id, totalImages, 'prev');
          }}>
            &#10094;
          </button>

          <img src={imageUrl} alt={`img-${currentIndex}`} className="carousel-image" />

          <button className="carousel-button next" onClick={(e) => {
            e.preventDefault();
            handleImageChange(property._id, totalImages, 'next');
          }}>
            &#10095;
          </button>
        </div>

        <div className="property-info">
          <h3>{property.title}</h3>
          <p>{property.address?.city || 'Unknown City'}</p>
          <p className="property-price">${property.price.toLocaleString()}</p>
          <p>{truncate(property.description, 100)}</p>
        </div>
      </Link>
    );
  };

  const renderSection = (title, items) => (
    <div className="property-section">
      <h2>{title}</h2>
      {items.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="property-list-grid">
          {items.map(renderPropertyCard)}
        </div>
      )}
    </div>
  );

  // Filter properties by category and type
  const forSale = properties.filter(p => p.category === 'for sale');
  const forRent = properties.filter(p => p.category === 'for rent');

  const filterByType = (items, propertyType) => items.filter(p => p.propertyType === propertyType);

  return (
    <section className="property-page">
      <div className="property-header">
        <h1>Browse Properties</h1>
        <p>Explore properties available for sale and rent.</p>
      </div>

      {loading ? (
        <p>Loading properties...</p>
      ) : (
        <>
          {/* For Sale Section */}
          <div className="property-section">
            <h2>Properties For Sale</h2>

            {/* Villas for Sale */}
            {renderSection('Villas', filterByType(forSale, 'villa'))}

            {/* Apartments for Sale */}
            {renderSection('Apartments', filterByType(forSale, 'apartament'))}
          </div>

          {/* For Rent Section */}
          <div className="property-section">
            <h2>Properties For Rent</h2>

            {/* Villas for Rent */}
            {renderSection('Villas', filterByType(forRent, 'villa'))}

            {/* Apartments for Rent */}
            {renderSection('Apartments', filterByType(forRent, 'apartament'))}
          </div>
        </>
      )}
    </section>
  );
};

export default PropertyList;
