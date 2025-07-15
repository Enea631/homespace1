import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [agents, setAgents] = useState([]);

  // Fetch agents from your backend
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/agents'); // Make sure this route works
        setAgents(res.data);
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      }
    };

    fetchAgents();
  }, []);
  const backendURL = 'http://localhost:5000';

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
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius nesciunt voluptas sit aliquam possimus ipsum si maiores mollitia animi suscipit non at deserunt nihil inctate impedit. Exercitatidebitis animi repellendus incidunt ullam corrupti officia perspiciatis consequuntur consequatur dignissimos, veniam a dicta! Vitae, architecto.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius nesciunt voluptas sit aliquam possimus ipsum sequi, officia asperiores officiis voluptatibus libero architecto aperiam ex recusandae repellendus impedit. Nihil accusamus velit emollitia animi suscipit non at deserunt nihil incidunt inventore atque solis animi repellendus incidunt ullam corrupti officia perspiciatis consequuntur consequatur dignissimos, veniam a dicta! Vitae, architecto.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius nesciunt voluptas sit aliquam possimus ipsum sequi, officia asperiores officiis voluptatibus libero architecto aperiam ex recusandae repellendus impedit. Nihil accusamus velit excndis debitis animi repellendus incidunt ullam corrupti officia perspiciatis consequuntur consequatur dignissimos, veniam a dicta! Vitae, architecto.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius nesciunt voluptas sit aliquam possimus ipsum sequi, officia asperiores officiis voluptatibus libero architecto aperiam ex recusandae repellendus impedit. Nihil accusamus velit excepturi quasi officiis delectus ullam? Quos nam vitae omnis fugit, nobis, obcaecati maior qui sequi ab nobis sunt, sapiente dignissimos voluptate impedit. Exercitationem minima neque similique beatae itaque vitae cumque enim iste ducimus! Perferendis debitis animi repellendus incidunt ullam corrupti officia perspiciatis consequuntur consequatur dignissimos, veniam a dicta! Vitae, architecto.</p>
      </div>

      {/* Sales Agents Section */}
      

<section className="home-agents">
  <h2>Meet Our Sales Agents</h2>
  <div className="agent-cards">
    {agents.map(({ _id, name, imageUrl, description }) => (
      <Link to={`/agents/${_id}`} key={_id} className="agent-card">
        <img
          src={`${backendURL}${imageUrl}`}
          alt={name}
          className="agent-photo"
        />
        <h3 className="agent-name">{name}</h3>
        <p className="agent-description">{description}</p>
      </Link>
    ))}
  </div>
</section>

<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, praesentium alias reiciendis voluptas repellat vel vitae at debitis qui autem ducimus et. Delectus earum laborum perferendis quidem, quas exercitationem rerum? Soluta optio molestias laudantium minima atque nesciunt consectetur veniam rerum!</p>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, praesentium alias reiciendis voluptas repellat vel vitae at debitis qui autem ducimus et. Delectus earum laborum perferendis quidem, quas exercitationem rerum? Soluta optio molestias laudantium minima atque nesciunt consectetur veniam rerum!</p>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, praesentium alias reiciendis voluptas repellat vel vitae at debitis qui autem ducimus et. Delectus earum laborum perferendis quidem, quas exercitationem rerum? Soluta optio molestias laudantium minima atque nesciunt consectetur veniam rerum!</p>
    </div>
  );
};

export default Home;
