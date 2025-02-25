// src/services/codeProjectsService.ts
import { supabase } from '../utils/supabase';

interface CodeProject {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  html_code: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export const codeProjectsService = {
  /**
   * Get all code projects
   */
  async getAllProjects(): Promise<CodeProject[]> {
    try {
      const { data, error } = await supabase
        .from('code_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching code projects:', error);
      throw error;
    }
  },

  /**
   * Get a code project by slug
   */
  async getProjectBySlug(slug: string): Promise<CodeProject | null> {
    try {
      const { data, error } = await supabase
        .from('code_projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error(`Error fetching project with slug ${slug}:`, error);
      throw error;
    }
  },

  /**
   * Add a new code project
   */
  async addProject(project: Omit<CodeProject, 'id' | 'created_at' | 'updated_at'>): Promise<CodeProject> {
    try {
      const { data, error } = await supabase
        .from('code_projects')
        .insert([project])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error adding code project:', error);
      throw error;
    }
  },

  /**
   * Update an existing code project
   */
  async updateProject(id: number, updates: Partial<Omit<CodeProject, 'id' | 'created_at' | 'updated_at'>>): Promise<CodeProject> {
    try {
      const { data, error } = await supabase
        .from('code_projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error(`Error updating project with id ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a code project
   */
  async deleteProject(id: number): Promise<void> {
    try {
      const { error } = await supabase
        .from('code_projects')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(`Error deleting project with id ${id}:`, error);
      throw error;
    }
  }
};