// src/services/blogService.ts
import { supabase } from '../utils/supabase';
import { BlogPost, BlogCategory } from '../types/blog';

export const blogService = {
  async getFeaturedPost(): Promise<BlogPost | null> {
    console.log('Fetching featured post...');
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('featured', true)
      .eq('published', true)
      .single();

    if (error) {
      console.error('Error fetching featured post:', error);
      throw error;
    }
    return data;
  },

  async getPosts({
    category,
    page = 1,
    limit = 6,
    searchQuery = '',
  }: {
    category?: string;
    page?: number;
    limit?: number;
    searchQuery?: string;
  }): Promise<{ posts: BlogPost[]; total: number }> {
    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .eq('published', true);

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query
      .order('published_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }

    return { posts: data || [], total: count || 0 };
  },

  async getCategories(): Promise<BlogCategory[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('category')
      .eq('published', true)
      .order('category');

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    // Get unique categories
    const uniqueCategories = Array.from(new Set(data.map(post => post.category)))
      .map(category => ({
        id: category,
        name: category,
        slug: category.toLowerCase().replace(/\s+/g, '-')
      }));

    return uniqueCategories;
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching post by slug:', error);
      throw error;
    }

    if (data) {
      // Increment views
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', data.id);

      if (updateError) {
        console.error('Error incrementing views:', updateError);
      }
    }

    return data;
  }
};