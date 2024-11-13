import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from './styles';

interface VideoDetails {
  snippet: {
    title: string;
    description: string;
    tags?: string[];
  };
  statistics: {
    viewCount: string;
  };
}

interface TagScore {
  tag: string;
  score: number;
}

export const TagGenerator: React.FC = () => {
  const { searchTitle } = useParams<{ searchTitle: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (searchTitle) {
      const decodedTitle = decodeURIComponent(searchTitle);
      setSearchTerm(decodedTitle);
      handleAnalyze(decodedTitle);
    }
  }, [searchTitle]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert('Please enter a video title');
      return;
    }

    const encodedTitle = encodeURIComponent(searchTerm);
    navigate(`/tools/tag-generator/${encodedTitle}`);
  };

  const handleAnalyze = async (title: string) => {
    if (!title.trim()) {
      alert('Please enter a video title');
      return;
    }

    setIsLoading(true);
    setShowResults(false);
    try {
      const generatedTags = await generateTags(title);
      setTags(generatedTags);
      setShowResults(true);
    } catch (error) {
      console.error('Error generating tags:', error);
      alert('Failed to generate tags. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateTags = async (searchTerm: string) => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    
    // Step 1: Search for videos
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `key=${API_KEY}&` +
      `q=${encodeURIComponent(searchTerm)}&` +
      `part=snippet&` +
      `type=video&` +
      `maxResults=10&` +
      `order=relevance&` +
      `videoCategoryId=27`
    );
    const searchData = await searchResponse.json();

    if (!searchData.items?.length) {
      throw new Error('No videos found');
    }

    // Step 2: Get detailed video information
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?` +
      `key=${API_KEY}&` +
      `part=snippet,statistics&` +
      `id=${videoIds}`
    );
    const detailsData = await detailsResponse.json();

    // Step 3: Process tags
    const allTags: TagScore[] = [];
    
    detailsData.items.forEach((video: VideoDetails) => {
      const videoTags = video.snippet.tags || [];
      const title = video.snippet.title;
      const description = video.snippet.description;
      const viewCount = parseInt(video.statistics.viewCount, 10);

      const scoredTags = videoTags
        .filter(tag => tag.split(' ').length >= 2)
        .map(tag => ({
          tag,
          score: scoreTag(tag, title, description, viewCount)
        }));

      allTags.push(...scoredTags);
    });

    // Step 4: Sort and limit tags
    const sortedTags = allTags
      .sort((a, b) => b.score - a.score)
      .map(item => item.tag)
      .filter((tag, index, self) => self.indexOf(tag) === index)
      .slice(0, 30);

    return sortedTags;
  };

  const scoreTag = (
    tag: string,
    title: string,
    description: string,
    viewCount: number
  ): number => {
    let score = 0;
    const lowercaseTag = tag.toLowerCase();
    const lowercaseTitle = title.toLowerCase();
    const lowercaseDescription = description.toLowerCase();

    // Title relevance
    if (lowercaseTitle.includes(lowercaseTag)) score += 5;

    // Description relevance
    if (lowercaseDescription.includes(lowercaseTag)) score += 3;

    // Length preference
    const wordCount = tag.split(' ').length;
    if (wordCount >= 2 && wordCount <= 4) score += 2;

    // View count consideration
    score += Math.log10(viewCount);

    return score;
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
  };

  const handleCopyTags = () => {
    const tagString = tags.join(', ');
    navigator.clipboard.writeText(tagString).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleClear = () => {
    setTags([]);
    setSearchTerm('');
    setShowResults(false);
    navigate('/tools/tag-generator');
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Tag Generator</S.Title>
      </S.Header>

      <S.SearchContainer>
        <form onSubmit={handleSearch}>
          <S.SearchBar>
            <S.SearchInput
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter Video Title"
            />
            <S.SearchButton type="submit" disabled={isLoading}>
              <i className='bx bx-search'></i>
            </S.SearchButton>
          </S.SearchBar>
        </form>

        {isLoading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <i className='bx bx-loader-alt bx-spin' style={{ fontSize: '2rem' }}></i>
          </div>
        )}

        <S.TagBox visible={showResults}>
          <S.TagList>
            {tags.map((tag, index) => (
              <S.TagItem key={index} onClick={() => removeTag(index)}>
                {tag}
              </S.TagItem>
            ))}
          </S.TagList>
        </S.TagBox>

        <S.ButtonBox visible={showResults}>
          <S.CopyButton onClick={handleCopyTags}>
            <i className={`bx ${copySuccess ? 'bxs-check-circle' : 'bxs-copy'}`}></i>
            {copySuccess ? 'Copied!' : 'Copy Tags'}
          </S.CopyButton>
          <S.ClearButton onClick={handleClear}>
            <i className='bx bx-trash'></i>
            Clear
          </S.ClearButton>
        </S.ButtonBox>
      </S.SearchContainer>
    </S.Container>
  );
};

export default TagGenerator;