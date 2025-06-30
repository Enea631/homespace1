import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Home.css';

const agents = [
  {
    id: 1,
    name: 'Anna Smith',
    photo: '/images/agent1.jpg',
    description: 'Expert in residential properties with 10+ years helping clients find their dream home.',
  },
  {
    id: 2,
    name: 'John Doe',
    photo: '/images/agent2.jpg',
    description: 'Specializes in commercial real estate with a deep knowledge of local markets.',
  },
  {
    id: 3,
    name: 'Emily Johnson',
    photo: '/images/agent3.jpg',
    description: 'Passionate about matching buyers with the perfect apartment or condo.',
  },
  {
    id: 4,
    name: 'Michael Brown',
    photo: '/images/agent4.jpg',
    description: 'Experienced in luxury villas and vacation homes worldwide.',
  },
];

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-hero-text">
        <h1>Find Your Perfect Property</h1>
        <p>From cozy apartments to luxury villas — we’ve got it all.</p>
      </div>

      <Carousel className="home-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://localhost:5000/images/fotoprone.jpg"
            alt="Modern Living"
          />
          <Carousel.Caption>
            <h3>Modern Living</h3>
            <p>Spacious homes with contemporary design.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://localhost:5000/images/fotoprone1.jpg"
            alt="Urban Comfort"
          />
          <Carousel.Caption>
            <h3>Urban Comfort</h3>
            <p>Live in the heart of the city.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Who We Are */}
      <div className="home-company-info">
        <img
          src="http://localhost:5000/images/unnamed.jpg"
          alt="Company"
        />
        <h2>Who We Are</h2>
        <p>
          At <strong>Home Space</strong>, we’re passionate about helping people find their dream homes.
          With years of industry experience, we connect buyers, renters, and sellers with ease and trust.
          Whether you're moving in or moving on, we're here every step of the way.
        </p>
      </div>

      {/* Our History Section */}
      <div className="home-history-section">
        <h2>Our History</h2>
        <p>
          Founded in 2008, Home Space began as a small family-run agency with a big vision — to redefine real estate services
          by putting people first. Over the years, we’ve grown into a trusted name across the region, helping thousands
          of clients find not just properties, but places they can truly call home.
        </p>
        <p>
          From humble beginnings in a single office, we’ve expanded into multiple cities, building a team of passionate
          professionals dedicated to excellence, innovation, and personalized service. Our journey is a testament to our
          core belief: real estate is about relationships, not just transactions.
        </p>
      </div>

      {/* Sales Agents Section */}
      <section className="home-agents">
        <h2>Meet Our Sales Agents</h2>
        <div className="agent-cards">
          {agents.map(({ id, name, photo, description }) => (
            <div className="agent-card" key={id}>
              <img src={photo} alt={name} className="agent-photo" />
              <h3 className="agent-name">{name}</h3>
              <p className="agent-description">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
