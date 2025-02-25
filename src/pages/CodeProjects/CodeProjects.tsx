// src/pages/CodeProjects/CodeProjects.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../utils/supabase';
import styled from 'styled-components';

interface CodeProjectType {
  id: number;
  title: string;
  description: string;
  image_url: string;
  slug: string;
  created_at: string;
}

export const CodeProjects: React.FC = () => {
  const [projects, setProjects] = useState<CodeProjectType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('code_projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching code projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <CodeProjectsContainer>
      <h1>Code Projects</h1>
      <p>Interactive coding projects and demos I've created</p>

      {loading ? (
        <LoadingMessage>Loading projects...</LoadingMessage>
      ) : projects.length === 0 ? (
        <NoProjectsMessage>No projects found.</NoProjectsMessage>
      ) : (
        <ProjectsGrid>
          {projects.map((project) => (
            <ProjectCard key={project.id}>
              <Link to={`/code-projects/${project.slug}`}>
                <ProjectThumbnail>
                  <img 
                    src={project.image_url} 
                    alt={project.title} 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/logo192.png'; // Fallback image if loading fails
                    }}
                  />
                </ProjectThumbnail>
                <ProjectInfo>
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <ReadMoreButton>Try It</ReadMoreButton>
                </ProjectInfo>
              </Link>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      )}
    </CodeProjectsContainer>
  );
};

// Styled components
const CodeProjectsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  & > p {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.blue11};
    margin-bottom: 2rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.colors.blue4};
  }

  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
`;

const ProjectThumbnail = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors.blue9};
  }

  p {
    color: ${({ theme }) => theme.colors.blue11};
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`;

const ReadMoreButton = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.blue3}; /* Changed to a darker color */
  color: white;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.875rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue4};
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.blue11};
`;

const NoProjectsMessage = styled.div`
  text-align: center;
  padding: 3rem 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.blue11};
`;