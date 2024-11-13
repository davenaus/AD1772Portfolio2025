import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { blogService } from '../../services/blogService';
import { BlogPost } from '../../types/blog';
import ReactMarkdown from 'react-markdown';
import * as S from './styles';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (!slug) {
          setError('No slug provided');
          return;
        }
        
        const postData = await blogService.getPostBySlug(slug);
        if (!postData) {
          setError('Post not found');
          return;
        }
        
        setPost(postData);
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(dateString));
    } catch (err) {
      console.error('Error formatting date:', err);
      return dateString;
    }
  };

  if (loading) {
    return (
      <S.Container>
        <S.LoadingWrapper>Loading post...</S.LoadingWrapper>
      </S.Container>
    );
  }

  if (error || !post) {
    return (
      <S.Container>
        <S.ErrorWrapper>
          <div>{error || 'Post not found'}</div>
          <Button onClick={() => navigate('/blog')}>
            Back to Blog
          </Button>
        </S.ErrorWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.BackButton onClick={() => navigate('/blog')}>
        <i className='bx bx-arrow-left' />
        Back to Blog
      </S.BackButton>

      <S.ArticleHeader>
        <S.Category>{post.category}</S.Category>
        <S.Title>{post.title}</S.Title>
        <S.Metadata>
          <span>{formatDate(post.published_at)}</span>
          <span>•</span>
          <span>{post.read_time} min read</span>
          <span>•</span>
          <span>{post.views} views</span>
        </S.Metadata>
      </S.ArticleHeader>

      {post.image_url && (
        <S.HeroImage>
          <img src={post.image_url} alt={post.title} />
        </S.HeroImage>
      )}
      {post.youtube_video_id && (
  <S.VideoContainer>
    <S.VideoWrapper>
      <iframe
        src={`https://www.youtube.com/embed/${post.youtube_video_id}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </S.VideoWrapper>
  </S.VideoContainer>
)}

      <S.ArticleContent>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </S.ArticleContent>
    </S.Container>
  );
};

export default BlogPostPage;