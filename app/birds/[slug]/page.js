'use client'

import { notFound } from 'next/navigation'
import { Box, Button, Card, CardContent, Chip, Container, Divider, Stack, Typography } from '@mui/material'
import { ArrowBack, LocalShipping, Shield, Star } from '@mui/icons-material'
import { birds } from '../../lib/birds'
import BirdGalleryClient from './BirdGalleryClient'

export default function BirdDetailsPage({ params }) {
  const bird = birds.find((item) => item.slug === params.slug)

  if (!bird) {
    notFound()
  }

  const galleryImages = bird.images && bird.images.length ? bird.images : [bird.image]
  const suggestedBirds = birds.filter((item) => item.slug !== bird.slug).slice(0, 3)

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F3F7F1', py: 6 }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Button
            component="a"
            href="/"
            startIcon={<ArrowBack />}
            sx={{ width: 'fit-content', textTransform: 'none', color: '#1F2A1F' }}
          >
            Back to Home
          </Button>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ width: { xs: '100%', md: 'calc(58.333% - 12px)' } }}>
              <BirdGalleryClient images={galleryImages} birdName={bird.name} />
            </Box>

            <Box sx={{ width: { xs: '100%', md: 'calc(41.667% - 12px)' } }}>
              <Card
                sx={{
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.6)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.58), rgba(255,255,255,0.34))',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 10px 30px rgba(15,23,42,0.1)',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Chip label={bird.badge} sx={{ bgcolor: 'rgba(47,133,90,0.16)', color: '#2F855A', fontWeight: 700 }} />
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Star sx={{ color: '#FBBF24', fontSize: 18 }} />
                        <Typography sx={{ color: '#5F6B5F', fontWeight: 600 }}>{bird.rating}</Typography>
                      </Stack>
                    </Stack>

                    <Typography variant="h4" sx={{ color: '#1F2A1F', fontWeight: 800 }}>
                      {bird.name}
                    </Typography>
                    <Typography sx={{ color: '#5F6B5F', fontWeight: 600 }}>{bird.origin}</Typography>
                    <Typography sx={{ color: '#2F855A', fontWeight: 800, fontSize: '1.8rem' }}>Available Now</Typography>
                    <Typography sx={{ color: '#4B5563', lineHeight: 1.8 }}>{bird.description}</Typography>

                    <Stack direction="row" gap={1} flexWrap="wrap">
                      {bird.features.map((feature) => (
                        <Chip key={feature} label={feature} sx={{ bgcolor: 'rgba(47,133,90,0.1)', color: '#2F855A' }} />
                      ))}
                    </Stack>

                    <Divider />

                    <Stack spacing={1}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <LocalShipping sx={{ color: '#2F855A', fontSize: 18 }} />
                        <Typography sx={{ color: '#5F6B5F', fontSize: '0.9rem' }}>Safe nationwide delivery</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Shield sx={{ color: '#2F855A', fontSize: 18 }} />
                        <Typography sx={{ color: '#5F6B5F', fontSize: '0.9rem' }}>Health support included</Typography>
                      </Stack>
                    </Stack>

                    <Typography sx={{ color: '#2F855A', fontWeight: 700 }}>{bird.reviews} customer reviews</Typography>

                    <Button variant="contained" component="a" href="tel:+8801700000000" sx={{ bgcolor: '#2F855A' }}>
                      Contact Now
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ color: '#1F2A1F', fontWeight: 800, mb: 2 }}>
              Suggested Pakhi
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {suggestedBirds.map((item) => (
                <Box key={item.slug} sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 11px)' } }}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      border: '1px solid rgba(255,255,255,0.6)',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.58), rgba(255,255,255,0.34))',
                    }}
                  >
                    <Box component="img" src={item.image} alt={item.name} sx={{ width: '100%', height: 130, objectFit: 'cover' }} />
                    <CardContent sx={{ p: 2 }}>
                      <Typography sx={{ color: '#1F2A1F', fontWeight: 700 }}>{item.name}</Typography>
                      <Typography sx={{ color: '#5F6B5F', fontSize: '0.82rem', mb: 1 }}>{item.origin}</Typography>
                      <Button component="a" href={`/birds/${item.slug}`} size="small" sx={{ textTransform: 'none', p: 0 }}>
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
