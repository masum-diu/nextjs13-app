'use client'

import Link from 'next/link'
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import {
  ArrowBack,
  Call,
  LocationOn,
  WhatsApp,
} from '@mui/icons-material'

const PHONE = '01715103246'

export default function ContactPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#060D08', position: 'relative', overflow: 'clip' }}>

      {/* AMBIENT GLOWS */}
      <Box sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <Box sx={{
          position: 'absolute', top: -160, left: -160,
          width: 520, height: 520, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.2), transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <Box sx={{
          position: 'absolute', bottom: -100, right: -120,
          width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,222,128,0.12), transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 4, md: 6 } }}>

        {/* BACK BUTTON */}
        <Button
          component={Link} href="/"
          startIcon={<ArrowBack sx={{ fontSize: 16 }} />}
          sx={{
            mb: 5, width: 'fit-content', color: 'rgba(255,255,255,0.6)',
            textTransform: 'none', fontSize: '0.85rem', borderRadius: 999,
            px: 2.5, py: 0.8,
            border: '1px solid rgba(255,255,255,0.10)',
            '&:hover': { color: '#fff', borderColor: 'rgba(255,255,255,0.2)', bgcolor: 'rgba(255,255,255,0.05)' },
          }}
        >
          Back to Home
        </Button>

        {/* TITLE */}
        <Box mb={{ xs: 4, md: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box sx={{
              width: 36, height: 36, borderRadius: 2,
              bgcolor: 'rgba(34,197,94,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <LocationOn sx={{ color: '#22C55E', fontSize: 20 }} />
            </Box>
            <Typography sx={{ color: '#22C55E', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Find Us
            </Typography>
          </Box>
          <Typography sx={{
            color: '#fff', fontWeight: 900, lineHeight: 1.1,
            fontSize: { xs: '2rem', md: '3rem' },
            letterSpacing: '-0.03em',
          }}>
            Our Farm Location
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', mt: 1.5, fontSize: { xs: '0.95rem', md: '1rem' } }}>
            Visit us or contact for nationwide delivery
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 3, md: 4 }}>

          {/* MAP */}
          <Box sx={{
            flex: 1,
            borderRadius: 5, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            minHeight: { xs: 280, md: 420 },
            position: 'relative',
          }}>
            <Box
              component="iframe"
              src="https://www.google.com/maps?q=Chunarchor,Savar,Dhaka,Bangladesh&output=embed"
              title="SN Agro Farm Location"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sx={{
                width: '100%', height: '100%',
                minHeight: { xs: 280, md: 420 },
                border: 0, display: 'block',
                filter: 'invert(0.9) hue-rotate(180deg)',
              }}
            />
          </Box>

          {/* INFO CARD */}
          <Box sx={{
            width: { xs: '100%', md: 320 },
            borderRadius: 5,
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            p: { xs: 3, md: 4 },
            display: 'flex', flexDirection: 'column', gap: 3,
          }}>

            {/* ADDRESS */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Box sx={{
                  width: 32, height: 32, borderRadius: '50%',
                  bgcolor: 'rgba(34,197,94,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <LocationOn sx={{ color: '#22C55E', fontSize: 16 }} />
                </Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Address
                </Typography>
              </Box>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.5 }}>
                SN Agro Farm
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.7, mt: 0.5 }}>
                Chunarchor, Savar<br />
                Dhaka-1340<br />
                Bangladesh
              </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

            {/* PHONE */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Box sx={{
                  width: 32, height: 32, borderRadius: '50%',
                  bgcolor: 'rgba(34,197,94,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Call sx={{ color: '#22C55E', fontSize: 16 }} />
                </Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Phone
                </Typography>
              </Box>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                {PHONE}
              </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

            {/* HOURS */}
            <Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', mb: 1.5 }}>
                Open Hours
              </Typography>
              <Stack spacing={0.8}>
                {[
                  { day: 'Saturday – Thursday', time: '8:00 AM – 8:00 PM' },
                  { day: 'Friday', time: '2:00 PM – 8:00 PM' },
                ].map((r) => (
                  <Box key={r.day} sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                    <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>{r.day}</Typography>
                    <Typography sx={{ color: '#22C55E', fontSize: '0.82rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{r.time}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

            {/* BUTTONS */}
            <Stack spacing={1.5}>
              <Button
                component="a"
                href={`tel:${PHONE}`}
                startIcon={<Call />}
                fullWidth
                sx={{
                  bgcolor: '#22C55E', color: '#fff',
                  py: 1.5, borderRadius: 999,
                  fontWeight: 700, textTransform: 'none', fontSize: '0.95rem',
                  '&:hover': { bgcolor: '#16A34A' },
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
                  bgcolor: 'rgba(37,211,102,0.15)',
                  color: '#25D366',
                  border: '1px solid rgba(37,211,102,0.3)',
                  py: 1.5, borderRadius: 999,
                  fontWeight: 700, textTransform: 'none', fontSize: '0.95rem',
                  '&:hover': { bgcolor: 'rgba(37,211,102,0.25)' },
                }}
              >
                WhatsApp
              </Button>
            </Stack>

          </Box>
        </Stack>

      </Container>
    </Box>
  )
}
