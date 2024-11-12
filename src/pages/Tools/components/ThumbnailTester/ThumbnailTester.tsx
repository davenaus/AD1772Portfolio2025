// src/pages/Tools/components/ThumbnailTester/ThumbnailTester.tsx
import React, { useState, useEffect } from 'react';
import * as S from './styles';

interface PreviewScenario {
  name: string;
  class: string;
  showProfile: boolean;
}

const previewScenarios: PreviewScenario[] = [
    { name: 'Home: Large', class: 'home-large', showProfile: true },
    { name: 'Home: Small', class: 'home-small', showProfile: false },
    { name: 'Sidebar', class: 'sidebar', showProfile: false },
    { name: 'Mobile: Column', class: 'mobile-column', showProfile: false }
  ];

export const ThumbnailTester: React.FC = () => {
  const [title, setTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popularVideos, setPopularVideos] = useState<any[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setThumbnailUrl(result);
        setShowPreview(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };


// Update the ThumbnailTester.tsx file - modify the fetchYouTubeVideos function:
const fetchYouTubeVideos = async () => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?` +
        `part=snippet&` +
        `chart=mostPopular&` +
        `maxResults=12&` +
        `key=${API_KEY}`
      );
      const data = await response.json();
  
      // Fetch channel data for profile pictures
      const channelIds = data.items.map((item: any) => item.snippet.channelId).join(',');
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?` +
        `part=snippet&` +
        `id=${channelIds}&` +
        `key=${API_KEY}`
      );
      const channelData = await channelResponse.json();
  
      const channelIcons: { [key: string]: string } = {};
      channelData.items.forEach((channel: any) => {
        channelIcons[channel.id] = channel.snippet.thumbnails.default.url;
      });
  
      const populatedVideos = [...data.items].slice(0, 11).map((item: any) => ({
        isUser: false,
        thumbnail: item.snippet.thumbnails.medium.url,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        profilePicture: channelIcons[item.snippet.channelId] || 'https://via.placeholder.com/36'
      }));
  
      // Create user's video object
      const userVideo = {
        isUser: true,
        thumbnail: thumbnailUrl,
        title: title || 'Your Video Title',
        channelTitle: 'Your Channel',
        profilePicture: profileUrl || 'https://via.placeholder.com/36'
      };
  
      // Insert user's video at a random position
      const randomIndex = Math.floor(Math.random() * (populatedVideos.length + 1));
      populatedVideos.splice(randomIndex, 0, userVideo);
  
      setPopularVideos(populatedVideos);
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
      alert('Failed to load YouTube comparison. Please try again.');
    }
  };
  

  const renderPreview = () => {
    if (!thumbnailUrl) return null;

    return previewScenarios.map((scenario) => (
      <S.PreviewItem key={scenario.class} isDarkMode={isDarkMode} className={scenario.class}>
        <S.PreviewTitle isDarkMode={isDarkMode}>{scenario.name}</S.PreviewTitle>
        <div style={{ clear: 'both' }}>
          <S.ThumbnailContainer layout={scenario.class}>
            <S.ThumbnailImage src={thumbnailUrl} alt="Thumbnail" />
            <S.VideoTime>14:56</S.VideoTime>
          </S.ThumbnailContainer>
          <S.VideoInfo>
            {scenario.showProfile && (
              <S.ProfilePicture 
                src={profileUrl || 'https://via.placeholder.com/36'} 
                alt="Channel"
              />
            )}
            <S.VideoDetails isDarkMode={isDarkMode}>
              <S.VideoTitle isDarkMode={isDarkMode}>
                {title || 'Enter your title to see how it looks'}
              </S.VideoTitle>
              <S.ChannelName isDarkMode={isDarkMode}>Your Channel</S.ChannelName>
              <S.VideoMetadata isDarkMode={isDarkMode}>
                123K views • 1 hour ago
              </S.VideoMetadata>
            </S.VideoDetails>
          </S.VideoInfo>
        </div>
      </S.PreviewItem>
    ));
  };

  const renderYouTubeComparison = () => {
    return (
      <S.YouTubeGrid>
        {popularVideos.map((video, index) => (
          <S.YouTubeVideo key={index}>
            <S.ThumbnailImage src={video.thumbnail} alt={video.title} />
            <S.VideoInfo>
              <S.ProfilePicture src={video.profilePicture} alt={video.channelTitle} />
              <S.VideoDetails>
                <S.PopupVideoTitle>{video.title}</S.PopupVideoTitle>
                <S.ChannelName isDarkMode={false}>{video.channelTitle}</S.ChannelName>
                <S.VideoMetadata isDarkMode={false}>
                  123K views • 1 hour ago
                </S.VideoMetadata>
              </S.VideoDetails>
            </S.VideoInfo>
          </S.YouTubeVideo>
        ))}
      </S.YouTubeGrid>
    );
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Thumbnail Tester</S.Title>
      </S.Header>

      <S.MainContainer isExpanded={showPreview}>
        <S.InputSection isExpanded={showPreview}>
          <S.SearchBar>
            <S.TitleInput
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter your video title"
            />
          </S.SearchBar>

          <S.ButtonRow>
            <S.FileInputLabel>
              Upload Thumbnail
              <S.FileInput
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
              />
            </S.FileInputLabel>
            <S.FileInputLabel>
              Upload Profile Picture
              <S.FileInput
                type="file"
                accept="image/*"
                onChange={handleProfileUpload}
              />
            </S.FileInputLabel>
            <S.CompareButton onClick={fetchYouTubeVideos}>
              YouTube Comparison
            </S.CompareButton>
          </S.ButtonRow>

          <S.DarkModeToggle>
            <S.ToggleInput
              type="checkbox"
              checked={isDarkMode}
              onChange={(e) => setIsDarkMode(e.target.checked)}
            />
            <S.Slider isChecked={isDarkMode}>
              <i className='bx bx-sun'></i>
              <i className='bx bx-moon'></i>
            </S.Slider>
          </S.DarkModeToggle>
        </S.InputSection>

        <S.PreviewSection 
          isDarkMode={isDarkMode}
          className={showPreview ? 'visible' : ''}
        >
          {renderPreview()}
        </S.PreviewSection>
      </S.MainContainer>

      <S.YouTubePopup style={{ display: showPopup ? 'block' : 'none' }}>
        <S.PopupContent>
          <S.ClosePopup onClick={() => setShowPopup(false)}>×</S.ClosePopup>
          {renderYouTubeComparison()}
        </S.PopupContent>
      </S.YouTubePopup>
    </S.Container>
  );
};

export default ThumbnailTester;