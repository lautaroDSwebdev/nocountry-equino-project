import React from 'react';

interface FormsProps {
  children?: React.ReactNode;
}

export default function Forms({ children }: FormsProps) {
  return (
    <form>
      {children}
    </form>
  );
}
