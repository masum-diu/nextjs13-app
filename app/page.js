'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'

import {
  Star,
  Pets,
  ArrowForward,
  Verified,
  LocalShipping,
  MedicalServices,
  SupportAgent,
  PlayArrow,
  LocationOn,
} from '@mui/icons-material'

const DEFAULT_SLIDES = [
  { image: 'https://i0.wp.com/knowanimal.com/wp-content/uploads/2020/06/Emu-Birds.jpg?fit=640%2C494&ssl=1', name: 'Emo Pakhi' },
  { image: 'https://www.justnewsbd.com/np-uploads/content/images/2017December/1-20190121170148.jpg', name: 'OT Pakhi' },
  { image: 'https://www.ajkerbazzar.com/wp-content/uploads/2019/01/horin.jpeg', name: 'Horin' },
  { image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=1200&auto=format&fit=crop', name: 'Horgos' },
]

const features = [
  {
    icon: <Verified />,
    title: 'Certified Birds',
    description: 'Health certified & vaccinated',
  },
  {
    icon: <LocalShipping />,
    title: 'Safe Delivery',
    description: 'Careful nationwide shipping',
  },
  {
    icon: <MedicalServices />,
    title: 'Health Guarantee',
    description: '7-day health guarantee',
  },
  {
    icon: <SupportAgent />,
    title: '24/7 Support',
    description: 'Expert bird care advice',
  },
]

const stats = [
  { value: '5000+', label: 'Birds Sold' },
  { value: '10+',   label: 'Years Exp.' },
  { value: '98%',   label: 'Happy Clients' },
]

export default function Home() {
  const [slides,   setSlides]     = useState(DEFAULT_SLIDES)
  const [imgIdx,   setImgIdx]     = useState(0)
  const [progress, setProgress]   = useState(0)

  useEffect(() => {
    fetch('/api/birds')
      .then((r) => r.json())
      .then((d) => {
        const birds = d.birds || []
        if (birds.length >= 2) {
          setSlides(birds.slice(0, 6).map((b) => ({ image: b.image, name: b.name, slug: b.slug })))
          setImgIdx(0)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    setProgress(0)
    const step   = 100 / 30          // 30 ticks over 3000ms → 100ms each
    const ticker = setInterval(() => setProgress((p) => Math.min(p + step, 100)), 100)
    const slider = setTimeout(() => {
      setImgIdx((i) => (i + 1) % slides.length)
      setProgress(0)
    }, 3000)
    return () => { clearInterval(ticker); clearTimeout(slider) }
  }, [imgIdx])

  return (
    <Box sx={{ bgcolor: '#F8FAF8' }}>

      {/* ── HERO ── */}
      <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

        {/* VIDEO BG */}
        <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
          <Box
            component="iframe"
            src="https://www.youtube.com/embed/7X-5_NWQ_Dc?autoplay=1&mute=1&controls=0&loop=1&playlist=7X-5_NWQ_Dc&modestbranding=1&rel=0&showinfo=0"
            title="Bird Farm Video"
            allow="autoplay; encrypted-media"
            allowFullScreen
            sx={{
              position: 'absolute', top: '50%', left: '50%', border: 0,
              pointerEvents: 'none',
              width:  { xs: '400vw', sm: '250vw', md: '170vw', lg: '120vw' },
              height: { xs: '120vh', md: '130vh' },
              transform: 'translate(-50%, -50%) scale(1.15)',
              filter: 'brightness(0.6) contrast(1.1) saturate(1.1)',
            }}
          />

          {/* OVERLAYS */}
          <Box sx={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.65) 100%)',
          }} />
          <Box sx={{
            position: 'absolute', inset: 0,
            background: { xs: 'none', md: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.6) 100%)' },
          }} />
          <Box sx={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: { xs: 180, md: 260 },
            background: 'linear-gradient(to top, rgba(248,250,248,1), transparent)',
          }} />

          {/* GLOWS */}
          <Box sx={{ position: 'absolute', top: '-10%', left: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(34,197,94,0.22)', filter: 'blur(100px)' }} />
          <Box sx={{ position: 'absolute', bottom: '-15%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(74,222,128,0.18)', filter: 'blur(120px)' }} />
        </Box>

        {/* CONTENT */}
        <Container
          maxWidth="xl"
          sx={{
            position: 'relative', zIndex: 2,
            minHeight: '100vh',
            display: 'flex', alignItems: 'center',
            pt: { xs: 10, md: 0 },
            pb: { xs: 6, md: 0 },
          }}
        >
          <Grid container spacing={{ xs: 3, md: 5 }} alignItems="center">

            {/* LEFT */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={{ xs: 3, md: 4 }} alignItems={{ xs: 'center', md: 'flex-start' }}>

                {/* BADGES */}
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Chip
                    icon={<Pets sx={{ color: '#22C55E !important' }} />}
                    label="SN Agro Farm"
                    sx={{ bgcolor: 'rgba(255,255,255,0.14)', color: '#fff', fontWeight: 700, border: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(10px)' }}
                  />
                  <Chip
                    icon={<Star sx={{ color: '#FACC15 !important' }} />}
                    label="Premium Birds"
                    sx={{ bgcolor: 'rgba(255,255,255,0.14)', color: '#fff', fontWeight: 700, border: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(10px)' }}
                  />
                </Box>

                {/* HEADING */}
                <Typography sx={{
                  color: '#fff', fontWeight: 900, lineHeight: 1,
                  letterSpacing: '-0.04em',
                  textAlign: { xs: 'center', md: 'left' },
                  fontSize: { xs: '2.6rem', sm: '3.6rem', md: '6rem' },
                  textShadow: '0 10px 40px rgba(0,0,0,0.35)',
                }}>
                  Healthy Birds
                  <br />
                  Raised With
                  <Box component="span" sx={{
                    display: 'block',
                    background: 'linear-gradient(90deg, #22C55E, #86EFAC)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    Natural Care
                  </Box>
                </Typography>

                {/* DESCRIPTION */}
                <Typography sx={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                  lineHeight: 1.9,
                  maxWidth: 560,
                  textAlign: { xs: 'center', md: 'left' },
                }}>
                  Premium Emo Pakhi, OT Pakhi and exotic birds directly from
                  trusted SN Agro farm with nationwide delivery and complete care support.
                </Typography>

                {/* BUTTONS */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.5}
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                  <Button
                    component={Link} href="/explore"
                    variant="contained"
                    endIcon={<ArrowForward />}
                    fullWidth={false}
                    sx={{
                      bgcolor: '#22C55E', color: '#fff',
                      px: { xs: 3, md: 4 }, py: 1.7,
                      borderRadius: 999,
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      fontWeight: 700, textTransform: 'none',
                      boxShadow: '0 12px 30px rgba(34,197,94,0.35)',
                      width: { xs: '100%', sm: 'auto' },
                      '&:hover': { bgcolor: '#16A34A' },
                    }}
                  >
                    Explore Birds
                  </Button>

                  <Button
                    component={Link} href="/videos"
                    startIcon={<PlayArrow />}
                    sx={{
                      color: '#fff',
                      px: { xs: 3, md: 3.5 }, py: 1.7,
                      borderRadius: 999,
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      fontWeight: 600, textTransform: 'none',
                      backdropFilter: 'blur(10px)',
                      bgcolor: 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.22)',
                      width: { xs: '100%', sm: 'auto' },
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' },
                    }}
                  >
                    Watch Farm Video
                  </Button>

                  <Button
                    component={Link} href="/contact"
                    startIcon={<LocationOn />}
                    sx={{
                      color: '#fff',
                      px: { xs: 3, md: 3.5 }, py: 1.7,
                      borderRadius: 999,
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      fontWeight: 600, textTransform: 'none',
                      backdropFilter: 'blur(10px)',
                      bgcolor: 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.22)',
                      width: { xs: '100%', sm: 'auto' },
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' },
                    }}
                  >
                    Find Us
                  </Button>
                </Stack>

                {/* STATS — mobile: row, desktop: row */}
                <Box sx={{
                  display: 'flex',
                  gap: { xs: 1.5, md: 2 },
                  flexWrap: 'nowrap',
                  width: { xs: '100%', md: 'auto' },
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}>
                  {stats.map((item) => (
                    <Box
                      key={item.label}
                      sx={{
                        flex: { xs: 1, md: 'none' },
                        px: { xs: 1.5, md: 3 },
                        py: { xs: 1.5, md: 2 },
                        borderRadius: 4,
                        bgcolor: 'rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.16)',
                        textAlign: { xs: 'center', md: 'left' },
                        minWidth: { xs: 0, md: 130 },
                      }}
                    >
                      <Typography sx={{
                        color: '#22C55E', fontWeight: 900,
                        fontSize: { xs: '1.3rem', md: '1.7rem' },
                        lineHeight: 1,
                      }}>
                        {item.value}
                      </Typography>
                      <Typography sx={{
                        color: 'rgba(255,255,255,0.72)',
                        fontSize: { xs: '0.72rem', md: '0.9rem' },
                        mt: 0.3,
                      }}>
                        {item.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Stack>
            </Grid>

            {/* RIGHT — desktop only */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Card sx={{
                borderRadius: 8, overflow: 'hidden',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(18px)',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.35)',
              }}>
                <Box
                  component="img"
                  src={slides[imgIdx]?.image}
                  alt="SN Agro Farm"
                  sx={{
                    width: '100%', height: 320, objectFit: 'cover',
                    transition: 'opacity 0.6s ease',
                  }}
                />

                {/* PROGRESS BAR */}
                <Box sx={{ height: 3, bgcolor: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                  <Box sx={{
                    position: 'absolute', left: 0, top: 0, height: '100%',
                    width: `${progress}%`,
                    bgcolor: '#22C55E',
                    boxShadow: '0 0 8px rgba(34,197,94,0.7)',
                    transition: 'width 0.1s linear',
                  }} />
                </Box>

                {/* DOT INDICATORS */}
                <Box sx={{ display: 'flex', gap: 0.8, px: 2, py: 1.2 }}>
                  {slides.map((_, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setImgIdx(idx)}
                      sx={{
                        cursor: 'pointer', height: 3, borderRadius: 999,
                        transition: 'all 0.3s ease',
                        width: idx === imgIdx ? 24 : 8,
                        bgcolor: idx === imgIdx ? '#22C55E' : 'rgba(255,255,255,0.25)',
                        '&:hover': { bgcolor: idx === imgIdx ? '#22C55E' : 'rgba(255,255,255,0.5)' },
                      }}
                    />
                  ))}
                </Box>

                <CardContent sx={{ p: 4, pt: 1 }}>
                  <Typography sx={{ color: '#22C55E', fontWeight: 700, mb: 1 }}>
                    Premium Collection
                  </Typography>
                  <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '2rem', lineHeight: 1.2 }}>
                    {slides[imgIdx]?.name} Available
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.72)', mt: 2, lineHeight: 1.8 }}>
                    Professionally raised birds with proper nutrition, natural environment, and expert care support.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* MOBILE BOTTOM CARD — floating preview with slider */}
        <Box sx={{
          display: { xs: 'block', md: 'none' },
          position: 'relative', zIndex: 3,
          mx: 2, mb: 3, mt: -2,
        }}>
          <Box sx={{
            borderRadius: 5, overflow: 'hidden',
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(18px)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            {/* IMAGE ROW */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
              <Box
                component="img"
                src={slides[imgIdx]?.image}
                alt={slides[imgIdx]?.name}
                sx={{
                  width: 72, height: 72, borderRadius: 3,
                  objectFit: 'cover', flexShrink: 0,
                  transition: 'opacity 0.5s ease',
                }}
              />
              <Box flex={1}>
                <Typography sx={{ color: '#22C55E', fontWeight: 700, fontSize: '0.75rem', mb: 0.3 }}>
                  Premium Collection
                </Typography>
                <Typography sx={{
                  color: '#fff', fontWeight: 800, fontSize: '1rem', lineHeight: 1.2,
                  transition: 'opacity 0.4s ease',
                }}>
                  {slides[imgIdx]?.name} Available
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', mt: 0.3 }}>
                  Available now · Nationwide delivery
                </Typography>
            </Box>
            <Button
              component={Link} href="/explore"
              sx={{
                minWidth: 0, p: 1.2, borderRadius: 999, flexShrink: 0,
                bgcolor: '#22C55E',
                '&:hover': { bgcolor: '#16A34A' },
              }}
            >
              <ArrowForward sx={{ color: '#fff', fontSize: 18 }} />
            </Button>
          </Box>

          {/* PROGRESS BAR */}
          <Box sx={{ height: 3, bgcolor: 'rgba(255,255,255,0.1)', position: 'relative' }}>
            <Box sx={{
              position: 'absolute', left: 0, top: 0, height: '100%',
              width: `${progress}%`,
              bgcolor: '#22C55E',
              boxShadow: '0 0 6px rgba(34,197,94,0.7)',
              transition: 'width 0.1s linear',
            }} />
          </Box>
        </Box>
      </Box>

      </Box>{/* ── END HERO ── */}

      {/* ── FEATURES ── */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#F8FAF8', mt: { xs: 0, md: -5 }, zIndex: 5, position: 'relative' }}>
        <Container maxWidth="xl">

          {/* SECTION LABEL */}
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
            <Typography sx={{
              color: '#111827', fontWeight: 900,
              fontSize: { xs: '1.6rem', md: '2.2rem' },
              letterSpacing: '-0.02em',
            }}>
              Why Choose SN Agro?
            </Typography>
            <Typography sx={{ color: '#6B7280', mt: 1, fontSize: { xs: '0.9rem', md: '1rem' } }}>
              Everything you need for healthy, happy birds
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 2, md: 3 }}>
            {features.map((feature) => (
              <Grid size={{ xs: 6, md: 3 }} key={feature.title}>
                <Box sx={{
                  p: { xs: 2.5, md: 4 },
                  borderRadius: { xs: 4, md: 6 },
                  bgcolor: '#fff',
                  boxShadow: '0 8px 30px rgba(15,23,42,0.07)',
                  height: '100%',
                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 40px rgba(15,23,42,0.12)' },
                }}>
                  <Box sx={{
                    width: { xs: 48, md: 65 }, height: { xs: 48, md: 65 },
                    borderRadius: '50%',
                    bgcolor: 'rgba(34,197,94,0.1)', color: '#22C55E',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    mb: { xs: 2, md: 3 },
                    '& svg': { fontSize: { xs: 22, md: 28 } },
                  }}>
                    {feature.icon}
                  </Box>

                  <Typography sx={{
                    fontWeight: 800, color: '#111827',
                    mb: 0.8, fontSize: { xs: '0.88rem', md: '1.05rem' },
                    lineHeight: 1.3,
                  }}>
                    {feature.title}
                  </Typography>

                  <Typography sx={{
                    color: '#6B7280',
                    lineHeight: 1.6,
                    fontSize: { xs: '0.78rem', md: '0.9rem' },
                  }}>
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
