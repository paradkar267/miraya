import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, User, Mail, PenLine, MessageSquare, Calendar } from 'lucide-react';
import './ContactPage.css';

// Reusable ornament component to match the design exactly
const Ornament = () => (
  <div className="contact-ornament">
    <div className="contact-line"></div>
    <div className="contact-diamond">
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15 12L12 22L9 12Z"/></svg>
    </div>
    <div className="contact-line"></div>
  </div>
);

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
            <div className="subtitle text-center">GET IN TOUCH</div>
            <Ornament />
            <h1 className="contact-title text-center">
              <i>Visit our</i>
              ATELIER
            </h1>
            <Ornament />
            <p className="contact-header-desc text-center">
              We would love to hear from you. Reach out to us for<br/>
              personalized assistance or visit our atelier.
            </p>
          </motion.div>
        </div>

        <div className="container contact-container">
          <div className="contact-grid">
            
            {/* Left Column: Form */}
            <motion.div 
              className="contact-panel form-panel"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="panel-header text-center">
                <h2 className="panel-title">
                  <span className="script-text">Connect with</span>
                  Miraya
                </h2>
                <Ornament />
                <p className="panel-desc">
                  For bespoke appointments or general inquiries,<br/>
                  please leave us a message below.
                </p>
              </div>
              
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group-outline">
                  <User size={18} className="form-icon" />
                  <input type="text" placeholder="FULL NAME" required />
                </div>
                <div className="form-group-outline">
                  <Mail size={18} className="form-icon" />
                  <input type="email" placeholder="EMAIL ADDRESS" required />
                </div>
                <div className="form-group-outline">
                  <PenLine size={18} className="form-icon" />
                  <input type="text" placeholder="SUBJECT" required />
                </div>
                <div className="form-group-outline">
                  <MessageSquare size={18} className="form-icon message-icon" />
                  <textarea rows="4" placeholder="MESSAGE" required></textarea>
                </div>
                <button type="submit" className="submit-btn-solid">
                  SEND MESSAGE &nbsp; <span>⟶</span>
                </button>
              </form>
            </motion.div>

            {/* Right Column: Info */}
            <motion.div 
              className="contact-panel info-panel"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="panel-header text-center">
                <h2 className="panel-title">
                  <span className="script-text">Our</span>
                  Atelier
                </h2>
                <Ornament />
                <p className="panel-desc">
                  We invite you to experience our collections in person.<br/>
                  Our doors are open for those who appreciate the finer details.
                </p>
              </div>

              <div className="info-list">
                <div className="info-block">
                  <div className="info-icon-wrapper">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="info-title">FLAGSHIP STORE</h3>
                    <address className="info-text">
                      Shop no. UG/5, Jagat Plaza,<br />
                      Mouze Pandharabodi, Law College Square,<br />
                      Amravati Rd, Nagpur, Maharashtra 440033
                    </address>
                  </div>
                </div>
                
                <div className="info-block">
                  <div className="info-icon-wrapper">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="info-title">CONTACT DETAILS</h3>
                    <p className="info-text">
                      <a href="mailto:hello@miraya.com">hello@miraya.com</a><br />
                      +91 98765 43210
                    </p>
                  </div>
                </div>
                
                <div className="info-block" style={{ marginBottom: 0 }}>
                  <div className="info-icon-wrapper">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="info-title">ATELIER HOURS</h3>
                    <p className="info-text">
                      Monday – Saturday: 10:00 AM – 7:00 PM<br />
                      Sunday: By Appointment
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>


        </div>
    </div>
  );
};

export default ContactPage;
