import React, { useState, useRef, useCallback } from 'react';
import * as S from './styles';
import { colors as themeColors } from './styles';

interface Color {
  hex: string;
  r: number;
  g: number;
  b: number;
  count: number;
}

const ColorPaletteComponent: React.FC = () => {
  // State declarations
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentTab, setCurrentTab] = useState<'color-wheel' | 'image-picker'>('color-wheel');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [gradientSeed, setGradientSeed] = useState(1);
  const [previewColor, setPreviewColor] = useState<string>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentPickerColor, setCurrentPickerColor] = useState('#000000');

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pickerCanvasRef = useRef<HTMLCanvasElement>(null);
  const gradientCanvasRef = useRef<HTMLCanvasElement>(null);

  // Utility functions
  const rgbToHex = (r: number, g: number, b: number): string => {
    const componentToHex = (c: number): string => {
      const hex = Math.round(c).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  const calculateColorDistance = (r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number => {
    const rmean = (r1 + r2) / 2;
    const dr = r1 - r2;
    const dg = g1 - g2;
    const db = b1 - b2;
    return Math.sqrt(
      (2 + rmean/256) * dr**2 +
      4 * dg**2 +
      (2 + (255-rmean)/256) * db**2
    );
  };

  const extractColors = (imageData: Uint8ClampedArray): string[] => {
    const colorBuckets = new Map<string, Color>();
    const BUCKET_SIZE = 24;
    
    for (let i = 0; i < imageData.length; i += 4) {
      const r = Math.floor(imageData[i] / BUCKET_SIZE) * BUCKET_SIZE;
      const g = Math.floor(imageData[i + 1] / BUCKET_SIZE) * BUCKET_SIZE;
      const b = Math.floor(imageData[i + 2] / BUCKET_SIZE) * BUCKET_SIZE;
      
      const brightness = (r + g + b) / 3;
      if (brightness < 20 || brightness > 235) continue;
      
      const key = `${r},${g},${b}`;
      if (!colorBuckets.has(key)) {
        colorBuckets.set(key, {
          hex: rgbToHex(imageData[i], imageData[i + 1], imageData[i + 2]),
          r: imageData[i],
          g: imageData[i + 1],
          b: imageData[i + 2],
          count: 0
        });
      }
      colorBuckets.get(key)!.count++;
    }
    
    const sortedColors = Array.from(colorBuckets.values())
      .sort((a, b) => b.count - a.count);
    
    const distinctColors: Color[] = [];
    for (const color of sortedColors) {
      if (distinctColors.length >= 6) break;
      
      const isDifferentEnough = distinctColors.every(selected => {
        const deltaE = calculateColorDistance(
          color.r, color.g, color.b,
          selected.r, selected.g, selected.b
        );
        return deltaE > 30;
      });
      
      if (isDifferentEnough) {
        distinctColors.push(color);
      }
    }
    
    return distinctColors.map(color => color.hex);
  };

  // Gradient and shuffle functions
  const seededRandom = (seed: number) => {
    return () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
  };

  const shuffleArray = (array: string[], seed: number): string[] => {
    const random = seededRandom(seed);
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const generateGradient = useCallback((currentColors: string[] = extractedColors) => {
    const validColors = (currentColors || [])
      .filter((color): color is string => 
        typeof color === 'string' && 
        color.startsWith('#') && 
        color.length === 7
      );

    if (validColors.length < 2) return;

    const canvas = gradientCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);

    const shuffledColors = shuffleArray([...validColors], gradientSeed);
    const angle = 90 * (Math.PI / 180);
    const layers = 8;
    
    for (let i = 0; i < layers; i++) {
      const offset = (i - layers/2) * (width * 0.1);
      const startX = width/2 + Math.cos(angle) * width + offset;
      const startY = height/2 + Math.sin(angle) * height;
      const endX = width/2 + Math.cos(angle + Math.PI) * width + offset;
      const endY = height/2 + Math.sin(angle + Math.PI) * height;
      
      const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
      
      shuffledColors.forEach((color, index) => {
        if (typeof color === 'string' && color.startsWith('#')) {
          const position = index / (shuffledColors.length - 1);
          gradient.addColorStop(position, color);
        }
      });
      
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    ctx.globalAlpha = 1;
    
    const gradientDataUrl = canvas.toDataURL('image/png');
    
    // Use requestAnimationFrame to ensure DOM updates are batched
    requestAnimationFrame(() => {
      const gradientPreview = document.querySelector<HTMLDivElement>('.gradient-preview');
      if (gradientPreview) {
        gradientPreview.style.backgroundImage = `url(${gradientDataUrl})`;
      }
    });
  }, [extractedColors, gradientSeed]);

  // Call generateGradient whenever colors or seed changes
  React.useEffect(() => {
    if (extractedColors.length >= 2) {
      generateGradient();
    }
  }, [extractedColors, gradientSeed, generateGradient]);

  // Image processing
  const processImage = useCallback((dataUrl: string) => {
    setIsLoading(true);
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const maxDim = 400;
      let width = img.width;
      let height = img.height;
      
      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height).data;
      const colors = extractColors(imageData);
      setExtractedColors(colors);
      setIsLoading(false);
      generateGradient(colors);
    };
    img.src = dataUrl;
  }, [generateGradient]);

  // Drag and drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          setImagePreview(dataUrl);
          processImage(dataUrl);
        };
        reader.readAsDataURL(file);
        e.dataTransfer.clearData();
      }
    }
  }, [processImage]);

  // File upload handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImagePreview(dataUrl);
      processImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Color picker handlers
  const handleColorWheelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPickerColor(e.target.value);
  };

  const addColorFromPicker = () => {
    if (currentPickerColor) {
      setSelectedColors(prev => new Set([...prev, currentPickerColor]));
    }
  };

  const closeColorPicker = () => {
    setShowColorPicker(false);
    setSelectedColors(new Set());
    setCurrentPickerColor('#000000');
  };

  const handleImageMouseMove = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    const canvas = pickerCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    setMousePos({ x, y });

    const scaleX = e.currentTarget.naturalWidth / rect.width;
    const scaleY = e.currentTarget.naturalHeight / rect.height;

    const pixelX = Math.floor((e.clientX - rect.left) * scaleX);
    const pixelY = Math.floor((e.clientY - rect.top) * scaleY);

    try {
      const pixelData = ctx.getImageData(pixelX, pixelY, 1, 1).data;
      const color = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
      setPreviewColor(color);
    } catch (error) {
      console.error('Error getting pixel data:', error);
    }
  }, []);

  const handleImageColorPick = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    if (previewColor) {
      setSelectedColors(prev => new Set([...prev, previewColor]));
    }
  }, [previewColor]);

  const handleImageMouseLeave = useCallback(() => {
    setPreviewColor(undefined);
  }, []);

  // Color management functions
  const removeSelectedColor = (color: string) => {
    const newColors = new Set(selectedColors);
    newColors.delete(color);
    setSelectedColors(newColors);
  };

  const addSelectedColors = () => {
    setExtractedColors([...extractedColors, ...Array.from(selectedColors)]);
    setSelectedColors(new Set());
    setShowColorPicker(false);
    generateGradient([...extractedColors, ...Array.from(selectedColors)]);
  };

  const removeColor = (index: number) => {
    const newColors = extractedColors.filter((_, i) => i !== index);
    setExtractedColors(newColors);
    generateGradient(newColors);
  };

  // Export functions
  const exportPalette = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = 1600;
    const height = 800;
    canvas.width = width;
    canvas.height = height;
    
    ctx.fillStyle = themeColors.blue2;
    ctx.fillRect(0, 0, width, height);
    
    const maxSwatchWidth = 220;
    const swatchCount = extractedColors.length;
    const horizontalPadding = 100;
    
    const swatchWidth = Math.min(maxSwatchWidth, (width - 2 * horizontalPadding) / swatchCount);
    const startX = (width - (swatchCount * swatchWidth)) / 2;
    
    const yOffset = height * 0.2;
    const swatchHeight = height * 0.35;
    
    extractedColors.forEach((color, index) => {
      const x = startX + (index * swatchWidth);
      
      ctx.fillStyle = color;
      ctx.fillRect(
        x + (swatchWidth * 0.1),
        yOffset,
        swatchWidth * 0.8,
        swatchHeight
      );
      
      const r = parseInt(color.slice(1,3), 16);
      const g = parseInt(color.slice(3,5), 16);
      const b = parseInt(color.slice(5,7), 16);
      
      const textX = x + (swatchWidth / 2);
      
      ctx.fillStyle = '#fafcff';
      ctx.textAlign = 'center';
      
      ctx.font = 'bold 28px Poppins';
      ctx.fillText(
        color.toUpperCase(),
        textX,
        yOffset + swatchHeight + 60
      );
      
      ctx.font = '20px Poppins';
      ctx.fillText(
        `RGB(${r}, ${g}, ${b})`,
        textX,
        yOffset + swatchHeight + 100
      );
    });
    
    const link = document.createElement('a');
    link.download = 'color-palette.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadGradient = () => {
    if (!extractedColors || extractedColors.length < 2) {
      alert('Please add at least 2 colors to generate a gradient');
      return;
    }
    
    const canvas = gradientCanvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `gradient-${gradientSeed}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <S.Container>
      <S.Card>
        <S.CardHeader>
          <S.CardTitle>Image Color Palette Generator</S.CardTitle>
        </S.CardHeader>
        <S.CardContent>
          {!imagePreview ? (
            <S.UploadContainer
              $isDragging={isDragging}
              onDragEnter={handleDragIn}
              onDragLeave={handleDragOut}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <S.FileInput
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                id="imageInput"
              />
              <S.Button as="label" htmlFor="imageInput">
                Choose an Image
              </S.Button>
              <S.UploadText>
                {isDragging 
                  ? 'Drop your image here'
                  : 'Drag and drop an image or click to choose'
                }
              </S.UploadText>
            </S.UploadContainer>
          ) : (
            <S.ImagePreview src={imagePreview} alt="Uploaded image" />
          )}

          {extractedColors.length > 0 && (
            <S.Results>
              <S.Controls>
                <S.Button onClick={() => setShowColorPicker(true)}>Add Color</S.Button>
                <S.Button onClick={exportPalette}>Export Palette</S.Button>
                <S.Button 
                  $variant="destructive"
                  onClick={() => {
                    setExtractedColors([]);
                    setImagePreview('');
                  }}
                >
                  Reset
                </S.Button>
              </S.Controls>

              <S.PaletteContainer>
                {extractedColors.map((color, index) => (
                  <S.ColorBox 
                    key={`${color}-${index}`}
                    $color={color}
                    onClick={() => {
                      navigator.clipboard.writeText(color);
                      alert('Color code copied to clipboard!');
                    }}
                  >
                    <S.DeleteButton onClick={(e) => {
                      e.stopPropagation();
                      removeColor(index);
                    }}>
                      ×
                    </S.DeleteButton>
                  </S.ColorBox>
                ))}
              </S.PaletteContainer>

              {extractedColors.length >= 2 && (
                <S.GradientSection>
                  <S.GradientControls>
                    <S.SeedControl>
                      <span>Pattern Seed:</span>
                      <input
                        type="number"
                        value={gradientSeed}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setGradientSeed(value);
                          generateGradient();
                        }}
                        min={1}
                        step={1}
                      />
                    </S.SeedControl>
                
                    <S.Button onClick={downloadGradient}>
                      Download (4K)
                    </S.Button>
                  </S.GradientControls>
                  <S.GradientPreview className="gradient-preview">
                    <canvas
                      ref={gradientCanvasRef}
                      width={3840}
                      height={2160}
                      style={{ display: 'none' }}
                    />
                  </S.GradientPreview>
                </S.GradientSection>
              )}
            </S.Results>
          )}

          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <canvas ref={pickerCanvasRef} style={{ display: 'none' }} />
        </S.CardContent>
      </S.Card>

      {showColorPicker && (
        <S.ColorPickerModal onClick={() => setShowColorPicker(false)}>
          <S.ColorPickerContent onClick={e => e.stopPropagation()}>
            <h3>Choose Colors</h3>
            <S.PickerTabs>
              <S.Button 
                onClick={() => setCurrentTab('color-wheel')}
                $variant={currentTab === 'color-wheel' ? 'default' : undefined}
              >
                Color Wheel
              </S.Button>
              <S.Button 
                onClick={() => setCurrentTab('image-picker')}
                $variant={currentTab === 'image-picker' ? 'default' : undefined}
              >
                Pick from Image
              </S.Button>
            </S.PickerTabs>

            <S.TabPanel $isHidden={currentTab !== 'color-wheel'}>
              <S.ColorInput
                type="color"
                value={currentPickerColor}
                onChange={handleColorWheelChange}
              />
              <S.Button onClick={addColorFromPicker}>Add This Color</S.Button>
            </S.TabPanel>

            <S.TabPanel $isHidden={currentTab !== 'image-picker'}>
              {imagePreview && (
                <S.ImagePreviewContainer>
                  <img 
                    src={imagePreview} 
                    alt="Color picker preview"
                    style={{ width: '100%', height: 'auto', cursor: 'crosshair' }}
                    onMouseMove={handleImageMouseMove}
                    onMouseLeave={handleImageMouseLeave}
                    onMouseDown={handleImageColorPick}
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      const canvas = pickerCanvasRef.current;
                      if (!canvas) return;
                      
                      const ctx = canvas.getContext('2d');
                      if (!ctx) return;
                      
                      canvas.width = img.naturalWidth;
                      canvas.height = img.naturalHeight;
                      
                      try {
                        ctx.drawImage(img, 0, 0);
                      } catch (error) {
                        console.error('Error drawing image:', error);
                      }
                    }}
                  />
                  <S.ColorPreview 
                    $color={previewColor} 
                    $x={mousePos.x} 
                    $y={mousePos.y}
                  />
                </S.ImagePreviewContainer>
              )}
            </S.TabPanel>

            <S.SelectedColors>
              <h4>Selected Colors</h4>
              <S.SelectedColorsList>
                {Array.from(selectedColors).map((color) => (
                  <S.SelectedColorItem key={color}>
                    <S.ColorSwatch $color={color} />
                    <span>{color}</span>
                    <S.RemoveColorButton onClick={() => removeSelectedColor(color)}>
                      ×
                    </S.RemoveColorButton>
                  </S.SelectedColorItem>
                ))}
              </S.SelectedColorsList>
            </S.SelectedColors>

            <S.ModalActions>
              <S.Button 
                onClick={addSelectedColors}
                disabled={selectedColors.size === 0}
              >
                Confirm Colors
              </S.Button>
              <S.Button onClick={closeColorPicker}>
                Cancel
              </S.Button>
            </S.ModalActions>
          </S.ColorPickerContent>
        </S.ColorPickerModal>
      )}
    </S.Container>
  );
};

export const ColorPalette = ColorPaletteComponent;
export default ColorPalette;