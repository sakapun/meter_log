import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { logEvent } from 'firebase/analytics';
import { analytics } from '@/firebase';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import {MeterProvider} from "@/context/MeterContext";

function InnerApp({ Component, pageProps }: AppProps) {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn && (
        <MeterProvider>
          <Header />
          <Component {...pageProps} />
        </MeterProvider>
      )}
      {!isLoggedIn && <Component {...pageProps} />}
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
