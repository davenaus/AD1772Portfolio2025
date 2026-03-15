// src/pages/Contact/styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  padding: 3rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 2rem;
    min-height: unset;
  }
`;

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    gap: 1.25rem;
  }
`;

export const ContactInfo = styled.div`
  position: sticky;
  top: 2rem;

  @media (max-width: 968px) {
    position: static;
    margin-bottom: 0;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
    line-height: 1.5;
  }
`;

export const InfoItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 0.875rem;
    margin-bottom: 1.25rem;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  i {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.blue9};
    background: ${({ theme }) => theme.colors.blue3};
    padding: 0.75rem;
    border-radius: 12px;
    min-width: 3rem;
    text-align: center;
  }

  h3 {
    color: ${({ theme }) => theme.colors.blue9};
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  p {
    color: ${({ theme }) => theme.colors.blue11};
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    gap: 0.75rem;

    i {
      font-size: 1.25rem;
      padding: 0.6rem;
      min-width: 2.5rem;
      border-radius: 10px;
    }

    h3 {
      font-size: 0.9rem;
      margin-bottom: 0.125rem;
    }

    p {
      font-size: 0.8rem;
    }
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.blue3};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.blue9};
    transition: all 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.blue4};
      transform: translateY(-2px);
    }

    i {
      font-size: 1.25rem;
    }
  }
`;

export const ContactForm = styled.form`
  background: ${({ theme }) => theme.colors.blue2};
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.blue3};

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 14px;
  }

  @media (max-width: 480px) {
    /* Make submit button full-width on small screens */
    > button {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    margin-bottom: 1.125rem;
  }
`;

export const Label = styled.label`
  display: block;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
`;

export const ErrorMessage = styled.div`
  background: ${({ theme }) => `${theme.colors.red3}`};
  color: ${({ theme }) => `${theme.colors.red11}`};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-family: 'Poppins', sans-serif;
  border: 1px solid ${({ theme }) => `${theme.colors.red7}`};
  font-size: 0.9rem;
`;

export const Input = styled.input`
  font-family: 'Poppins', sans-serif;
  width: 100%;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.blue3};
  border: 1px solid ${({ theme }) => theme.colors.blue4};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 1rem;
  transition: all 0.2s ease;
  -webkit-appearance: none; // Fix for iOS default styles
  appearance: none;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.blue6};
  }
`;

export const Select = styled.select`
  font-family: 'Poppins', sans-serif;
  width: 100%;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.blue3};
  border: 1px solid ${({ theme }) => theme.colors.blue4};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 1rem;
  cursor: pointer;
  -webkit-appearance: none; // Fix for iOS default styles
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  padding-right: 2.5rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.blue6};
  }
`;

export const TextArea = styled.textarea`
  font-family: 'Poppins', sans-serif;
  width: 100%;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.blue3};
  border: 1px solid ${({ theme }) => theme.colors.blue4};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  -webkit-appearance: none; // Fix for iOS default styles
  appearance: none;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.blue6};
  }
`;