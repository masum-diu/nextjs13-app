'use client'

import { useState } from 'react'
import { Box, Stack } from '@mui/material'

export default function BirdGalleryClient({ images, birdName }) {
  const gallery     = images?.length ? images : []
  const [active, setActive] = useState(gallery[0] ?? '')

  return (
    <Box>
      {/* MAIN IMAGE */}
      <Box sx={{
        borderRadius: 5, overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        mb: 2,
      }}>
        {active && (
          <Box
            component="img"
            src={active}
            alt={birdName}
            sx={{
              width: '100%',
              height: { xs: 280, sm: 400, md: 500 },
              objectFit: 'cover',
              display: 'block',
              transition: 'opacity 0.3s ease',
            }}
          />
        )}
        {/* BOTTOM FADE */}
        <Box sx={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
          background: 'linear-gradient(to top, rgba(6,13,8,0.7), transparent)',
          pointerEvents: 'none',
        }} />
      </Box>

      {/* THUMBNAILS */}
      {gallery.length > 1 && (
        <Stack direction="row" spacing={1.5} flexWrap="wrap">
          {gallery.map((img, idx) => (
            <Box
              key={img}
              component="img"
              src={img}
              alt={`${birdName} ${idx + 1}`}
              onClick={() => setActive(img)}
              sx={{
                width: 80, height: 60,
                objectFit: 'cover',
                borderRadius: 2.5,
                cursor: 'pointer',
                display: 'block',
                transition: '0.2s',
                border: active === img
                  ? '2px solid #22C55E'
                  : '2px solid rgba(255,255,255,0.08)',
                opacity: active === img ? 1 : 0.55,
                boxShadow: active === img ? '0 0 12px rgba(34,197,94,0.4)' : 'none',
                '&:hover': { opacity: 1, borderColor: 'rgba(34,197,94,0.5)' },
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  )
}
