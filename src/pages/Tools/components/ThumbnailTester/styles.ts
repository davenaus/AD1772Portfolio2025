// src/pages/Tools/components/ThumbnailTester/styles.ts
import styled from 'styled-components';

interface DarkModeProps {
  isDarkMode?: boolean;
}

interface PreviewItemProps extends DarkModeProps {
  className?: string;
}


export const ThumbnailContainer = styled.div<{ layout?: string }>`
  position: relative;
  width: ${({ layout }) => {
    switch (layout) {
      case 'home-small': return '246px';
      case 'sidebar': return '168px';
      case 'mobile-column': return '168px';
      default: return '100%';
    }
  }};
  float: ${({ layout }) => layout?.includes('small') || layout?.includes('sidebar') ? 'left' : 'none'};
  margin-right: ${({ layout }) => layout?.includes('small') || layout?.includes('sidebar') ? '12px' : '0'};

  @media (max-width: 768px) {
    width: ${({ layout }) => {
      switch (layout) {
        case 'home-large': return '100%';
        case 'sidebar': return '168px';
        case 'mobile-column': return '100%';
        default: return '100%';
      }
    }};
    float: none;
    margin-right: ${({ layout }) => layout?.includes('sidebar') ? '12px' : '0'};
  }
`;



export const VideoInfo = styled.div`
  padding: 8px;
  display: flex;
  align-items: flex-start;

  @media (max-width: 768px) {
    &.sidebar {
      padding-left: 0;
    }

    &.mobile-column {
      flex-direction: row;
      align-items: center;
    }
  }
`;

export const VideoDetails = styled.div<DarkModeProps>`
  flex-grow: 1;
  font-size: 12px;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    .mobile-column & {
      text-align: left;
      padding-left: 12px;
    }
  }
`;


export const PreviewItem = styled.div<PreviewItemProps>`
  background-color: ${({ isDarkMode, theme }) => 
    isDarkMode ? theme.colors.blue2 : theme.colors.blue10};
  margin-bottom: 25px;
  overflow: hidden;
  border-radius: 15px;
  padding: 10px;
  color: ${({ isDarkMode, theme }) => 
    isDarkMode ? theme.colors.blue9 : theme.colors.blue11};

  @media (max-width: 768px) {
    &.home-small {
      display: none;
    }

    &.home-large {
      .video-info {
        flex-direction: row;
      }
    }

    &.sidebar {
      display: flex;
      flex-direction: row;
      align-items: start;

      ${ThumbnailContainer} {
        width: 168px;
        flex-shrink: 0;
        margin-right: 12px;
      }

      ${VideoInfo} {
        flex: 1;
      }
    }

    &.mobile-column {
      ${ThumbnailContainer} {
        width: 100%;
        margin-bottom: 12px;
      }

      ${VideoInfo} {
        flex-direction: row;
      }

      ${VideoDetails} {
        text-align: left;
      }
    }
  }
`;





export const SearchBar = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  border: 1.8px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.blue2};
  margin-bottom: 10px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
      font-family: 'Poppins', sans-serif;
`;

export const TitleInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  background: transparent;
  color: ${({ theme }) => theme.colors.blue9};
      font-family: 'Poppins', sans-serif;

  &::placeholder {
    color: ${({ theme }) => theme.colors.blue11};
  }

  &:focus {
    outline: none;
  }
`;



export const FileInput = styled.input`
  display: none;
`;





export const DarkModeToggle = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-top: 10px;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;


export const PreviewTitle = styled.div<DarkModeProps>`
  padding: 8px;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  color: ${({ isDarkMode, theme }) => 
    isDarkMode ? theme.colors.blue9 : theme.colors.blue8};
`;



export const ThumbnailImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
`;



export const ProfilePicture = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
`;



export const VideoTitle = styled.div<DarkModeProps>`
  font-weight: 500;
  margin-bottom: 2px;
  color: ${({ isDarkMode, theme }) => 
    isDarkMode ? theme.colors.blue9 : theme.colors.blue3};
  font-size: 14px;
`;

export const ChannelName = styled.div<DarkModeProps>`
  color: ${({ isDarkMode, theme }) => 
    isDarkMode ? theme.colors.blue11 : theme.colors.blue11};
`;

export const VideoMetadata = styled(ChannelName)``;

export const VideoTime = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1px 3px;
  font-size: 10px;
  border-radius: 2px;
  font-family: 'Poppins', sans-serif;
`;

export const YouTubePopup = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;



export const YouTubeVideo = styled.div`
  background-color: ${({ theme }) => theme.colors.blue2};
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.blue4};
    background: ${({ theme }) => theme.colors.blue3};
  }
`;



export const PreviewSection = styled.div<DarkModeProps>`
  width: 50%;
  display: none;
  background-color: ${({ isDarkMode, theme }) => 
    isDarkMode ? theme.colors.blue1 : theme.colors.blue12};
  padding: 20px;
  border-radius: 15px;
  height: 100%;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 1rem;
  }

  &.visible {
    display: block;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;



export const YouTubeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;



export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 1rem;
  font-weight: 600;
    text-align: center;
`;


export const PopupVideoTitle = styled.div`
  font-weight: 500;
  margin-bottom: 2px;
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 14px;
`;




export const CompareButton = styled.button`
  flex: 1 1 auto;
  min-width: 150px;
  max-width: 200px;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue9};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blue5};
    transform: translateY(-2px);
  }
`;

export const FileInputLabel = styled.label`
  flex: 1 1 auto;
  min-width: 150px;
  max-width: 200px;
  text-align: center;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue9};
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    max-width: 100%;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blue5};
    transform: translateY(-2px);
  }
`;


// Update the MainContainer styling in styles.ts
export const MainContainer = styled.div<{ isExpanded: boolean }>`
  display: flex;
  justify-content: ${({ isExpanded }) => isExpanded ? 'space-between' : 'center'};
  width: 90%;
  max-width: 1200px;
  height: 100%;
  transition: all 0.3s ease;
  margin: 0 auto; // Add this line to center the container

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }
`;

// Also, let's update the Container to ensure proper alignment
export const Container = styled.div`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;      // Add this line
  flex-direction: column;  // Add this line
  align-items: center;    // Add this line
`;

// Update InputSection to ensure proper width when not expanded
export const InputSection = styled.div<{ isExpanded: boolean }>`
  width: ${({ isExpanded }) => isExpanded ? '45%' : '700px'}; // Update width
  max-width: ${({ isExpanded }) => isExpanded ? '700px' : '100%'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

// Add these new styled components to your styles.ts file

export const PopupHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
`;

export const PopupControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;


export const PopupTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blue9};
  font-size: 1.5rem;
  margin: 0;
  text-align: center;
`;

// Update PopupContent to accommodate new header
export const PopupContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.blue2};
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1001;
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media (max-width: 768px) {
    padding: 1rem;
    width: 95%;
    max-height: 95vh;
  }
`;

// Update ClosePopup positioning for new header
export const ClosePopup = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.blue9};
  z-index: 1002;
  background: ${({ theme }) => theme.colors.blue2};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.blue3};
    transform: scale(1.1);
  }
`;

export const ModeToggle = styled(DarkModeToggle)`
  width: 200px; // Increased from 120px
  margin: 0 auto;
  height: 40px;
`;

export const Slider = styled.span<{ isChecked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ isChecked, theme }) => 
    isChecked ? theme.colors.blue4 : theme.colors.blue3};
  transition: .4s;
  border-radius: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  span {
    color: ${({ theme }) => theme.colors.blue11};
    font-size: 14px;
    font-weight: 500;
    z-index: 1;
    transition: .4s;
    
    &:first-child {
      color: ${({ isChecked, theme }) => 
        isChecked ? theme.colors.blue11 : theme.colors.blue11};
    }
    
    &:last-child {
      color: ${({ isChecked, theme }) => 
        isChecked ? theme.colors.blue11 : theme.colors.blue11};
    }
  }

  &:before {
    position: absolute;
    content: "";
    height: 32px;
    width: 50%;
    left: 4px;
    bottom: 4px;
    background-color: ${({ theme }) => theme.colors.blue5};
    transition: .4s;
    border-radius: 34px;
    transform: ${({ isChecked }) => isChecked ? 'translateX(calc(100% - 8px))' : 'translateX(0)'};
    z-index: 0;
  }
`;

export const ChannelInputContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;

  ${TitleInput} {
    flex: 1;
    border: 1.8px solid ${({ theme }) => theme.colors.blue3};
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.blue2};
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    transition: all 0.2s ease;

    &:focus {
      border-color: ${({ theme }) => theme.colors.blue4};
      outline: none;
      background: ${({ theme }) => theme.colors.blue3};
    }
  }

  ${CompareButton} {
    width: auto;
    min-width: 120px;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    
    ${CompareButton} {
      width: 100%;
    }
  }
`;












// Regular dark/light mode toggle styles


export const ThemeSlider = styled.span<{ isChecked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ isChecked, theme }) => 
    isChecked ? theme.colors.blue4 : theme.colors.blue3};
  transition: .4s;
  border-radius: 34px;

  i {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    z-index: 1;
    
    &.bx-sun {
      right: 8px;
      color: ${({ isChecked, theme }) => 
        isChecked ? theme.colors.blue9 : theme.colors.blue11};
    }
    
    &.bx-moon {
      left: 8px;
      color: ${({ isChecked, theme }) => 
        isChecked ? theme.colors.blue11 : theme.colors.blue9};
    }
  }

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: ${({ theme }) => theme.colors.blue9};
    transition: .4s;
    border-radius: 50%;
    transform: ${({ isChecked }) => isChecked ? 'translateX(26px)' : 'translateX(0)'};
    z-index: 2;
  }
`;

// Mode toggle (Trending/Channel) styles
export const ModeToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 200px;
  height: 40px;
  margin: 0 auto;
`;



export const ModeSlider = styled.span<{ isChecked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ isChecked, theme }) => 
    isChecked ? theme.colors.blue4 : theme.colors.blue3};
  transition: .4s;
  border-radius: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  span {
    font-size: 14px;
    font-weight: 500;
    z-index: 1;
    transition: .4s;
    
    /* Trending text */
    &:first-child {
      color: ${({ isChecked, theme }) => 
        isChecked ? theme.colors.blue11 : theme.colors.blue11};
    }
    
    /* Channel text */
    &:last-child {
      color: ${({ isChecked, theme }) => 
        isChecked ? theme.colors.blue11 : theme.colors.blue11};
    }
  }

  &:before {
    position: absolute;
    content: "";
    height: 32px;
    width: 50%;
    left: 4px;
    bottom: 4px;
    background-color: ${({ theme }) => theme.colors.blue5};
    transition: .4s;
    border-radius: 34px;
    transform: ${({ isChecked }) => isChecked ? 'translateX(calc(100% - 8px))' : 'translateX(0)'};
    z-index: 0;
  }
`;














