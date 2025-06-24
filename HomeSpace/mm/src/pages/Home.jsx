import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Home.css';

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
            src="/images/fotoprone.jpg"
          />
          <Carousel.Caption>
            <h3>Modern Living</h3>
            <p>Spacious homes with contemporary design.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/fotoprone1.jpg"
          />
          <Carousel.Caption>
            <h3>Urban Comfort</h3>
            <p>Live in the heart of the city.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      
<div className="home-company-info">
  <img
    alt="Home Space Logo"
    className="company-logo"
  />
  <h2>Who We Are</h2>
  <p>
    At <strong>Home Space</strong>, we’re passionate about helping people find their dream homes.
    With years of industry experience, we connect buyers, renters, and sellers with ease and trust.
    Whether you're moving in or moving on, we're here every step of the way.
  </p>
</div>


    </div>
  );
};

export default Home;
