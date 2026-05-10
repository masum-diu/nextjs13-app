export const metadata = {
  title: 'Explore Birds',
  description: 'Browse our full collection of premium Emo Pakhi, OT Pakhi, rare breeds and farm care products from SN Agro Farm.',
  keywords: ['explore birds', 'Emo Pakhi', 'OT Pakhi', 'rare birds', 'premium birds Bangladesh', 'SN Agro collection'],
  openGraph: {
    title: 'Explore Birds | SN Agro Farm',
    description: 'Browse our full collection of premium Emo Pakhi, OT Pakhi, rare breeds and farm care products.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'SN Agro Farm Bird Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore Birds | SN Agro Farm',
    description: 'Browse our full collection of premium birds from SN Agro Farm.',
  },
}

export default function ExploreLayout({ children }) {
  return children
}
