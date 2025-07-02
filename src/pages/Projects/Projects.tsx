import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../utils/supabase';
import * as S from './styles';

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
  color_accent: string;
  category: string;
  featured: boolean;
}

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const projectRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  // Set up scroll observers after projects load
  useEffect(() => {
    if (projects.length > 0 && projectRefs.current.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
      );

      projectRefs.current.forEach(ref => {
        if (ref) observer.observe(ref);
      });

      return () => observer.disconnect();
    }
  }, [projects, projectRefs.current]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // This query will work with RLS enabled and the public read policy in place
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('featured', { ascending: false })
        .order('id', { ascending: false });

      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }

      if (data) {
        setProjects(data);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Projects</S.Title>
        <S.Description>
          Small tools, products, and creative experiments I've built for content creators.
        </S.Description>
      </S.Header>

      {loading ? (
        <S.LoadingWrapper>
          <S.LoadingCircle />
          <div>Loading projects...</div>
        </S.LoadingWrapper>
      ) : error ? (
        <S.ErrorWrapper>
          <div>{error}</div>
        </S.ErrorWrapper>
      ) : (
        <S.ProjectsGrid>
          {projects.map((project, index) => (
            <S.ProjectCard 
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              accentColor={project.color_accent}
              className="project-tile"
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <S.ProjectImageWrapper>
                <S.ProjectImage 
                  style={{ backgroundImage: `url(${project.image_url})` }} 
                />
                <S.ColorOverlay color={project.color_accent} />
                {project.featured && (
                  <S.FeaturedBadge>Featured</S.FeaturedBadge>
                )}
              </S.ProjectImageWrapper>
              
              <S.ProjectContent>
                <S.CategoryTag color={project.color_accent}>
                  {project.category}
                </S.CategoryTag>
                <S.ProjectTitle>{project.title}</S.ProjectTitle>
                <S.ProjectDescription>{project.description}</S.ProjectDescription>
                <S.ExploreButton color={project.color_accent}>
                  Explore Project
                  <i className='bx bx-right-arrow-alt'></i>
                </S.ExploreButton>
              </S.ProjectContent>
            </S.ProjectCard>
          ))}
        </S.ProjectsGrid>
      )}
    </S.Container>
  );
};

export default Projects;