import React, { useEffect } from 'react';
import { Styles as S } from './styles';

export const Assets: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://bit.ly/austindavenportstore';
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <S.LoadingContainer>
      <S.LoadingSpinner>
        <i className='bx bx-loader-alt'></i>
      </S.LoadingSpinner>
      <S.LoadingText>Redirecting to store...</S.LoadingText>
    </S.LoadingContainer>
  );
};