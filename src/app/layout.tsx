import React from 'react';
import './styles/globals.css';

export const metadata = {
  title: 'Millionaires Game',
  description: 'Who Wants to Be a Millionaire Game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
