import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div>
      <div>
        <button onClick={onClose}>Close</button>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
