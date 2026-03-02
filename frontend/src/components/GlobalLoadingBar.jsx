import React from 'react';
import { useLoading } from '../context/LoadingContext';

export default function GlobalLoadingBar() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 3,
        backgroundColor: '#003580', // booking-style blue
        zIndex: 9999,
      }}
    />
  );
}

