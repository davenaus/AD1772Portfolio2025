// src/components/DashboardTile/DashboardTile.tsx
import React from 'react';
import { Styles as S } from './styles';

interface DashboardTileProps {
  icon?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const DashboardTile: React.FC<DashboardTileProps> = ({
  icon,
  title,
  subtitle,
  children,
  onClick
}) => {
  return (
    <S.Tile onClick={onClick}>
      {icon && (
        <S.TileIcon>
          <i className={icon}></i>
        </S.TileIcon>
      )}
      <S.TileHeader>
        <S.TileTitle>{title}</S.TileTitle>
        {subtitle && <S.TileSubtitle>{subtitle}</S.TileSubtitle>}
      </S.TileHeader>
      <S.TileContent>
        {children}
      </S.TileContent>
    </S.Tile>
  );
};