// src/pages/CodeProject/CodeProject.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { supabase } from '../../utils/supabase';
import ReactMarkdown from 'react-markdown';
import * as S from './styles';

interface CodeProjectType {
  id: number;
  title: string;
  description: string;
  content: string;
  html_code: string;
  image_url: string;
  slug: string;
  created_at: string;
}

export const CodeProject: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<CodeProjectType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const iframeKey = useRef(Date.now()); // Create a unique key for the iframe

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!slug) {
          setError('Project not found');
          return;
        }

        const { data, error } = await supabase
          .from('code_projects')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setProject(data);
        } else {
          setError('Project not found');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Failed to load project. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
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
        <S.LoadingWrapper>Loading project...</S.LoadingWrapper>
      </S.Container>
    );
  }

  if (error || !project) {
    return (
      <S.Container>
        <S.ErrorWrapper>
          <div>{error || 'Project not found'}</div>
          <Button onClick={() => navigate('/code-projects')}>
            Back to Projects
          </Button>
        </S.ErrorWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.BackButton onClick={() => navigate('/code-projects')}>
        <i className='bx bx-arrow-left' />
        Back to Projects
      </S.BackButton>

      <S.ProjectHeader>
        <S.Title>{project.title}</S.Title>
        <S.Metadata>
          <span>Created on {formatDate(project.created_at)}</span>
        </S.Metadata>
      </S.ProjectHeader>

      <S.IframeContainer>
        <S.IframeWrapper>
          {/* Use srcdoc to load the HTML code directly */}
          <iframe 
            key={iframeKey.current} // Use a unique key to force complete remounting
            title={project.title}
            srcDoc={project.html_code}
            sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            style={{ border: 'none' }}
          />
        </S.IframeWrapper>
      </S.IframeContainer>

      <S.ProjectContent>
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </S.ProjectContent>
    </S.Container>
  );
};