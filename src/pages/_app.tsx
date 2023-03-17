import "@/src/styles/globals.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "next-themes";

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Navbar from "@/components/navbar";

const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChainId}>
      <ThemeProvider>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
