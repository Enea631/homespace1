import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './PropertyDetail.scss';

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [mainImage, setMainImage] = useState(null);

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
      <p className="price"><strong>Price:</strong> ${property.price}</p>

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

export default PropertyDetail;
