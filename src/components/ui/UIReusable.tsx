import React from 'react';

interface UIReusableProps {
  children?: React.ReactNode;
}

export default function UIReusable({ children }: UIReusableProps) {
  return (
    <div>
      {children}
    </div>
  );
}
