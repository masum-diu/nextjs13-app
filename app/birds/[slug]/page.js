'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material'
import {
  ArrowBack,
  ArrowForward,
  Close,
  ContentCopy,
  LocalShipping,
  PhoneInTalk,
  Shield,
  Star,
  Verified,
  WhatsApp,
} from '@mui/icons-material'
import BirdGalleryClient from './BirdGalleryClient'

const PHONE = '01715103246'

const BADGE_COLORS = {
  'Best Seller': { bg: '#22C55E', text: '#fff' },
  Premium:       { bg: '#A78BFA', text: '#fff' },
  Rare:          { bg: '#F59E0B', text: '#000' },
  Popular:       { bg: '#38BDF8', text: '#000' },
  New:           { bg: '#FB923C', text: '#fff' },
  'Farm Pick':   { bg: '#34D399', text: '#000' },
  Care:          { bg: '#F472B6', text: '#fff' },
}

export default function BirdDetailsPage({ params }) {
  const slug = params?.slug

  const [bird,          setBird]          = useState(null)
  const [suggestedBirds, setSuggested]   = useState([])
  const [pageLoading,   setPageLoading]   = useState(true)
  const [notFound,      setNotFound]      = useState(false)
  const [contactOpen,   setContactOpen]   = useState(false)
  const [copied,        setCopied]        = useState(false)

  useEffect(() => {
    if (!slug) return
    Promise.all([
      fetch(`/api/birds/slug/${slug}`).then((r) => r.json()),
      fetch('/api/birds').then((r) => r.json()),
    ]).then(([birdData, allData]) => {
      if (birdData.error || !birdData.bird) { setNotFound(true); return }
      setBird(birdData.bird)
      const others = (allData.birds || []).filter((b) => b.slug !== slug).slice(0, 3)
      setSuggested(others)
    }).finally(() => setPageLoading(false))
  }, [slug])

  const handleCopy = () => {
    navigator.clipboard.writeText(PHONE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (pageLoading) return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#060D08', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress sx={{ color: '#22C55E' }} />
    </Box>
  )

  if (notFound) return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#060D08', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.5rem' }}>Bird Not Found</Typography>
      <Button component={Link} href="/explore" sx={{ color: '#22C55E', textTransform: 'none' }}>← Back to Explore</Button>
    </Box>
  )

  const galleryImages  = bird.images?.length ? bird.images : [bird.image]
  const badge          = BADGE_COLORS[bird.badge] ?? { bg: '#22C55E', text: '#fff' }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#060D08', position: 'relative', overflow: 'clip' }}>

      {/* AMBIENT GLOWS */}
      <Box sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <Box sx={{
          position: 'absolute', top: -100, left: -100,
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.18), transparent 70%)',
          filter: 'blur(70px)',
        }} />
        <Box sx={{
          position: 'absolute', bottom: -150, right: -100,
          width: 450, height: 450, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,222,128,0.12), transparent 70%)',
          filter: 'blur(90px)',
        }} />
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, py: { xs: 4, md: 6 } }}>

        {/* BACK BUTTON */}
        <Button
          component={Link}
          href="/explore"
          startIcon={<ArrowBack sx={{ fontSize: 15 }} />}
          sx={{
            mb: 5, width: 'fit-content',
            color: 'rgba(255,255,255,0.6)',
            textTransform: 'none', fontSize: '0.85rem',
            borderRadius: 999, px: 2.5, py: 0.8,
            border: '1px solid rgba(255,255,255,0.10)',
            '&:hover': { color: '#fff', borderColor: 'rgba(255,255,255,0.2)', bgcolor: 'rgba(255,255,255,0.05)' },
          }}
        >
          Back to Explore
        </Button>

        {/* MAIN SECTION */}
        <Grid container spacing={{ xs: 3, md: 5 }} alignItems="flex-start">

          {/* LEFT — GALLERY */}
          <Grid size={{ xs: 12, md: 7 }}>
            <BirdGalleryClient images={galleryImages} birdName={bird.name} />
          </Grid>

          {/* RIGHT — DETAILS */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: { md: 'sticky' }, top: 24 }}>

              {/* BADGE + RATING */}
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2.5}>
                <Box sx={{
                  px: 1.8, py: 0.5, borderRadius: 999,
                  bgcolor: badge.bg, color: badge.text,
                  fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em',
                }}>
                  {bird.badge}
                </Box>

                <Stack direction="row" alignItems="center" spacing={0.8}
                  sx={{
                    px: 1.8, py: 0.6, borderRadius: 999,
                    bgcolor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                  }}
                >
                  <Star sx={{ color: '#FACC15', fontSize: 16 }} />
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.88rem' }}>
                    {bird.rating}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
                    ({bird.reviews} reviews)
                  </Typography>
                </Stack>
              </Stack>

              {/* NAME */}
              <Typography sx={{
                color: '#fff', fontWeight: 900, lineHeight: 1.1,
                letterSpacing: '-0.03em',
                fontSize: { xs: '2.4rem', md: '3rem' },
                mb: 0.8,
              }}>
                {bird.name}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={0.8} mb={3}>
                <Verified sx={{ color: '#22C55E', fontSize: 16 }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                  {bird.origin}
                </Typography>
              </Stack>

              {/* AVAILABILITY */}
              <Box sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1.2,
                px: 2, py: 1, borderRadius: 3, mb: 3,
                bgcolor: 'rgba(34,197,94,0.10)',
                border: '1px solid rgba(34,197,94,0.25)',
              }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
                <Typography sx={{ color: '#22C55E', fontWeight: 700, fontSize: '0.88rem' }}>
                  Available Now
                </Typography>
              </Box>

              {/* DESCRIPTION */}
              <Typography sx={{
                color: 'rgba(255,255,255,0.65)', lineHeight: 1.9,
                fontSize: '0.95rem', mb: 3,
              }}>
                {bird.description}
              </Typography>

              {/* FEATURES */}
              <Box mb={3.5}>
                <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', mb: 1.5 }}>
                  Features
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {bird.features.map((f) => (
                    <Box key={f} sx={{
                      px: 1.8, py: 0.7, borderRadius: 999,
                      bgcolor: 'rgba(34,197,94,0.08)',
                      border: '1px solid rgba(34,197,94,0.22)',
                      color: '#86EFAC', fontSize: '0.82rem', fontWeight: 600,
                    }}>
                      {f}
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* DIVIDER */}
              <Box sx={{ height: 1, bgcolor: 'rgba(255,255,255,0.07)', mb: 3 }} />

              {/* GUARANTEES */}
              <Stack spacing={1.5} mb={4}>
                {[
                  { icon: <LocalShipping sx={{ color: '#22C55E', fontSize: 17 }} />, text: 'Safe nationwide delivery' },
                  { icon: <Shield sx={{ color: '#22C55E', fontSize: 17 }} />, text: '7-day health guarantee included' },
                ].map((item) => (
                  <Stack key={item.text} direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{
                      width: 32, height: 32, borderRadius: 2, flexShrink: 0,
                      bgcolor: 'rgba(34,197,94,0.10)',
                      border: '1px solid rgba(34,197,94,0.20)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {item.icon}
                    </Box>
                    <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem' }}>
                      {item.text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              {/* CTA BUTTON */}
              <Button
                onClick={() => setContactOpen(true)}
                startIcon={<PhoneInTalk />}
                fullWidth
                sx={{
                  py: 1.8, borderRadius: 999,
                  textTransform: 'none', fontWeight: 800,
                  fontSize: '1rem', color: '#fff',
                  background: 'linear-gradient(90deg, #16A34A, #22C55E)',
                  boxShadow: '0 10px 30px rgba(34,197,94,0.30)',
                  '&:hover': {
                    boxShadow: '0 14px 36px rgba(34,197,94,0.45)',
                    transform: 'translateY(-1px)',
                  },
                  transition: '0.25s',
                }}
              >
                Contact for Price
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* SUGGESTED SECTION */}
        <Box mt={10}>
          <Stack direction="row" alignItems="center" spacing={2} mb={4}>
            <Box sx={{ height: 28, width: 4, borderRadius: 99, bgcolor: '#22C55E', boxShadow: '0 0 10px #22C55E' }} />
            <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>
              More Birds
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            {suggestedBirds.map((item) => {
              const b = BADGE_COLORS[item.badge] ?? { bg: '#22C55E', text: '#fff' }
              return (
                <Grid size={{ xs: 12, sm: 4 }} key={item.slug}>
                  <Box
                    component={Link}
                    href={`/birds/${item.slug}`}
                    sx={{
                      display: 'block', textDecoration: 'none',
                      borderRadius: 5, overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.08)',
                      bgcolor: 'rgba(255,255,255,0.04)',
                      backdropFilter: 'blur(12px)',
                      transition: '0.3s',
                      '&:hover': {
                        border: '1px solid rgba(34,197,94,0.3)',
                        transform: 'translateY(-6px)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{ width: '100%', height: 160, objectFit: 'cover', display: 'block', transition: '0.5s', '&:hover': { transform: 'scale(1.06)' } }}
                      />
                      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,13,8,0.85), transparent)' }} />
                      <Box sx={{
                        position: 'absolute', top: 12, left: 12,
                        px: 1.4, py: 0.4, borderRadius: 999,
                        bgcolor: b.bg, color: b.text,
                        fontSize: '0.68rem', fontWeight: 800,
                      }}>
                        {item.badge}
                      </Box>
                    </Box>

                    <Box sx={{ p: 2.5 }}>
                      <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1rem', mb: 0.3 }}>
                        {item.name}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', mb: 1.5 }}>
                        {item.origin}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: '#22C55E' }}>
                        <Typography sx={{ fontSize: '0.82rem', fontWeight: 700 }}>View Details</Typography>
                        <ArrowForward sx={{ fontSize: 14 }} />
                      </Stack>
                    </Box>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        </Box>

      </Container>

      {/* CONTACT MODAL */}
      <Modal open={contactOpen} onClose={() => setContactOpen(false)}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 },
          bgcolor: '#0A160D',
          border: '1px solid rgba(34,197,94,0.2)',
          borderRadius: 5,
          boxShadow: '0 0 0 1px rgba(34,197,94,0.08), 0 40px 80px rgba(0,0,0,0.6)',
          outline: 'none',
          overflow: 'hidden',
        }}>
          {/* TOP GLOW */}
          <Box sx={{
            position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
            width: 260, height: 160, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,197,94,0.2), transparent 70%)',
            filter: 'blur(30px)', pointerEvents: 'none',
          }} />

          {/* HEADER */}
          <Box sx={{ px: 3, pt: 3, pb: 2.5, borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
            <Stack direction="row" alignItems="center" sx={{justifyContent:"space-between"}}>
              <Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', mb: 0.3 }}>
                  SN Agro Farm
                </Typography>
                <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '1.15rem', letterSpacing: '-0.02em' }}>
                  Contact for Price
                </Typography>
              </Box>
              <IconButton
                onClick={() => setContactOpen(false)}
                sx={{
                  width: 32, height: 32,
                  bgcolor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.5)',
                  '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.12)' },
                }}
              >
                <Close sx={{ fontSize: 15 }} />
              </IconButton>
            </Stack>
          </Box>

          {/* BODY */}
          <Box sx={{ px: 3, py: 3 }}>
            {/* BIRD NAME */}
            <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', mb: 2 }}>
              Enquiry about{' '}
              <Box component="span" sx={{ color: '#22C55E', fontWeight: 700 }}>{bird.name}</Box>
            </Typography>

            {/* PHONE DISPLAY */}
            <Box sx={{
              px: 2.5, py: 2, borderRadius: 4, mb: 3,
              bgcolor: 'rgba(34,197,94,0.07)',
              border: '1px solid rgba(34,197,94,0.2)',
            }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', mb: 0.5 }}>
                Phone Number
              </Typography>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '0.05em' }}>
                  {PHONE}
                </Typography>
                <IconButton
                  onClick={handleCopy}
                  size="small"
                  sx={{
                    color: copied ? '#22C55E' : 'rgba(255,255,255,0.4)',
                    '&:hover': { color: '#22C55E' },
                    transition: '0.2s',
                  }}
                >
                  <ContentCopy sx={{ fontSize: 18 }} />
                </IconButton>
              </Stack>
              {copied && (
                <Typography sx={{ color: '#22C55E', fontSize: '0.72rem', fontWeight: 600, mt: 0.5 }}>
                  Copied!
                </Typography>
              )}
            </Box>

            {/* ACTION BUTTONS */}
            <Stack spacing={1.5}>
              <Button
                component="a"
                href={`tel:${PHONE}`}
                startIcon={<PhoneInTalk />}
                fullWidth
                sx={{
                  py: 1.5, borderRadius: 999,
                  textTransform: 'none', fontWeight: 700, fontSize: '0.95rem',
                  color: '#fff',
                  background: 'linear-gradient(90deg, #16A34A, #22C55E)',
                  boxShadow: '0 8px 24px rgba(34,197,94,0.25)',
                  '&:hover': { boxShadow: '0 12px 32px rgba(34,197,94,0.4)' },
                }}
              >
                Call Now
              </Button>

              <Button
                component="a"
                href={`https://wa.me/88${PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<WhatsApp />}
                fullWidth
                sx={{
                  py: 1.5, borderRadius: 999,
                  textTransform: 'none', fontWeight: 700, fontSize: '0.95rem',
                  color: '#fff',
                  bgcolor: 'rgba(37,211,102,0.12)',
                  border: '1px solid rgba(37,211,102,0.25)',
                  '&:hover': { bgcolor: 'rgba(37,211,102,0.2)' },
                }}
              >
                WhatsApp
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>

    </Box>
  )
}
