import "./globals.css";
import { Toaster } from 'sonner';

export const metadata = {
  title: "Startup-site",
  description: "Startup-site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,600;0,700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700&family=Poppins:ital,wght@0,300;0,400;0,600;0,700&family=Montserrat:ital,wght@0,300;0,400;0,600;0,700&family=Lato:ital,wght@0,300;0,400;0,700;0,900&family=Nunito:ital,wght@0,300;0,400;0,600;0,700&family=Raleway:ital,wght@0,300;0,400;0,600;0,700&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700&family=Work+Sans:ital,wght@0,300;0,400;0,600;0,700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700&family=Rubik:ital,wght@0,300;0,400;0,500;0,700&family=Muli:ital,wght@0,300;0,400;0,600;0,700&family=Hind:ital,wght@0,300;0,400;0,500;0,600;0,700&family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,700&family=Oswald:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,400;1,700&family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Bebas+Neue&family=Quicksand:ital,wght@0,300;0,400;0,600;0,700&family=Cabin:ital,wght@0,400;0,500;0,600;0,700&family=Josefin+Sans:ital,wght@0,300;0,400;0,600;0,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Anton&family=Comfortaa:wght@300;400;600;700&family=Heebo:ital,wght@0,300;0,400;0,500;0,700&family=Manrope:wght@300;400;500;600;700&display=swap"
        />

      </head>
      <body

      >
        <Toaster position="bottom-left" richColors />

        {children}
      </body>
    </html>
  );
}
