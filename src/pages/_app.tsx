import "@/src/styles/globals.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "next-themes";

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Navbar from "@/components/navbar";

import { Toaster } from "@/components/ui/toaster";

const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChainId}>
      <ThemeProvider>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
