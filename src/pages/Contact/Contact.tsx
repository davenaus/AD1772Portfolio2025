// src/pages/Contact/Contact.tsx
import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { Button } from '../../components/Button/Button';
import { sendContactForm } from '../../services/contactService';
import { SuccessModal } from '../../components/SuccessModal/SuccessModal';
import { useCanonical } from '../../utils/useCanonical';

interface ContactForm {
  name: string;
  email: string;
  project: string;
  message: string;
}

export const Contact: React.FC = () => {
  useCanonical('/contact');
  useEffect(() => {
    document.title = 'Contact | Austin Davenport';
  }, []);

  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await sendContactForm(formData);
      
      setFormData({
        name: '',
        email: '',
        project: '',
        message: ''
      });

      setShowSuccessModal(true);
    } catch {
      setError('There was an error sending your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <S.Container>
      <S.ContactGrid>
        <S.ContactInfo>
          <S.Title>Let's Work Together</S.Title>
          <S.Description>
            Looking for professional video editing services? I'd love to help bring your vision to life.
            Whether it's a YouTube video, commercial, or creative project, let's create something amazing.
          </S.Description>

          <S.InfoItems>
            
            <S.InfoItem>
              <i className='bx bx-time-five'></i>
              <div>
                <h3>Response Time</h3>
                <p>Usually within 24 hours</p>
              </div>
            </S.InfoItem>

            <S.InfoItem>
              <i className='bx bx-map'></i>
              <div>
                <h3>Location</h3>
                <p>United States</p>
              </div>
            </S.InfoItem>
          </S.InfoItems>

          <S.SocialLinks>
            <a href="https://www.youtube.com/@AustinDavenport" target="_blank" rel="noopener noreferrer">
              <i className='bx bxl-youtube'></i>
            </a>
          </S.SocialLinks>
        </S.ContactInfo>

        <S.ContactForm onSubmit={handleSubmit}>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          
          <S.FormGroup>
            <S.Label htmlFor="name">Name</S.Label>
            <S.Input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="email">Email</S.Label>
            <S.Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="project">Project Type</S.Label>
            <S.Select
              id="project"
              name="project"
              value={formData.project}
              onChange={handleChange}
              required
            >
              <option value="">Select a project type</option>
              <option value="sponsorship">Sponsorship</option>
              <option value="youtube">YouTube Video</option>
              <option value="music">Music Video</option>
              <option value="gaming">Gaming Content</option>
              <option value="other">Other</option>
            </S.Select>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="message">Message</S.Label>
            <S.TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
            />
          </S.FormGroup>

          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <i className='bx bx-loader-alt bx-spin'></i>
                Sending...
              </>
            ) : (
              <>
                <i className='bx bx-send'></i>
                Send Message
              </>
            )}
          </Button>
        </S.ContactForm>
      </S.ContactGrid>

      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
    </S.Container>
  );
};

export default Contact;