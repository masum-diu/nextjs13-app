'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material'
import {
  ArrowBack,
  Close,
  PlayCircle,
  Videocam,
} from '@mui/icons-material'

const VIDEOS = [
  {
    id: '7X-5_NWQ_Dc',
    title: 'SN Agro Farm Tour',
    desc: 'Full video tour of our premium bird farm facility',
    tag: 'Farm Tour',
  },
  {
    id: 'kgRtl0DRSOM',
    title: 'Emo Pakhi Care Guide',
    desc: 'Proper care, feeding and handling guide for Emo Pakhi',
    tag: 'Care Guide',
  },
  {
    id: 'Y6aEjE18fRQ',
    title: 'OT Pakhi Breeding',
    desc: 'Breeding process and expert tips for OT Pakhi',
    tag: 'Breeding',
  },
  {
    id: 'yOEh0VQ0Ths',
    title: 'Bird Health Tips',
    desc: 'Essential tips to keep your birds healthy and active',
    tag: 'Health',
  },
  {
    id: 'aqz-KE-bpKQ',
    title: 'Premium Bird Collection',
    desc: 'Showcasing our exclusive premium bird collection',
    tag: 'Collection',
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'Feeding & Nutrition',
    desc: 'Complete guide to proper bird diet and nutrition',
    tag: 'Nutrition',
  },
  {
    id: 'JGwWNGJdvx8',
    title: 'Chick Development',
    desc: 'How we raise and care for baby birds at SN Agro',
    tag: 'Chick Care',
  },
  {
    id: 'GRc-tEeaIkM',
    title: 'Farm Daily Routine',
    desc: 'A look at our daily farm management and operations',
    tag: 'Farm Life',
  },
  {
    id: 'fJ9rUzIMcZQ',
    title: 'Rare Bird Showcase',
    desc: 'Meet our rare and exotic bird species collection',
    tag: 'Rare Birds',
  },
  {
    id: 'CevxZvSJLk8',
    title: 'Vaccination Guide',
    desc: 'Step-by-step guide to proper bird vaccination',
    tag: 'Health',
  },
  {
    id: 'kXYiU_JCYtU',
    title: 'Cage Setup Tips',
    desc: 'How to build and set up the perfect bird cage',
    tag: 'Setup',
  },
  {
    id: 'M7lc1UVf-VE',
    title: 'SN Agro Success Story',
    desc: 'The journey and story behind SN Agro Farm',
    tag: 'Story',
  },
]

const TAG_COLORS = {
  'Farm Tour':  '#22C55E',
  'Care Guide': '#A78BFA',
  Breeding:     '#F59E0B',
  Health:       '#38BDF8',
  Collection:   '#FB923C',
  Nutrition:    '#34D399',
  'Chick Care': '#F472B6',
  'Farm Life':  '#22C55E',
  'Rare Birds': '#F59E0B',
  Setup:        '#38BDF8',
  Story:        '#A78BFA',
}

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#060D08', position: 'relative', overflow: 'clip' }}>

      {/* AMBIENT GLOWS */}
      <Box sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <Box sx={{
          position: 'absolute', top: -160, left: -160,
          width: 520, height: 520, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.2), transparent 70%)',
          filter: 'blur(70px)',
        }} />
        <Box sx={{
          position: 'absolute', bottom: -160, right: -120,
          width: 460, height: 460, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,222,128,0.13), transparent 70%)',
          filter: 'blur(90px)',
        }} />
        <Box sx={{
          position: 'absolute', top: '40%', right: '15%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.07), transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, py: { xs: 4, md: 6 } }}>

        {/* BACK */}
        <Button
          component={Link} href="/"
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
          Back to Home
        </Button>

        {/* HEADER */}
        <Box mb={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box sx={{
              width: 36, height: 36, borderRadius: 2,
              bgcolor: 'rgba(34,197,94,0.15)',
              border: '1px solid rgba(34,197,94,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Videocam sx={{ color: '#22C55E', fontSize: 18 }} />
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              SN Agro · Farm Videos
            </Typography>
          </Box>

          <Typography sx={{
            color: '#fff', fontWeight: 900, lineHeight: 1.05,
            letterSpacing: '-0.04em',
            fontSize: { xs: '2.8rem', sm: '3.8rem', md: '5rem' },
          }}>
            Watch Our
            <Box component="span" sx={{
              display: 'block',
              background: 'linear-gradient(90deg, #22C55E 0%, #86EFAC 50%, #4ADE80 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Farm Videos
            </Box>
          </Typography>

          <Typography sx={{ color: 'rgba(255,255,255,0.5)', mt: 2, fontSize: '0.95rem', maxWidth: 560, lineHeight: 1.8 }}>
            Watch our bird farming, care, breeding and farm life videos from SN Agro Farm.
          </Typography>
        </Box>

        {/* VIDEO GRID */}
        <Grid container spacing={3}>
          {VIDEOS.map((video, idx) => {
            const tagColor = TAG_COLORS[video.tag] ?? '#22C55E'
            const thumb    = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
            return (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={video.id}>
                <Box
                  onClick={() => setActiveVideo(video)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: 5, overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.07)',
                    bgcolor: 'rgba(255,255,255,0.04)',
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      border: '1px solid rgba(34,197,94,0.3)',
                      boxShadow: '0 0 0 1px rgba(34,197,94,0.12), 0 28px 56px rgba(0,0,0,0.45)',
                    },
                    '&:hover .play-icon': { transform: 'scale(1.15)', opacity: 1 },
                    '&:hover .thumb': { transform: 'scale(1.06)' },
                  }}
                >
                  {/* THUMBNAIL */}
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <Box
                      className="thumb"
                      component="img"
                      src={thumb}
                      alt={video.title}
                      sx={{
                        width: '100%', height: 200,
                        objectFit: 'cover', display: 'block',
                        transition: '0.5s ease',
                      }}
                    />
                    {/* OVERLAY */}
                    <Box sx={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(6,13,8,0.85) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)',
                    }} />

                    {/* PLAY ICON */}
                    <Box
                      className="play-icon"
                      sx={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%) scale(1)',
                        opacity: 0.85, transition: '0.3s ease',
                      }}
                    >
                      <PlayCircle sx={{ color: '#fff', fontSize: 54, filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.6))' }} />
                    </Box>

                    {/* TAG */}
                    <Box sx={{
                      position: 'absolute', top: 12, left: 12,
                      px: 1.4, py: 0.4, borderRadius: 999,
                      bgcolor: tagColor, color: '#000',
                      fontSize: '0.68rem', fontWeight: 800,
                    }}>
                      {video.tag}
                    </Box>

                    {/* INDEX */}
                    <Box sx={{
                      position: 'absolute', top: 12, right: 12,
                      width: 28, height: 28, borderRadius: '50%',
                      bgcolor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', fontWeight: 700,
                    }}>
                      {String(idx + 1).padStart(2, '0')}
                    </Box>
                  </Box>

                  {/* CONTENT */}
                  <Box sx={{ p: 2.5 }}>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1rem', mb: 0.5, lineHeight: 1.3 }}>
                      {video.title}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                      {video.desc}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Container>

      {/* VIDEO PLAYER MODAL */}
      <Modal open={!!activeVideo} onClose={() => setActiveVideo(null)}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '80%', md: '70%' },
          maxWidth: 900,
          bgcolor: '#0A160D',
          border: '1px solid rgba(34,197,94,0.2)',
          borderRadius: 5,
          boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
          outline: 'none',
          overflow: 'hidden',
        }}>
          {/* MODAL HEADER */}
          <Stack direction="row" alignItems="center"
            sx={{ px: 2.5, py: 2, borderBottom: '1px solid rgba(255,255,255,0.07)', justifyContent: 'space-between' }}
          >
            <Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                SN Agro Farm
              </Typography>
              <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1rem', mt: 0.3 }}>
                {activeVideo?.title}
              </Typography>
            </Box>
            <IconButton
              onClick={() => setActiveVideo(null)}
              sx={{
                width: 34, height: 34,
                bgcolor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.6)',
                '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.12)' },
              }}
            >
              <Close sx={{ fontSize: 16 }} />
            </IconButton>
          </Stack>

          {/* IFRAME */}
          {activeVideo && (
            <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
              <Box
                component="iframe"
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                sx={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%', border: 0,
                }}
              />
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  )
}
