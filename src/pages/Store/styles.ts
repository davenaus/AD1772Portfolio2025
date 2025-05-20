import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const Header = styled.div`
  margin-bottom: 4rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export const Title = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #212326 0%,rgb(51, 53, 55) 100%);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const CollectionsNav = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

export const CollectionButton = styled.button<{ $isActive: boolean }>`
  background: ${props => props.$isActive ? '#212326' : ({ theme }) => theme.colors.blue2};
  color: ${props => props.$isActive ? 'white' : ({ theme }) => theme.colors.blue9};
  border: 1px solid ${props => props.$isActive ? '#212326' : ({ theme }) => theme.colors.blue3};
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$isActive ? '#212326' : ({ theme }) => theme.colors.blue3};
    transform: translateY(-2px);
  }
`;

// Loading animation
const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 1.1rem;
  gap: 1.5rem;
`;

export const LoadingCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.blue3};
  border-top: 3px solid #212326;
  border-radius: 50%;
  animation: ${spinAnimation} 1.2s linear infinite;
`;

export const ButtonSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: ${spinAnimation} 1s linear infinite;
`;

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  min-height: 300px;
  color: ${({ theme }) => theme.colors.blue11};
  text-align: center;
  font-size: 1.1rem;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  min-height: 300px;
  color: ${({ theme }) => theme.colors.blue11};
  text-align: center;
  font-size: 1.1rem;
`;

// Animation for cards appearing
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;


export const ProductCard = styled.div`
  background: ${({ theme }) => theme.colors.blue2};
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-fill-mode: both;
  
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
  &:nth-child(4) { animation-delay: 0.4s; }
  &:nth-child(5) { animation-delay: 0.5s; }
  &:nth-child(6) { animation-delay: 0.6s; }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    border-color: #212326;
  }
`;

export const ProductContent = styled.div`
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between; /* Add this to space title and price nicely */
`;

export const ProductTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin: 0 0 1rem; /* Adjust spacing for no description */
  font-weight: 600;
`;

















export const ProductImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

export const ProductImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s ease;
  
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

export const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.blue3};
  color: ${({ theme }) => theme.colors.blue6};
  font-size: 3rem;
`;



export const ProductDescription = styled.p`
  color: ${({ theme }) => theme.colors.blue11};
  margin: 0 0 1.5rem;
  line-height: 1.6;
  font-size: 0.95rem;
  flex-grow: 1;
`;

export const PriceButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const ProductPrice = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue9};
  
  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const buttonHoverAnimation = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(3px); }
  100% { transform: translateX(0); }
`;

export const BuyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #212326;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  i {
    font-size: 1.25rem;
    transition: transform 0.3s ease;
  }
  
  &:hover:not(:disabled) {
    background: #212326;
    
    i {
      animation: ${buttonHoverAnimation} 1s ease infinite;
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

// Cart Section
export const CartSection = styled.div`
  margin-top: 4rem;
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }
`;

export const CartTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin: 0;
  
  i {
    font-size: 1.5rem;
    color: #212326;
  }
`;

export const CheckoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #212326;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  i {
    font-size: 1.25rem;
  }
  
  &:hover {
    background:rgb(53, 55, 57);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

// Add these to your existing styles.ts file

export const ViewButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #212326;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  i {
    font-size: 1.25rem;
    transition: transform 0.3s ease;
  }
  
  ${ProductCard}:hover & {
    background:rgb(43, 44, 46);
    
    i {
      animation: ${buttonHoverAnimation} 1s ease infinite;
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const StoreFooter = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;

export const ViewStoreButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: ${({ theme }) => theme.colors.blue3};
  color: ${({ theme }) => theme.colors.blue9};
  border: 1px solid ${({ theme }) => theme.colors.blue4};
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  i {
    font-size: 1.25rem;
  }
  
  &:hover {
    background: ${({ theme }) => theme.colors.blue4};
    transform: translateY(-2px);
  }
`;


