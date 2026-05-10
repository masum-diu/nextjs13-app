'use client'

import { useState } from 'react'
import { Box, Card, CardContent, Stack } from '@mui/material'

export default function BirdGalleryClient({ images, birdName }) {
  const galleryImages = images && images.length ? images : []
  const [activeImage, setActiveImage] = useState(galleryImages[0] || '')

  return (
    <Card
      sx={{
        borderRadius: 4,
        border: '1px solid rgba(255,255,255,0.6)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.58), rgba(255,255,255,0.34))',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 10px 30px rgba(15,23,42,0.1)',
        overflow: 'hidden',
      }}
    >
      {activeImage ? (
        <Box component="img" src={activeImage} alt={birdName} sx={{ width: '100%', height: 430, objectFit: 'cover' }} />
      ) : null}
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" gap={1} flexWrap="wrap">
          {galleryImages.map((image, idx) => (
            <Box
              key={image}
              component="img"
              src={image}
              alt={`${birdName} ${idx + 1}`}
              onClick={() => setActiveImage(image)}
              sx={{
                width: 90,
                height: 66,
                objectFit: 'cover',
                borderRadius: 1.5,
                cursor: 'pointer',
                border: activeImage === image ? '2px solid #2F855A' : '2px solid transparent',
                opacity: activeImage === image ? 1 : 0.8,
              }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}
