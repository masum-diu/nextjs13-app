export async function generateMetadata({ params }) {
  try {
    const res  = await fetch(
      `${process.env.NEXTAUTH_URL}/api/birds/slug/${params.slug}`,
      { cache: 'no-store' }
    )
    const data = await res.json()
    const bird = data.bird

    if (!bird) return { title: 'Bird Not Found' }

    return {
      title: bird.name,
      description: `${bird.description} Available now at SN Agro Farm. ${(bird.features || []).join(', ')}.`,
      keywords: [bird.name, bird.origin, 'SN Agro Farm', 'buy birds Bangladesh', ...(bird.features || [])],
      openGraph: {
        title: `${bird.name} | SN Agro Farm`,
        description: bird.description,
        images: [{ url: bird.image, width: 1200, height: 630, alt: bird.name }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${bird.name} | SN Agro Farm`,
        description: bird.description,
        images: [bird.image],
      },
    }
  } catch {
    return { title: 'SN Agro Farm' }
  }
}

export default function BirdLayout({ children }) {
  return children
}
