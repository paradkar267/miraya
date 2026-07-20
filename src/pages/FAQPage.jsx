import React from 'react';
import './AboutPage.css'; // Reuse basic static page styling

const FAQPage = () => {
  return (
    <div className="about-page" style={{paddingTop: '100px', minHeight: '80vh'}}>
      <div className="about-hero" style={{height: '20vh'}}>
        <h1 style={{color: 'var(--primary-burgundy)', textAlign: 'center'}}>Frequently Asked Questions</h1>
      </div>
      <div className="about-content" style={{maxWidth: '800px', margin: '0 auto', padding: '2rem'}}>
        <h3 style={{color: 'var(--gold-accent)', marginTop: '2rem'}}>How long does delivery take?</h3>
        <p>Our standard delivery time is 7-10 business days for ready-to-wear items, and 3-4 weeks for custom or made-to-order pieces.</p>
        
        <h3 style={{color: 'var(--gold-accent)', marginTop: '2rem'}}>Do you ship internationally?</h3>
        <p>Yes, we ship globally. International shipping costs will apply and will be added at checkout.</p>
        
        <h3 style={{color: 'var(--gold-accent)', marginTop: '2rem'}}>Can I track my order?</h3>
        <p>Once your order is shipped, you will receive an email with a tracking number and link to trace your package.</p>
      </div>
    </div>
  );
};

export default FAQPage;
