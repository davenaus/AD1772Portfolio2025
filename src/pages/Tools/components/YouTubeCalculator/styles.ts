// src/pages/Tools/components/YouTubeCalculator/styles.ts
import styled from 'styled-components';

interface SliderFillProps {
  width: number;
}

 
export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 1rem;
  font-weight: 600;
`;



export const CalculateButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue9};
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.blue5};
    transform: translateY(-2px);
  }
`;



// ... (update remaining text components with font-family)

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
`;




export const Slider = styled.input`
  -webkit-appearance: none;
  position: relative;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.blue3};
  outline: none;
  transition: all 0.2s ease;
  margin: 10px 0;
  cursor: pointer;
  z-index: 1;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.blue9};
    cursor: pointer;
    margin-top: -7px;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 2;
  }

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.blue9};
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 2;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.blue3};
    border-radius: 5px;
    z-index: 1;
  }

  &::-moz-range-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.blue3};
    border-radius: 5px;
    z-index: 1;
  }
`;

export const SliderFill = styled.div<SliderFillProps>`
  position: absolute;
  top: 50%;
  left: 0;
  height: 10px;
  width: ${props => props.width}%;
  background-color: ${({ theme }) => theme.colors.blue4};
  border-radius: 5px 0 0 5px;
  pointer-events: none;
  transform: translateY(-50%);
  z-index: 1;
`;











// src/pages/Tools/components/YouTubeCalculator/styles.ts

export const Container = styled.div`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const CalculatorForm = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.blue2};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  background: ${({ theme }) => theme.colors.blue2};
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  outline: none;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 0.875rem;
    font-size: 0.9rem;
  }
`;

export const SliderContainer = styled.div`
  position: relative;
  margin: 1.5rem 0;
  padding: 0.5rem 0;

  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

export const Result = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.blue3};
  border-radius: 8px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 1rem;
  }
`;

export const ResultTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const Earnings = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.blue9};
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Value = styled.span`
  color: ${({ theme }) => theme.colors.blue11};
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  display: block;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;