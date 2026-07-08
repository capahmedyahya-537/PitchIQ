'use client';

import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PitchIQ - مساعد مدرب كرة القدم',
  description: 'لوحة تكتيكية تفاعلية مع مكتبة تشكيلات وتمارين لمدربي كرة القدم',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}