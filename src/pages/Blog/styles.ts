import styled from 'styled-components';

export const Container = styled.div`
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  margin-bottom: 3rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ active?: boolean }>`
  background: ${({ theme, active }) => active ? theme.colors.blue4 : theme.colors.blue3};
  color: ${({ theme }) => theme.colors.blue9};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
      font-family: 'Poppins', sans-serif;

  &:hover {
    background: ${({ theme }) => theme.colors.blue4};
  }
`;

export const FeaturedPost = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 3rem;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.blue4};
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeaturedImage = styled.div`
  aspect-ratio: 16/9;
  background-size: cover;
  background-position: center;
  background-color: ${({ theme }) => theme.colors.blue3};
`;

export const FeaturedContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

export const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

export const BlogCard = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.blue2};
  border: 1px solid ${({ theme }) => theme.colors.blue3};
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.blue4};
  }
`;

export const BlogImage = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background-size: cover;
  background-position: center;
  background-color: ${({ theme }) => theme.colors.blue3};
`;

export const BlogContent = styled.div`
  padding: 1.5rem;
`;

export const CategoryBadge = styled.span`
  background: ${({ theme }) => theme.colors.blue4};
  color: ${({ theme }) => theme.colors.blue9};
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 1rem;
`;

export const PostTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.blue9};
  margin-bottom: 0.75rem;
  font-weight: 600;
  line-height: 1.3;
`;

export const PostExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

export const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 0.85rem;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: ${({ theme }) => theme.colors.blue11};
  font-size: 1.1rem;
`;

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  min-height: 300px;
  color: ${({ theme }) => theme.colors.blue11};
  text-align: center;

  div {
    font-size: 1.1rem;
  }
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${({ theme }) => theme.colors.blue11};
  text-align: center;
  font-size: 1.1rem;
`;

export const CodeBadge = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ theme }) => theme.colors.blue5};
  color: ${({ theme }) => theme.colors.blue10};
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  z-index: 2; /* Keep it above other elements */
  
  i {
    font-size: 1rem;
  }
`;