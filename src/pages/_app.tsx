import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { logEvent } from 'firebase/analytics';
import { analytics } from '@/index/firebase';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';

function InnerApp({ Component, pageProps }: AppProps) {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn && <Header />}
      <Component {...pageProps} />
    </>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // ページビューのイベントをトラッキング
    logEvent(analytics, 'page_view');
  }, []);

  return (
    <ChakraProvider>
      <AuthProvider>
        <InnerApp Component={Component} pageProps={pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
