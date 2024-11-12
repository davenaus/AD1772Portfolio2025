// src/components/SuccessModal/SuccessModal.tsx
import React from 'react';
import * as S from './styles';

interface SuccessModalProps {
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={e => e.stopPropagation()}>
        <S.Icon>
          <i className='bx bx-check'></i>
        </S.Icon>
        <S.Title>Message Sent Successfully!</S.Title>
        <S.Message>
          Thank you for reaching out. I'll get back to you as soon as possible.
        </S.Message>
        <S.CloseButton onClick={onClose}>
          Close
        </S.CloseButton>
      </S.Modal>
    </S.Overlay>
  );
};