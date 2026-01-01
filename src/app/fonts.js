import {
  Poppins,
  Inter,
  Montserrat,
  Roboto,
  Open_Sans,
  Lato
} from 'next/font/google'

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
})

export const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900']
})
