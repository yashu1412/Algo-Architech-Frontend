"use client";
import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API request
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
    }, 4000);
  };

  return (
    <main className="dashboard-container fade-up">
      <div className="page-header">
        <div>
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">Get in touch with our team of quantitative analysts and software engineers</p>
        </div>
      </div>

      <div className="contact-layout">
        {/* Contact info cards */}
        <div className="contact-info">
          {/* Developer card */}
          <div className="info-card info-card--featured">
            <div className="info-card__avatar">YP</div>
            <div>
              <h4 className="info-card__title">Yashpalsingh Pawara</h4>
              <p className="info-card__detail">yashpalsinghpawara@gmail.com</p>
              <p className="info-card__note">Developer &amp; Platform Owner</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-card__icon">✉️</div>
            <div>
              <h4 className="info-card__title">Email</h4>
              <p className="info-card__detail">yashpalsinghpawara@gmail.com</p>
              <p className="info-card__note">Response within 24 business hours</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-card__icon">📞</div>
            <div>
              <h4 className="info-card__title">Support Hours</h4>
              <p className="info-card__detail">Mon – Fri, 9 am – 6 pm IST</p>
              <p className="info-card__note">AlgoTrade Platform, India</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-container">
          {submitted ? (
            <div className="contact-success" id="contact-success-msg">
              <span className="contact-success__icon">✅</span>
              <h3 className="contact-success__title">Message Sent Successfully!</h3>
              <p className="contact-success__desc">
                Thank you for contacting us, {formData.name || "there"}. One of our team members will get back to you shortly.
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Full Name</label>
                <input
                  type="text"
                  id="contact-name"
                  className="form-input"
                  required
                  placeholder="Yashpalsingh Pawara"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address</label>
                <input
                  type="email"
                  id="contact-email"
                  className="form-input"
                  required
                  placeholder="yashpalsinghpawara@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <select
                  id="contact-subject"
                  className="form-input"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option>General Inquiry</option>
                  <option>API Support</option>
                  <option>Billing & Premium plans</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  className="form-input form-textarea"
                  required
                  placeholder="Explain your inquiry details here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-primary form-submit-btn" id="submit-contact-btn">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
