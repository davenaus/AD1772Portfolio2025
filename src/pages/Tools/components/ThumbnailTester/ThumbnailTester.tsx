import React, { useState, useEffect } from 'react';
import * as S from './styles';

interface PreviewScenario {
  name: string;
  class: string;
  showProfile: boolean;
}

interface ChannelVideo {
  thumbnail: string;
  title: string;
  channelTitle: string;
  profilePicture: string;
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
  const [isChannelMode, setIsChannelMode] = useState(false);
  const [channelUrl, setChannelUrl] = useState('');
  const [popularVideos, setPopularVideos] = useState<any[]>([]);
  const [channelVideos, setChannelVideos] = useState<ChannelVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChannelUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelUrl(e.target.value);
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

  const extractChannelId = (url: string): string | null => {
    const patterns = [
      /youtube\.com\/channel\/([\w-]+)/,     // Regular channel ID
      /youtube\.com\/@([\w-]+)/,             // Handle @username format
      /youtube\.com\/c\/([\w-]+)/,           // Custom URL format
      /youtube\.com\/user\/([\w-]+)/,        // Legacy user format
      /youtube\.com\/([\w-]+)/,              // Direct channel name without @
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1] !== 'c' && match[1] !== 'user' && match[1] !== 'channel') {
        return match[1];
      }
    }
    return null;
  };
  

  const fetchYouTubeVideos = async () => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?` +
        `part=snippet&` +
        `chart=mostPopular&` +
        `maxResults=12&` +
        `key=${API_KEY}`
      );
      const data = await response.json();
  
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
  
      const userVideo = {
        isUser: true,
        thumbnail: thumbnailUrl,
        title: title || 'Your Video Title',
        channelTitle: 'Your Channel',
        profilePicture: profileUrl || 'https://via.placeholder.com/36'
      };
  
      const randomIndex = Math.floor(Math.random() * (populatedVideos.length + 1));
      populatedVideos.splice(randomIndex, 0, userVideo);
  
      setPopularVideos(populatedVideos);
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
      alert('Failed to load YouTube comparison. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChannelVideos = async () => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const channelId = extractChannelId(channelUrl);
    
    if (!channelId) {
      alert('Please enter a valid YouTube channel URL');
      return;
    }
  
    setIsLoading(true);
    try {
      // First try to get channel directly with the extracted ID
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?` +
        `part=snippet,contentDetails&` +
        `id=${channelId}&key=${API_KEY}`
      );
      let channelData = await channelResponse.json();
  
      // If not found, try searching by username for @handle channels
      if (!channelData.items?.length && channelUrl.includes('@')) {
        const searchResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?` +
          `part=snippet&type=channel&` +
          `q=${channelId}&key=${API_KEY}`
        );
        const searchData = await searchResponse.json();
        if (searchData.items?.length) {
          const foundChannelId = searchData.items[0].id.channelId;
          const newChannelResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?` +
            `part=snippet,contentDetails&` +
            `id=${foundChannelId}&key=${API_KEY}`
          );
          channelData = await newChannelResponse.json();
        }
      }
  
      if (!channelData.items?.length) {
        throw new Error('Channel not found');
      }
  
      const channelIcon = channelData.items[0].snippet.thumbnails.default.url;
      const channelTitle = channelData.items[0].snippet.title;
      const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
  
      // Get videos from the channel's uploads playlist
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?` +
        `part=snippet&playlistId=${uploadsPlaylistId}&` +
        `maxResults=50&key=${API_KEY}`
      );
      const videosData = await videosResponse.json();
  
      if (!videosData.items?.length) {
        throw new Error('No videos found');
      }
  
      // Get video details for duration filtering
      const videoIds = videosData.items
        .map((item: any) => item.snippet.resourceId.videoId)
        .join(',');
  
      const videoDetailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?` +
        `part=contentDetails&id=${videoIds}&key=${API_KEY}`
      );
      const videoDetailsData = await videoDetailsResponse.json();
  
      // Filter out shorts and create final video array
      const videos = videoDetailsData.items
        .filter((item: any) => {
          const duration = item.contentDetails.duration;
          const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
          const hours = parseInt(match[1] || '0');
          const minutes = parseInt(match[2] || '0');
          const seconds = parseInt(match[3] || '0');
          const totalSeconds = hours * 3600 + minutes * 60 + seconds;
          return totalSeconds >= 61; // Filter videos longer than 1 minute
        })
        .slice(0, 11)
        .map((item: any) => {
          const videoData = videosData.items.find(
            (v: any) => v.snippet.resourceId.videoId === item.id
          );
          return {
            thumbnail: videoData.snippet.thumbnails.medium?.url || 
                      videoData.snippet.thumbnails.default?.url,
            title: videoData.snippet.title,
            channelTitle: channelTitle,
            profilePicture: channelIcon
          };
        });
  
      // Add user's video at random position
      const userVideo = {
        thumbnail: thumbnailUrl,
        title: title || 'Your Video Title',
        channelTitle: channelTitle,
        profilePicture: profileUrl || channelIcon
      };
  
      const randomIndex = Math.floor(Math.random() * (videos.length + 1));
      videos.splice(randomIndex, 0, userVideo);
  
      setChannelVideos(videos);
    } catch (error) {
      console.error('Error fetching channel data:', error);
      alert('Failed to load channel videos. Please make sure the channel URL is correct and try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleCompareChannel = async () => {
    if (channelUrl.trim()) {
      await fetchChannelVideos();
    } else {
      alert('Please enter a channel URL');
    }
  };


  // Update the handleModeChange function in the ThumbnailTester component
const handleModeChange = async () => {
  setIsChannelMode(!isChannelMode);
  if (isChannelMode) { // If switching from channel to trending
    setChannelVideos([]);
    await fetchYouTubeVideos();
  } else {
    setPopularVideos([]); // Clear trending videos when switching to channel mode
  }
};

// Also update the handleCompareClick function to avoid reloading if videos exist
const handleCompareClick = async () => {
  setShowPopup(true);
  if (!isChannelMode && popularVideos.length === 0) {
    await fetchYouTubeVideos();
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

  const renderComparison = () => {
    const videos = isChannelMode ? channelVideos : popularVideos;

    return (
      <S.YouTubeGrid>
        {videos.map((video, index) => (
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
            <S.CompareButton onClick={handleCompareClick} disabled={isLoading}>
              Compare
            </S.CompareButton>
          </S.ButtonRow>

          <S.DarkModeToggle>
  <S.ToggleInput
    type="checkbox"
    checked={isDarkMode}
    onChange={(e) => setIsDarkMode(e.target.checked)}
  />
  <S.ThemeSlider isChecked={isDarkMode}>
    <i className='bx bx-sun'></i>
    <i className='bx bx-moon'></i>
  </S.ThemeSlider>
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
          <S.PopupHeader>
            <S.ClosePopup onClick={() => setShowPopup(false)}>×</S.ClosePopup>
            <S.PopupControls>
  <S.ModeToggleContainer>
    <S.ToggleInput
      type="checkbox"
      checked={isChannelMode}
      onChange={handleModeChange}
    />
    <S.ModeSlider isChecked={isChannelMode}>
      <span>Trending</span>
      <span>Channel</span>
    </S.ModeSlider>
  </S.ModeToggleContainer>
  {isChannelMode && (
    <S.ChannelInputContainer>
      <S.TitleInput
        type="text"
        value={channelUrl}
        onChange={handleChannelUrlChange}
        placeholder="Enter YouTube channel URL"
      />
      <S.CompareButton onClick={handleCompareChannel} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load Channel'}
      </S.CompareButton>
    </S.ChannelInputContainer>
  )}
</S.PopupControls>
          </S.PopupHeader>
          {renderComparison()}
        </S.PopupContent>
      </S.YouTubePopup>
    </S.Container>
  );
};

export default ThumbnailTester;