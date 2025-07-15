import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './AgentDetail.scss';

function AgentDetail() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/agents/${id}`)
      .then(res => setAgent(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading agent details...</p>;
  if (!agent) return <p>Agent not found</p>;

   const truncate = (str, maxLength) =>
    !str ? '' : str.length > maxLength ? str.slice(0, maxLength) + '...' : str;

  return (
    <div className="agent-detail">
      <Link to="/agentlist" className="back-link">← Back to Agents</Link>
      <div className="agent-info">
        {agent.imageUrl && (
          <img 
            src={agent.imageUrl.startsWith('http') ? agent.imageUrl : `http://localhost:5000${agent.imageUrl}`} 
            alt={agent.name} 
          />
        )}
        <h1>{agent.name}</h1>
        <p><strong>Email:</strong> {agent.email}</p>
        <p><strong>Phone:</strong> {agent.phone}</p>
        <p>{agent.description}</p>
      </div>

      <h2>Properties by {agent.name}</h2>
      <div className="properties-grid">
        {agent.properties && agent.properties.length > 0 ? (
          agent.properties.map(property => (
            <Link to={`/property/${property._id}`} key={property._id} className="property-card">
              {property.imageUrls && property.imageUrls[0] && (
                <img 
                  src={property.imageUrls[0].startsWith('http') ? property.imageUrls[0] : `http://localhost:5000${property.imageUrls[0]}`} 
                  alt={property.title} 
                />
              )}
              <h3>{property.title}</h3>
              <p><strong>${property.price.toLocaleString()}</strong></p>
              <p>{property.address?.street}, {property.address?.city}</p>
              <p>{truncate(property.description, 100)}</p>
            </Link>
          ))
        ) : (
          <p>No properties found for this agent.</p>
        )}
      </div>
    </div>
  );
}

export default AgentDetail;
