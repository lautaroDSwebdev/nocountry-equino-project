import React from 'react';

interface ColumnsProps {
  children?: React.ReactNode;
}

export default function Columns({ children }: ColumnsProps) {
  return (
    <div>
      {children}
    </div>
  );
}
