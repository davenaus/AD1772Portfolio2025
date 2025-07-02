import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Tools } from './pages/Tools/Tools';
import { Blog } from './pages/Blog/Blog';
import { BlogPostPage } from './pages/BlogPost/BlogPost';
import { Store } from './pages/Store/Store';
import { Portfolio } from './pages/Portfolio/Portfolio';
import { Contact } from './pages/Contact/Contact';
import { OutlierFinder } from './pages/Tools/components/OutlierFinder/OutlierFinder';
import { VideoAnalyzer } from './pages/Tools/components/VideoAnalyzer/VideoAnalyzer';
import { ChannelAnalyzer } from './pages/Tools/components/ChannelAnalyzer/ChannelAnalyzer';
import { ChannelComparer } from './pages/Tools/components/ChannelComparer/ChannelComparer';
import { ChannelConsultant } from './pages/Tools/components/ChannelConsultant/ChannelConsultant';
import { CommentDownloader } from './pages/Tools/components/CommentDownloader/CommentDownloader';
import { PlaylistAnalyzer } from './pages/Tools/components/PlaylistAnalyzer/PlaylistAnalyzer';
import { QRCodeGenerator } from './pages/Tools/components/QRCodeGenerator/QRCodeGenerator';
import { TagGenerator } from './pages/Tools/components/TagGenerator/TagGenerator';
import { ThumbnailDownloader } from './pages/Tools/components/ThumbnailDownloader/ThumbnailDownloader';
import { ThumbnailTester } from './pages/Tools/components/ThumbnailTester/ThumbnailTester';
import { YouTubeCalculator } from './pages/Tools/components/YouTubeCalculator/YouTubeCalculator';
import { YouTubeTranscript } from './pages/Tools/components/YouTubeTranscript/YouTubeTranscript';
import { CommentPicker } from './pages/Tools/components/CommentPicker/CommentPicker';
import { SubscribeLinkGenerator } from './pages/Tools/components/SubscribeLinkGenerator/SubscribeLinkGenerator';
import { ColorPalette } from './pages/Tools/components/ColorPalette/ColorPalette';
import { TiktokLinks } from './pages/TiktokLinks/TiktokLinks';
import { ExtraLinks } from './pages/ExtraLinks/ExtraLinks';
import { Projects } from './pages/Projects/Projects';
import { NotFound } from './pages/NotFound/NotFound';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/tools/youtube-transcript" element={<YouTubeTranscript />} />
      <Route path="/tools/outlier-finder" element={<OutlierFinder />} />
      <Route path="/tools/outlier-finder/:searchQuery/:type" element={<OutlierFinder />} />
      <Route path="/tools/video-analyzer" element={<VideoAnalyzer />} />
      <Route path="/tools/video-analyzer/:videoId" element={<VideoAnalyzer />} />
      <Route path="/tools/channel-analyzer" element={<ChannelAnalyzer />} />
      <Route path="/tools/channel-analyzer/:channelId" element={<ChannelAnalyzer />} />
      <Route path="/tools/channel-comparer" element={<ChannelComparer />} />
      <Route path="/tools/channel-consultant" element={<ChannelConsultant />} />
      <Route path="/tools/comment-downloader" element={<CommentDownloader />} />
      <Route path="/tools/comment-downloader/:videoId" element={<CommentDownloader />} />
      <Route path="/tools/comment-picker" element={<CommentPicker />} />
      <Route path="/tools/comment-picker/:videoId" element={<CommentPicker />} />
      <Route path="/tools/playlist-analyzer" element={<PlaylistAnalyzer />} />
      <Route path="/tools/playlist-analyzer/:playlistId" element={<PlaylistAnalyzer />} />
      <Route path="/tools/qr-code-generator" element={<QRCodeGenerator />} />
      <Route path="/tools/subscribe-link-generator" element={<SubscribeLinkGenerator />} />
      <Route path="/tools/tag-generator" element={<TagGenerator />} />
      <Route path="/tools/tag-generator/:searchTitle" element={<TagGenerator />} />
      <Route path="/tools/thumbnail-downloader" element={<ThumbnailDownloader />} />
      <Route path="/tools/thumbnail-downloader/:videoId" element={<ThumbnailDownloader />} />
      <Route path="/tools/thumbnail-tester" element={<ThumbnailTester />} />
      <Route path="/tools/youtube-calculator" element={<YouTubeCalculator />} />
      <Route path="/tools/color-palette" element={<ColorPalette />} />
      <Route path="/links" element={<TiktokLinks />} />
      <Route path="/extra-links" element={<ExtraLinks />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/store" element={<Store />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};