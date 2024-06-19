import { Inter } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/modal-provider";
const inter = Inter({ subsets: ["latin"] });
import {
  ClerkProvider,

} from '@clerk/nextjs'

export const metadata = {
  title: "InnoGen",
  description: "Devolped by Neranjan Pushpakumara",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}


