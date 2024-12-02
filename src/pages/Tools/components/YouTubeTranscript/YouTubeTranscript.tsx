import React, { useState, useEffect } from 'react';
import * as S from './styles';

export const YouTubeTranscript: React.FC = () => {
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^&]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  };

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  const fetchTranscript = async (videoId: string) => {
    try {
      // Try getting captions through the timedtext API
      const response = await fetch(
        `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&fmt=srv3`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch captions');
      }

      const data = await response.text();
      
      // Parse the XML response
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const textNodes = xmlDoc.getElementsByTagName('text');
      
      // Extract and format the text
      let transcriptText = '';
      for (let i = 0; i < textNodes.length; i++) {
        transcriptText += textNodes[i].textContent + ' ';
      }

      return transcriptText.trim();
    } catch (error) {
      console.error('Error fetching transcript:', error);
      throw error;
    }
  };

  const handleView = async () => {
    setError('');
    setSuccess('');
    setTranscript('');
    
    const videoId = extractVideoId(url);
    
    if (!videoId) {
      setError('Invalid YouTube URL. Please check the URL and try again.');
      return;
    }

    setIsLoading(true);

    try {
      // First try direct timedtext API
      const transcriptText = await fetchTranscript(videoId);
      
      if (transcriptText) {
        setTranscript(transcriptText);
        setSuccess('Transcript loaded successfully');
      } else {
        throw new Error('No transcript found');
      }
    } catch (err) {
      // If direct API fails, try embedded player approach
      try {
        const embedUrl = `https://www.youtube.com/embed/${videoId}?cc_load_policy=1`;
        setTranscript(`Loading transcript for video: ${videoId}\n\nPlease view captions in the embedded player below:\n\n`);
        
        // Add embedded player
        const iframe = document.createElement('iframe');
        iframe.width = '560';
        iframe.height = '315';
        iframe.src = embedUrl;
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;
        
        const container = document.getElementById('transcript-container');
        if (container) {
          container.innerHTML = '';
          container.appendChild(iframe);
        }
        
        setSuccess('Video loaded with captions');
      } catch (embedError) {
        setError('Failed to load transcript. The video might not have captions available.');
        console.error('Error:', embedError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    setSuccess('Transcript copied to clipboard');
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>YouTube Transcript Viewer</S.Title>
      </S.Header>

      <S.TranscriptContainer>
        <S.InputContainer>
          <S.URLInput
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube video URL"
            onKeyPress={(e) => e.key === 'Enter' && handleView()}
          />
          
          <S.ButtonContainer>
            <S.ActionButton 
              onClick={handleView}
              disabled={isLoading || !url.trim()}
            >
              <i className='bx bx-search'></i>
              {isLoading ? 'Loading...' : 'View Transcript'}
            </S.ActionButton>

            {transcript && (
              <S.ActionButton onClick={handleCopy}>
                <i className='bx bx-copy'></i>
                Copy to Clipboard
              </S.ActionButton>
            )}
          </S.ButtonContainer>
        </S.InputContainer>

        {isLoading && (
          <S.LoadingSpinner>
            <i className='bx bx-loader-alt bx-spin'></i>
          </S.LoadingSpinner>
        )}

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        {success && <S.SuccessMessage>{success}</S.SuccessMessage>}
        
        {transcript && (
          <>
            <S.TranscriptText>
              {transcript}
            </S.TranscriptText>
            <div id="transcript-container"></div>
          </>
        )}
      </S.TranscriptContainer>
    </S.Container>
  );
};