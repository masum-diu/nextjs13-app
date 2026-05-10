import { birds } from '../../lib/birds'

export async function generateMetadata({ params }) {
  const bird = birds.find((b) => b.slug === params.slug)

  if (!bird) {
    return {
      title: 'Bird Not Found',
      description: 'This bird could not be found on SN Agro Farm.',
    }
  }

  return {
    title: bird.name,
    description: `${bird.description} Available now at SN Agro Farm. ${bird.features.join(', ')}.`,
    keywords: [bird.name, bird.origin, 'SN Agro Farm', 'buy birds Bangladesh', ...bird.features],
    openGraph: {
      title: `${bird.name} | SN Agro Farm`,
      description: bird.description,
      images: [
        {
          url: bird.image,
          width: 1200,
          height: 630,
          alt: bird.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${bird.name} | SN Agro Farm`,
      description: bird.description,
      images: [bird.image],
    },
  }
}

export default function BirdLayout({ children }) {
  return children
}
