export const metadata = {
  title: 'Farm Videos',
  description: 'Watch SN Agro Farm videos on bird care, breeding, feeding, health tips and daily farm life. Learn from our expert bird farming guides.',
  keywords: ['bird farm videos', 'Emo Pakhi video', 'OT Pakhi breeding', 'bird care guide', 'SN Agro videos', 'bird farming Bangladesh'],
  openGraph: {
    title: 'Farm Videos | SN Agro Farm',
    description: 'Watch SN Agro Farm videos on bird care, breeding, feeding and farm life.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'SN Agro Farm Videos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Farm Videos | SN Agro Farm',
    description: 'Watch bird care, breeding and farm life videos from SN Agro Farm.',
  },
}

export default function VideosLayout({ children }) {
  return children
}
