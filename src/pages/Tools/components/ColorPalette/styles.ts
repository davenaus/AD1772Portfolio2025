import styled from 'styled-components';

// Define colors here and export them
export const colors = {
  blue1: '#0f1113',
  blue2: '#17191c',
  blue3: '#212326',
  blue4: '#282a2d',
  blue5: '#2f3135',
  blue6: '#383b3e',
  blue7: '#46484c',
  blue8: '#5f6165',
  blue9: '#fafcff',
  blue10: '#f1f3f6',
  blue11: '#b1b4b8',
  blue12: '#eceef1',
  destructive: '#dc3545'
};

export const Card = styled.div`
  background: ${colors.blue2};
  border-radius: 16px;
  border: 1px solid ${colors.blue3};
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${colors.blue3};
`;

export const CardTitle = styled.h1`
  color: ${colors.blue9};
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
`;

export const Button = styled.button<{ $variant?: 'default' | 'destructive' }>`
  font-family: 'Poppins', sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: ${props => props.$variant === 'destructive' ? colors.destructive : colors.blue4};
  color: ${colors.blue9};

  &:hover {
    background: ${props => props.$variant === 'destructive' ? '#bb2d3b' : colors.blue5};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Container = styled.div`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const UploadContainer = styled.div<{ $isDragging?: boolean }>`
  background-color: ${props => props.$isDragging ? props.theme.colors.blue3 : props.theme.colors.blue2};
  border: 2px dashed ${props => props.$isDragging ? '#4a9eff' : props.theme.colors.blue4};
  padding: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: 16px;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.$isDragging ? '#4a9eff' : props.theme.colors.blue6};
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const UploadText = styled.p`
  color: ${colors.blue11};
  margin-top: 1rem;
`;

export const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin: 1rem 0;
  border-radius: 12px;
  display: block;
`;

export const Results = styled.div`
  margin-top: 2rem;
`;

export const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const PaletteContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

export const ColorBox = styled.div<{ $color: string }>`
  aspect-ratio: 1;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
  border: 1px solid ${colors.blue3};
  background-color: ${props => props.$color};

  &:hover {
    transform: scale(1.05);
  }

  &::after {
    content: '${props => props.$color}';
    position: absolute;
    bottom: -25px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 0.875rem;
    color: ${colors.blue11};
  }
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${colors.destructive};
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: none;
  font-size: 12px;
  line-height: 1;
  
  ${ColorBox}:hover & {
    display: block;
  }
`;

export const GradientSection = styled.div`
  background-color: ${colors.blue2};
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid ${colors.blue3};
  margin-bottom: 2rem;
`;

export const GradientControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const SeedControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${colors.blue3};
  padding: 0.5rem 1rem;
  border-radius: 8px;

  span {
    color: ${colors.blue11};
    font-size: 0.875rem;
  }

  input {
    width: 80px;
    padding: 0.3rem;
    border: 1px solid ${colors.blue4};
    border-radius: 4px;
    background: ${colors.blue2};
    color: ${colors.blue9};
    font-family: 'Poppins', sans-serif;
  }
`;

export const GradientPreview = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 12px;
  margin: 1rem 0;
  background: ${colors.blue3};
  overflow: hidden;
  background-size: cover;
  background-position: center;
`;

export const ColorPickerModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ColorPickerContent = styled.div`
  background: ${colors.blue2};
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid ${colors.blue3};
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

export const PickerTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const TabPanel = styled.div<{ $isHidden: boolean }>`
  display: ${props => props.$isHidden ? 'none' : 'flex'};
  flex-direction: column;
  gap: 1rem;
`;

export const ImagePreviewContainer = styled.div`
  position: relative;
  width: 100%;
  max-height: 400px;
  overflow: hidden;
  border-radius: 8px;
  cursor: crosshair;
`;

export const ColorPreview = styled.div<{ $color?: string; $x: number; $y: number }>`
  position: fixed;
  width: 80px;
  height: 80px;
  border: 3px solid white;
  border-radius: 50%;
  pointer-events: none;
  display: ${props => props.$color ? 'block' : 'none'};
  background-color: ${props => props.$color || 'transparent'};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%);
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: 2px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
  }
`;

export const SelectedColors = styled.div`
  margin: 1rem 0;
  background: ${colors.blue3};
  padding: 1rem;
  border-radius: 8px;
`;

export const SelectedColorsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const SelectedColorItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${colors.blue4};
  padding: 0.5rem;
  border-radius: 6px;
`;

export const ColorSwatch = styled.div<{ $color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid ${colors.blue6};
  background-color: ${props => props.$color};
`;

export const RemoveColorButton = styled.button`
  background: none;
  border: none;
  color: ${colors.blue11};
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;

  &:hover {
    background: ${colors.blue5};
    color: ${colors.blue9};
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: flex-end;
`;

export const ColorInput = styled.input`
  width: 100%;
  height: 100px;
  border: none;
  border-radius: 8px;
  background: none;
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 8px;
  }
`;

export const CanvasHidden = styled.canvas`
  display: none;
`;