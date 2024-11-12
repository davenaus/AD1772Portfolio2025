// src/pages/Tools/components/QRCodeGenerator/QRCodeGenerator.tsx
import React, { useState, useRef, useEffect } from 'react';
import * as S from './styles';

export const QRCodeGenerator: React.FC = () => {
  const [url, setUrl] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [fullSizeQR, setFullSizeQR] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const generateQRCode = async () => {
    if (!url.trim()) {
      alert('Please enter a valid URL!');
      return;
    }

    const baseUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(url)}`;

    try {
      const response = await fetch(baseUrl);
      const blob = await response.blob();
      const qrUrl = URL.createObjectURL(blob);
      setFullSizeQR(qrUrl);
      setShowResults(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Error generating QR code. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      generateQRCode();
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    const input = document.getElementById('logo-input') as HTMLInputElement;
    if (input) input.value = '';
  };

  const generateQRWithLogo = async (size: number): Promise<string> => {
    return new Promise((resolve) => {
      if (fullSizeQR) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve('');

        canvas.width = size;
        canvas.height = size;

        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, size, size);

          if (logoFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const logoImg = new Image();
              logoImg.onload = () => {
                // Draw white square background for logo
                const logoSize = size * 0.2; // Logo takes up 20% of QR code
                const logoX = (size - logoSize) / 2;
                const logoY = (size - logoSize) / 2;

                ctx.fillStyle = 'white';
                ctx.fillRect(logoX, logoY, logoSize, logoSize);

                // Draw logo
                const scale = Math.min(logoSize / logoImg.width, logoSize / logoImg.height);
                const width = logoImg.width * scale;
                const height = logoImg.height * scale;
                const x = size / 2 - width / 2;
                const y = size / 2 - height / 2;
                ctx.drawImage(logoImg, x, y, width, height);

                resolve(canvas.toDataURL());
              };
              logoImg.src = e.target?.result as string;
            };
            reader.readAsDataURL(logoFile);
          } else {
            resolve(canvas.toDataURL());
          }
        };
        img.src = fullSizeQR;
      } else {
        resolve('');
      }
    });
  };

  const downloadQR = async () => {
    const qrDataUrl = await generateQRWithLogo(1000);
    if (qrDataUrl) {
      const link = document.createElement('a');
      link.href = qrDataUrl;
      link.download = logoFile ? 'qrcode_with_logo.png' : 'qrcode.png';
      link.click();
    }
  };

  const copyQR = async () => {
    try {
      const qrDataUrl = await generateQRWithLogo(1000);
      if (qrDataUrl) {
        const response = await fetch(qrDataUrl);
        const blob = await response.blob();
        const clipboardItem = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([clipboardItem]);
        alert('QR code copied to clipboard!');
      }
    } catch (error) {
      console.error('Failed to copy QR code:', error);
      alert('Failed to copy QR code.');
    }
  };

  // Preview update effect
  useEffect(() => {
    const updatePreview = async () => {
      if (fullSizeQR) {
        const previewQR = await generateQRWithLogo(150);
        const previewImg = document.getElementById('qr-preview') as HTMLImageElement;
        if (previewImg) {
          previewImg.src = previewQR;
        }
      }
    };

    updatePreview();
  }, [fullSizeQR, logoFile]);

  return (
    <S.Container>
      <S.Header>
        <S.Title>QR Code Generator</S.Title>
      </S.Header>

      <S.SearchBar>
        <S.URLInput
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a website URL..."
          onKeyPress={handleKeyPress}
        />
        <S.GenerateButton onClick={generateQRCode}>
          <i className='bx bx-qr'></i>
        </S.GenerateButton>
      </S.SearchBar>

      <S.ResultContainer className={showResults ? 'visible' : ''}>
        <S.QRImage id="qr-preview" alt="QR Code" />
        
        <S.ButtonContainer>
          <S.ActionButton onClick={downloadQR}>
            <i className='bx bxs-download'></i>
            Download QR Code
          </S.ActionButton>
          <S.ActionButton onClick={copyQR}>
            <i className='bx bx-copy'></i>
            Copy Image
          </S.ActionButton>
        </S.ButtonContainer>

        <S.LogoContainer>
          <S.LogoInput
            type="file"
            id="logo-input"
            accept="image/*"
            onChange={handleLogoUpload}
          />
          <S.LogoLabel htmlFor="logo-input">
            <i className='bx bx-image-add'></i>
            Upload Logo
          </S.LogoLabel>
          <S.RemoveLogoButton
            onClick={removeLogo}
            className={logoFile ? 'visible' : ''}
          >
            Remove Logo
          </S.RemoveLogoButton>
        </S.LogoContainer>
      </S.ResultContainer>
    </S.Container>
  );
};

export default QRCodeGenerator;