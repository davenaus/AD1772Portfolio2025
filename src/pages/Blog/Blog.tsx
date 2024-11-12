import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { blogService } from '../../services/blogService';
import { BlogPost, BlogCategory } from '../../types/blog';
import { supabase } from '../../utils/supabase';
import * as S from './styles';

export const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 6;

  // Debug Supabase connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('count')
          .single();
        
        console.log('Supabase connection test:', { data, error });
      } catch (err) {
        console.error('Supabase connection error:', err);
      }
    };

    checkConnection();
  }, []);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadPosts();
  }, [activeCategory, currentPage]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading initial data...');

      const [featuredPost, categories] = await Promise.all([
        blogService.getFeaturedPost().catch(err => {
          console.error('Error loading featured post:', err);
          return null;
        }),
        blogService.getCategories().catch(err => {
          console.error('Error loading categories:', err);
          return [];
        })
      ]);
      
      console.log('Loaded initial data:', { featuredPost, categories });
      
      setFeaturedPost(featuredPost);
      setCategories(categories);
    } catch (error) {
      console.error('Error in loadInitialData:', error);
      setError('Failed to load blog data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading posts with params:', {
        category: activeCategory,
        page: currentPage,
        limit: postsPerPage
      });

      const { posts, total } = await blogService.getPosts({
        category: activeCategory === 'All' ? undefined : activeCategory,
        page: currentPage,
        limit: postsPerPage
      });

      console.log('Loaded posts:', { posts, total });

      setPosts(posts);
      setTotalPosts(total);
    } catch (error) {
      console.error('Error in loadPosts:', error);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    console.log('Changing category to:', category);
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePostClick = (slug: string) => {
    console.log('Navigating to post:', slug);
    navigate(`/blog/${slug}`);
  };

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
        <S.LoadingWrapper>
          <div>Loading blog posts...</div>
        </S.LoadingWrapper>
      </S.Container>
    );
  }

  if (error) {
    return (
      <S.Container>
        <S.ErrorWrapper>
          <div>{error}</div>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </S.ErrorWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Blog</S.Title>
        <S.Description>
          Tips, tutorials, and insights on content creation, YouTube growth,
          and building your online presence.
        </S.Description>

        <S.FilterBar>
          <S.FilterButton
            active={activeCategory === 'All'}
            onClick={() => handleCategoryChange('All')}
          >
            All Posts
          </S.FilterButton>
          {categories.map(category => (
            <S.FilterButton
              key={category.id}
              active={activeCategory === category.name}
              onClick={() => handleCategoryChange(category.name)}
            >
              {category.name}
            </S.FilterButton>
          ))}
        </S.FilterBar>
      </S.Header>

      {featuredPost && activeCategory === 'All' && (
        <S.FeaturedPost onClick={() => handlePostClick(featuredPost.slug)}>
          <S.FeaturedImage style={{ backgroundImage: `url(${featuredPost.image_url})` }} />
          <S.FeaturedContent>
            <S.CategoryBadge>{featuredPost.category}</S.CategoryBadge>
            <S.PostTitle>{featuredPost.title}</S.PostTitle>
            <S.PostExcerpt>{featuredPost.excerpt}</S.PostExcerpt>
            <S.PostMeta>
              <span>{formatDate(featuredPost.published_at)}</span>
              <span>•</span>
              <span>{featuredPost.read_time} min read</span>
            </S.PostMeta>
            <Button
              icon="bx bx-right-arrow-alt"
              style={{ marginTop: '1.5rem' }}
            >
              Read Article
            </Button>
          </S.FeaturedContent>
        </S.FeaturedPost>
      )}

      <S.BlogGrid>
        {posts.length > 0 ? (
          posts.map(post => (
            <S.BlogCard key={post.id} onClick={() => handlePostClick(post.slug)}>
              <S.BlogImage style={{ backgroundImage: `url(${post.image_url})` }} />
              <S.BlogContent>
                <S.CategoryBadge>{post.category}</S.CategoryBadge>
                <S.PostTitle>{post.title}</S.PostTitle>
                <S.PostExcerpt>{post.excerpt}</S.PostExcerpt>
                <S.PostMeta>
                  <span>{formatDate(post.published_at)}</span>
                  <span>•</span>
                  <span>{post.read_time} min read</span>
                </S.PostMeta>
              </S.BlogContent>
            </S.BlogCard>
          ))
        ) : (
          <S.EmptyState>
            <div>No posts found in this category.</div>
          </S.EmptyState>
        )}
      </S.BlogGrid>
    </S.Container>
  );
};

export default Blog;