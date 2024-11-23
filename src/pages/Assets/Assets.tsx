import React, { useEffect } from 'react';
import { Styles as S } from './styles';

export const Assets: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Open in new tab using window.open()
      window.open('https://bit.ly/shopaustindavenport', '_blank', 'noopener,noreferrer');
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <S.LoadingContainer>
      <S.LoadingSpinner>
        <i className='bx bx-loader-alt'></i>
      </S.LoadingSpinner>
      <S.LoadingText>Opening store in new tab...</S.LoadingText>
    </S.LoadingContainer>
  );
};