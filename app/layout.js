import { Inter } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/modal-provider";
const inter = Inter({ subsets: ["latin"] });
import {
  ClerkProvider,

} from '@clerk/nextjs'
import ToasterProvider from "@/components/toaster-provider";
import { CrispProvider } from "@/components/crisp-provider";

export const metadata = {
  title: "ArtiflexAI",
  description: "Devolped by Neranjan Pushpakumara",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <CrispProvider/>
        <body className={inter.className}>
          <ModalProvider />
          <ToasterProvider/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}


