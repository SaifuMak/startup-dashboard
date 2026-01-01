import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import {
  poppins,
  inter,
  montserrat,
  roboto,
  openSans,
  lato
} from './fonts'


export const metadata = {
  title: "Startup-site",
  description: "Startup-site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${poppins.className}
          ${inter.className}
          ${montserrat.className}
          ${roboto.className}
          ${openSans.className}
          ${lato.className}
        `}
      >
        <Toaster position="bottom-left" richColors />

        {children}
      </body>
    </html>
  );
}
