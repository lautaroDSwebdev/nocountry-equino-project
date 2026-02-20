import React from 'react';

interface TablesProps {
  children?: React.ReactNode;
}

export default function Tables({ children }: TablesProps) {
  return (
    <table>
      {children}
    </table>
  );
}
