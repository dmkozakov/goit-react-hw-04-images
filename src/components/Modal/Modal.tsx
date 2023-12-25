import { MouseEvent, ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalStyled from './Modal.styled';
import Overlay from './Overlay.styled';

interface Props {
  onClose: () => void;
  children: ReactElement;
}

const modalRoot = document.querySelector('#modal-root') as HTMLDialogElement;

export default function Modal({ onClose, children }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalStyled>{children}</ModalStyled>
    </Overlay>,
    modalRoot
  );
}
