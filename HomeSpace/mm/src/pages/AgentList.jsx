import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AgentList.scss';

function AgentList() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/agents')
      .then(res => setAgents(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading agents...</p>;

  return (
    <div className="agent-list">
      <h1>Our Agents</h1>
      <div className="agent-grid">
        {agents.map(agent => (
          <Link to={`/agents/${agent._id}`} key={agent._id} className="agent-card">
            {agent.imageUrl && (
              <img 
                src={agent.imageUrl.startsWith('http') ? agent.imageUrl : `http://localhost:5000${agent.imageUrl}`} 
                alt={agent.name} 
              />
            )}
            <h3>{agent.name}</h3>
            <p>{agent.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AgentList;
