// src/services/supabaseService.ts
import { createClient } from '@supabase/supabase-js';
import type { PortfolioVideo } from '../types/portfolio';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getPortfolioVideos = async (): Promise<PortfolioVideo[]> => {
  const { data, error } = await supabase
    .from('portfolio_videos')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data || [];
};

export const getUniqueTags = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('portfolio_videos')
    .select('tag');
    
  if (error) throw error;
  
  // Get unique tags
  const tags = data?.map(item => item.tag) || [];
  return [...new Set(tags)];
};