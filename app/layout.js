import { Poppins } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata = {
  title: {
    default: 'SN Agro Farm — Premium Birds',
    template: '%s | SN Agro Farm',
  },
  description: 'Buy premium Emo Pakhi, OT Pakhi and exotic birds from SN Agro Farm. Health certified, vaccinated and delivered nationwide across Bangladesh.',
  keywords: ['SN Agro', 'Emo Pakhi', 'OT Pakhi', 'bird farm', 'exotic birds', 'bird for sale', 'Bangladesh bird farm'],
  authors: [{ name: 'SN Agro Farm' }],
  creator: 'SN Agro Farm',
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    siteName: 'SN Agro Farm',
    title: 'SN Agro Farm — Premium Birds',
    description: 'Buy premium Emo Pakhi, OT Pakhi and exotic birds from SN Agro Farm. Health certified, vaccinated and delivered nationwide.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'SN Agro Farm Premium Birds',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SN Agro Farm — Premium Birds',
    description: 'Buy premium Emo Pakhi, OT Pakhi and exotic birds from SN Agro Farm.',
    images: ['https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
