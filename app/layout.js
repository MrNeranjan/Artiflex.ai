import { Inter } from "next/font/google";
import "./globals.css";

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
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}


