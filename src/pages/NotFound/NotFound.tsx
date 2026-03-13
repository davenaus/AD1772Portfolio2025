// src/pages/NotFound/NotFound.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.ScanLine />
      <S.ContentWrapper>
        <S.TimecodeBar>
          <S.TimecodeSegment>00:00:04</S.TimecodeSegment>
          <S.TimecodeSegment>|</S.TimecodeSegment>
          <S.TimecodeSegment highlight>ERR</S.TimecodeSegment>
          <S.TimecodeSegment>|</S.TimecodeSegment>
          <S.TimecodeSegment>FRAME MISSING</S.TimecodeSegment>
        </S.TimecodeBar>

        <S.ErrorCode>404</S.ErrorCode>

        <S.StatusBadge>Clip Not Found</S.StatusBadge>

        <S.ErrorTitle>This frame isn't in the timeline.</S.ErrorTitle>
        <S.ErrorDescription>
          Looks like this page got cut from the final edit. Let's get you back to a sequence that actually exists.
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

        <S.Divider />

        <S.SuggestedLinks>
          <S.SuggestedTitle>Or jump to</S.SuggestedTitle>
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