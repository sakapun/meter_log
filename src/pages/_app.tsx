// src/pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { logEvent } from 'firebase/analytics';
import { analytics } from '@/firebase';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // ページビューのイベントをトラッキング
    logEvent(analytics, 'page_view');
  }, []);

  return (
    <ChakraProvider>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
