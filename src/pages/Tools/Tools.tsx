// src/pages/Tools/Tools.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import * as S from './styles';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  tags: string[];
  url: string;
  guideLink?: string;
  isNew?: boolean;
  isBeta?: boolean;
}

const tools: Tool[] = [
  {
    id: 'video-analyzer',
    name: 'Video Analyzer',
    description: 'Deep-dive analytics for your YouTube videos. Track performance metrics, engagement rates, and viewer retention patterns.',
    icon: 'bx bx-chart',
    category: 'Analytics',
    tags: ['YouTube', 'Analytics', 'Metrics'],
    url: '/tools/video-analyzer',
    guideLink: 'https://youtu.be/yj9xkwFaIks',
    isNew: true,
  },
  {
    id: 'thumbnail-tester',
    name: 'Thumbnail Tester',
    description: 'Preview how your thumbnails will look across different YouTube layouts and compare with trending videos.',
    icon: 'bx bx-book-content',
    category: 'SEO',
    tags: ['Thumbnails', 'Preview', 'Testing'],
    url: '/tools/thumbnail-tester',
    guideLink: 'https://youtu.be/QDLjFLnG8Z4',
  },
  {
    id: 'thumbnail-downloader',
    name: 'Thumbnail Downloader',
    description: 'Download high-quality thumbnails from any YouTube video with a single click.',
    icon: 'bx bx-photo-album',
    category: 'Utilities',
    tags: ['Thumbnails', 'Download', 'Images'],
    url: '/tools/thumbnail-downloader',
    guideLink: 'https://youtu.be/yAgO-FpqQtI',
  },
  {
    id: 'tag-generator',
    name: 'Tag Generator',
    description: 'Generate optimized tags for your videos using AI and trend analysis to improve discoverability.',
    icon: 'bx bx-purchase-tag-alt',
    category: 'SEO',
    tags: ['SEO', 'Tags', 'Keywords'],
    url: '/tools/tag-generator',
    guideLink: 'https://youtu.be/eEU5806w1EQ',
    isBeta: true,
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate custom QR codes with optional logo overlay for your content.',
    icon: 'bx bx-qr-scan',
    category: 'Utilities',
    tags: ['QR Code', 'Generator', 'Links'],
    url: '/tools/qr-code-generator',
    guideLink: 'https://youtu.be/KYW4EbO0hPw',
  },
  {
    id: 'channel-analyzer',
    name: 'Channel Analyzer',
    description: 'Comprehensive channel analytics with growth tracking, competitor analysis, and optimization recommendations.',
    icon: 'bx bx-line-chart',
    category: 'Analytics',
    tags: ['Channel', 'Growth', 'Insights'],
    url: '/tools/channel-analyzer',
    guideLink: 'https://youtu.be/cXas9RFkfgA',
  },
  {
    id: 'playlist-analyzer',
    name: 'Playlist Analyzer',
    description: 'Analyze any YouTube playlist for detailed insights on views, engagement, and channel distribution.',
    icon: 'bx bx-list-ul',
    category: 'Analytics',
    tags: ['Playlist', 'Analytics', 'Insights'],
    url: '/tools/playlist-analyzer',
    guideLink: 'https://youtu.be/cQtdwox5YHs',
  },
  {
    id: 'outlier-finder',
    name: 'Outlier Finder',
    description: 'Discover high-performing videos that exceed typical view-to-subscriber ratios in any niche.',
    icon: 'bx bx-trophy',
    category: 'SEO',
    tags: ['Views', 'Analysis', 'Discovery'],
    url: '/tools/outlier-finder',
    guideLink: 'https://youtu.be/pqFUL_lBFx4',
  },
  {
    id: 'comment-downloader',
    name: 'Comment Downloader',
    description: 'Download all comments from any YouTube video for analysis and insights.',
    icon: 'bx bx-download',
    category: 'Utilities',
    tags: ['Comments', 'Analysis', 'Data'],
    url: '/tools/comment-downloader',
    guideLink: 'https://youtu.be/26NjUSgQ7rg',
  },
  {
    id: 'channel-consultant',
    name: 'Channel Consultant',
    description: 'Create a custom AI bot trained on your channel to help with content creation and strategy.',
    icon: 'bx bx-user-circle',
    category: 'SEO',
    tags: ['AI', 'Assistant', 'Strategy'],
    url: '/tools/channel-consultant',
    guideLink: 'https://youtu.be/tVf1aVVNERc',
  },
  {
    id: 'channel-comparer',
    name: 'Channel Comparer',
    description: 'Compare any two YouTube channels side by side with detailed metrics and analysis.',
    icon: 'bx bx-analyse',
    category: 'Analytics',
    tags: ['Comparison', 'Analytics', 'Insights'],
    url: '/tools/channel-comparer',
    guideLink: 'https://youtu.be/emDLfwxuozg',
  },
  {
    id: 'color-palette',
    name: 'Color Palette Generator',
    description: 'Extract color palettes from images and generate beautiful gradients. Perfect for content creators and designers.',
    icon: 'bx bx-palette',
    category: 'Utilities',
    tags: ['Colors', 'Design', 'Image Analysis'],
    url: '/tools/color-palette',
    isNew: true,
  },
  {
    id: 'youtube-calculator',
    name: 'YouTube Calculator',
    description: 'Estimate your potential YouTube earnings based on views, video length, and content category.',
    icon: 'bx bx-dollar-circle',
    category: 'Utilities',
    tags: ['Monetization', 'Calculator'],
    url: '/tools/youtube-calculator',
    guideLink: 'https://www.youtube.com/channel/UCg_JArLpHeN9P34qMd9W5rQ',
  },
  {
    id: 'comment-picker',
    name: 'Comment Picker',
    description: 'Randomly select a winner from your YouTube video comments for giveaways and contests.',
    icon: 'bx bx-gift',
    category: 'Utilities',
    tags: ['Comments', 'Giveaway', 'Contest'],
    url: '/tools/comment-picker',
    guideLink: 'https://www.youtube.com/channel/UCg_JArLpHeN9P34qMd9W5rQ',
  },
  {
    id: 'subscribe-link-generator',
    name: 'Subscribe Link Generator',
    description: 'Create personalized subscription links for your YouTube channel.',
    icon: 'bx bx-link',
    category: 'Utilities',
    tags: ['Subscribe', 'Channel', 'Growth'],
    url: '/tools/subscribe-link-generator',
    guideLink: 'https://www.youtube.com/channel/UCg_JArLpHeN9P34qMd9W5rQ',
  },
];

const categories = Array.from(new Set(tools.map(tool => tool.category)));

export const Tools: React.FC = () => {
  const navigate = useNavigate();

  const handleGuideClick = (guideLink?: string) => {
    const link = guideLink || 'https://www.youtube.com/channel/UCg_JArLpHeN9P34qMd9W5rQ';
    window.open(link, '_blank');
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Austin's YouTube Tools</S.Title>
        <S.Description>
          A comprehensive collection of tools designed to help content creators analyze,
          optimize, and grow their online presence. All tools are free to use and regularly
          updated with new features.
        </S.Description>
      </S.Header>

      {categories.map(category => (
        <S.CategorySection key={category}>
          <S.CategoryTitle>{category}</S.CategoryTitle>
          <S.ToolsGrid>
            {tools
              .filter(tool => tool.category === category)
              .map(tool => (
                <S.ToolCard key={tool.id}>
                  <S.ToolIcon>
                    <i className={tool.icon}></i>
                  </S.ToolIcon>

                  <S.ToolName>
                    {tool.name}
                    {tool.isNew && <Tag>New</Tag>}
                    {tool.isBeta && <Tag>Beta</Tag>}
                  </S.ToolName>

                  <S.TagContainer>
                    {tool.tags.map(tag => (
                      <S.Tag key={tag}>{tag}</S.Tag>
                    ))}
                  </S.TagContainer>

                  <S.ToolDescription>{tool.description}</S.ToolDescription>

                  <S.ButtonGroup>
                    <Button
                      variant="primary"
                      icon="bx bx-right-arrow-alt"
                      onClick={() => navigate(tool.url)}
                    >
                      Launch Tool
                    </Button>
                    <Button
                      variant="secondary"
                      icon="bx bx-help-circle"
                      onClick={() => handleGuideClick(tool.guideLink)}
                    >
                      Guide
                    </Button>
                  </S.ButtonGroup>
                </S.ToolCard>
              ))}
          </S.ToolsGrid>
        </S.CategorySection>
      ))}
    </S.Container>
  );
};

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: '500',
      marginLeft: '8px',
      backgroundColor: children === 'New' ? '#22c55e' : '#f59e0b',
      color: '#fff',
    }}
  >
    {children}
  </span>
);

export default Tools;
