import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import './ContactPage.css';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page">
      <div className="contact-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="subtitle text-center">Get in Touch</div>
          <h1 className="contact-title text-center">
            <i>Visit our</i>
            ATELIER
          </h1>
        </motion.div>
      </div>

      <div className="container contact-container">
        <div className="contact-grid">
          
          {/* Left Column: Form */}
          <motion.div 
            className="contact-form-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { 
                opacity: 1, 
                x: 0, 
                transition: { duration: 1, staggerChildren: 0.15 } 
              }
            }}
          >
            <motion.h2 
              className="form-title"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
              }}
            >
              <span className="script-text">Connect with</span>
              <br />
              Miraya
            </motion.h2>
            <motion.p 
              className="form-desc"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
              }}
            >
              For bespoke appointments or general inquiries, please leave us a message below.
            </motion.p>
            
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <motion.div 
                className="form-group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
              >
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" required />
              </motion.div>
              <motion.div 
                className="form-group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
              >
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" required />
              </motion.div>
              <motion.div 
                className="form-group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
              >
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" required />
              </motion.div>
              <motion.div 
                className="form-group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
              >
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" required></textarea>
              </motion.div>
              <motion.button 
                type="submit" 
                className="submit-btn"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                }}
              >
                Send Message <span>⟶</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Right Column: Info & Map */}
          <motion.div 
            className="contact-info-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="contact-info-header">
              <h2 className="form-title" style={{ fontSize: '2.2rem' }}>
                <span className="script-text" style={{ fontSize: '1.4em' }}>Our</span>
                <br />
                Atelier
              </h2>
              <p className="form-desc" style={{ marginBottom: '3rem', opacity: 0.85 }}>
                We invite you to experience our collections in person. 
                Our doors are open for those who appreciate the finer details.
              </p>
            </div>

            <div className="info-block">
              <h3 className="info-title"><MapPin size={18} className="info-icon" /> Flagship Store</h3>
              <address className="info-text">
                Shop no. UG/5, Jagat Plaza, Mouze Pandharabodi, Law College Square,<br />
                Amravati Rd, Master Colony, Tilak Nagar, Gokulpeth,<br />
                Nagpur, Maharashtra 440033, India
              </address>
            </div>
            
            <div className="info-block">
              <h3 className="info-title"><Phone size={18} className="info-icon" /> Contact Details</h3>
              <p className="info-text">
                <a href="mailto:hello@miraya.com">hello@miraya.com</a><br />
                +91 98765 43210
              </p>
            </div>
            
            <div className="info-block" style={{ marginBottom: 0 }}>
              <h3 className="info-title"><Clock size={18} className="info-icon" /> Store Hours</h3>
              <p className="info-text">
                Monday - Saturday: 11:00 AM - 8:00 PM<br />
                Sunday: By Appointment Only
              </p>
            </div>

          </motion.div>

        </div>

        {/* Full Width Map Below Grid */}
        <motion.div 
          className="map-container full-width"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <iframe 
            src="https://maps.google.com/maps?q=Shop%20no.%20UG/5,%20Jagat%20Plaza,%20Mouze%20Pandharabodi,%20Law%20College%20Square,%20Amravati%20Rd,%20Master%20Colony,%20Tilak%20Nagar,%20Gokulpeth,%20Nagpur,%20Maharashtra%20440033,%20India+(Miraya%20By%20Garima)&t=&z=16&ie=UTF8&iwloc=B&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Store Location"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
