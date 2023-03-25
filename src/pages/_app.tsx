import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';
import {useEffect} from "react";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/firebase"

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // ページビューのイベントをトラッキング
    logEvent(analytics,'page_view');
  }, []);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
