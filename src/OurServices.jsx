import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import './OurServices.css';

export default function OurServices() {
  return (
    <div className="services-container">
      <h1 className="services-title">Our Services</h1>
      <div className="service-cards">
        {[
          { path: "/exercise-plans", title: "Exercise Plans", description: "Customized exercise plans for all fitness levels." },
          { path: "/customized-plans", title: "Customized Plans", description: "Tailored plans to suit individual goals and needs." },
          { path: "/personal-trainer", title: "Personal Trainer", description: "Get guidance from our certified personal trainers." },
          { path: "/equipments", title: "Equipments", description: "State-of-the-art gym equipment available for use." }
        ].map((service, index) => (
          <div className="service-card" key={index}>
            <Link to={service.path} className="service-link">
              <h2>{service.title}</h2>
            </Link>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
