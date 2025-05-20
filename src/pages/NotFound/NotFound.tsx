// src/pages/NotFound/NotFound.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <S.Container>
      <S.ContentWrapper>
        <S.ErrorCode>404</S.ErrorCode>
        
        <S.IllustrationWrapper>
          <S.TimelineBar>
            <S.TimelineCursor />
          </S.TimelineBar>
          <S.MissingClipText>Missing Clip</S.MissingClipText>
        </S.IllustrationWrapper>
        
        <S.ErrorTitle>Page Not Found</S.ErrorTitle>
        <S.ErrorDescription>
          This frame wasn't in the timeline. Let's get you back to a sequence that exists.
        </S.ErrorDescription>
        
        <S.ButtonGroup>
          <S.PrimaryButton onClick={() => navigate('/')}>
            <i className='bx bx-home'></i>
            Back to Home
          </S.PrimaryButton>
          <S.SecondaryButton onClick={() => navigate(-1)}>
            <i className='bx bx-arrow-back'></i>
            Go Back
          </S.SecondaryButton>
        </S.ButtonGroup>
        
        <S.SuggestedLinks>
          <S.SuggestedTitle>Looking for something?</S.SuggestedTitle>
          <S.SuggestedGrid>
            <S.SuggestedLink to="/portfolio">
              <i className='bx bx-book-alt'></i>
              Portfolio
            </S.SuggestedLink>
            <S.SuggestedLink to="/projects">
              <i className='bx bx-layer'></i> 
              Projects
            </S.SuggestedLink>
            <S.SuggestedLink to="/blog">
              <i className='bx bx-pen'></i>
              Blog
            </S.SuggestedLink>
            <S.SuggestedLink to="/contact">
              <i className='bx bx-phone'></i>
              Contact
            </S.SuggestedLink>
          </S.SuggestedGrid>
        </S.SuggestedLinks>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default NotFound;