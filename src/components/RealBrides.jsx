import React, { useState } from 'react';
import './RealBrides.css';

const bridesData = [
  {
    id: 1,
    name: "Aanya Sharma",
    review: "Wearing Miraya was like wearing a piece of art. Every detail, every thread felt so personal.",
    image: "/bride1.png",
  },
  {
    id: 2,
    name: "Meera Rajput",
    review: "These handcrafted lehenga's are not just outfits, they are a celebration of our culture and heritage.",
    image: "/bride2.png",
  },
  {
    id: 3,
    name: "Ishita Verma",
    review: "Timeless designs, flawless craftsmanship and the most luxurious experience.",
    image: "/bride3.png",
  }
];

const RealBrides = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % bridesData.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + bridesData.length) % bridesData.length);
  };

  const getVisibleBrides = () => {
    const prev = (activeIndex - 1 + bridesData.length) % bridesData.length;
    const next = (activeIndex + 1) % bridesData.length;
    return [
      { ...bridesData[prev], type: 'light', key: `prev-${bridesData[prev].id}` },
      { ...bridesData[activeIndex], type: 'dark', key: `active-${bridesData[activeIndex].id}` },
      { ...bridesData[next], type: 'light', key: `next-${bridesData[next].id}` },
    ];
  };

  const visibleBrides = getVisibleBrides();

  return (
    <section className="real-brides-section">
      <div className="floral-bg floral-left"></div>
      <div className="floral-bg floral-right"></div>
      
      <div className="container">
        <div className="section-header text-center">
          <div className="subtitle-wrapper">
            <span className="subtitle-line"></span>
            <span className="subtitle">CLIENT DIARIES</span>
            <span className="subtitle-line"></span>
          </div>
          <h2 className="title"><i>Real</i> Queens</h2>
          <p className="description">
            Glimpses of grace, elegance, and heritage worn by our beautiful brides.
          </p>
        </div>

        <div className="brides-carousel">
          {visibleBrides.map((bride) => (
            <div key={bride.key} className={`bride-card ${bride.type} animate-fade`}>
              <div className="bride-image-col">
                <img src={bride.image} alt={bride.name} className="bride-image" />
              </div>
              <div className="bride-text-col">
                {bride.type === "dark" ? (
                  <div className="quote-icon dark-quote">“</div>
                ) : null}
                
                {bride.type === "light" ? (
                  <>
                    <h3 className="bride-name">{bride.name}</h3>
                    <div className="stars">★★★★★</div>
                    <p className="bride-review">"{bride.review}"</p>
                    <div className="quote-icon light-quote">“</div>
                  </>
                ) : (
                  <>
                    <p className="bride-review"><i>{bride.review}</i></p>
                    <h3 className="bride-name">- {bride.name}</h3>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-controls">
          <button className="control-btn prev-btn" onClick={prevSlide}>←</button>
          <div className="carousel-dots">
            {bridesData.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              ></span>
            ))}
          </div>
          <button className="control-btn next-btn" onClick={nextSlide}>→</button>
        </div>

      </div>
    </section>
  );
};

export default RealBrides;
