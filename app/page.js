'use client'

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
} from '@mui/icons-material'

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

export default function Home() {
  return (
    <Box sx={{ bgcolor: '#F8FAF8' }}>
      {/* HERO SECTION */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* YOUTUBE VIDEO BACKGROUND */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            zIndex: 0,
          }}
        >
          <Box
            component="iframe"
            src="https://www.youtube.com/embed/7X-5_NWQ_Dc?autoplay=1&mute=1&controls=0&loop=1&playlist=7X-5_NWQ_Dc&modestbranding=1&rel=0&showinfo=0"
            title="Bird Farm Video"
            allow="autoplay; encrypted-media"
            allowFullScreen
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: {
                xs: '400vw',
                sm: '250vw',
                md: '170vw',
                lg: '120vw',
              },
              height: {
                xs: '120vh',
                md: '130vh',
              },
              transform: 'translate(-50%, -50%) scale(1.15)',
              border: 0,
              pointerEvents: 'none',
              filter: 'brightness(0.65) contrast(1.1) saturate(1.1)',
            }}
          />

          {/* PREMIUM OVERLAY */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: `
                linear-gradient(
                  90deg,
                  rgba(0,0,0,0.78) 0%,
                  rgba(0,0,0,0.38) 40%,
                  rgba(0,0,0,0.38) 60%,
                  rgba(0,0,0,0.78) 100%
                )
              `,
            }}
          />

          {/* TOP SHADOW */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 180,
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)',
            }}
          />

          {/* BOTTOM SHADOW */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 260,
              background:
                'linear-gradient(to top, rgba(248,250,248,1), transparent)',
            }}
          />

          {/* LEFT GREEN GLOW */}
          <Box
            sx={{
              position: 'absolute',
              top: '-10%',
              left: '-10%',
              width: 500,
              height: 500,
              borderRadius: '50%',
              background: 'rgba(34,197,94,0.25)',
              filter: 'blur(120px)',
            }}
          />

          {/* RIGHT GREEN GLOW */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '-15%',
              right: '-10%',
              width: 500,
              height: 500,
              borderRadius: '50%',
              background: 'rgba(74,222,128,0.20)',
              filter: 'blur(140px)',
            }}
          />
        </Box>

        {/* CONTENT */}
        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',
            zIndex: 2,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Grid container spacing={5} alignItems="center">
            {/* LEFT SIDE */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={4}>
                {/* BADGES */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    flexWrap: 'wrap',
                  }}
                >
                  <Chip
                    icon={<Pets sx={{ color: '#22C55E !important' }} />}
                    label="SN Agro Farm"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.14)',
                      color: '#fff',
                      fontWeight: 700,
                      border: '1px solid rgba(255,255,255,0.22)',
                      backdropFilter: 'blur(10px)',
                    }}
                  />

                  <Chip
                    icon={<Star sx={{ color: '#FACC15 !important' }} />}
                    label="Premium Birds"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.14)',
                      color: '#fff',
                      fontWeight: 700,
                      border: '1px solid rgba(255,255,255,0.22)',
                      backdropFilter: 'blur(10px)',
                    }}
                  />
                </Box>

                {/* HEADING */}
                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    fontSize: {
                      xs: '2.8rem',
                      sm: '4rem',
                      md: '6rem',
                    },
                    maxWidth: 850,
                    textShadow: '0 10px 40px rgba(0,0,0,0.35)',
                  }}
                >
                  Healthy Birds
                  <br />
                  Raised With
                  <br />
                  Natural Care
                </Typography>

                {/* DESCRIPTION */}
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.82)',
                    fontSize: {
                      xs: '1rem',
                      md: '1.15rem',
                    },
                    lineHeight: 1.9,
                    maxWidth: 620,
                  }}
                >
                  Premium Emo Pakhi, OT Pakhi and exotic birds directly from
                  trusted SN Agro farm with nationwide delivery and complete
                  care support.
                </Typography>

                {/* BUTTONS */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                >
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    sx={{
                      bgcolor: '#22C55E',
                      color: '#fff',
                      px: 4,
                      py: 1.8,
                      borderRadius: '999px',
                      fontSize: '1rem',
                      fontWeight: 700,
                      textTransform: 'none',
                      boxShadow: '0 12px 30px rgba(34,197,94,0.35)',

                      '&:hover': {
                        bgcolor: '#16A34A',
                      },
                    }}
                  >
                    Explore Birds
                  </Button>

                  <Button
                    startIcon={<PlayArrow />}
                    sx={{
                      color: '#fff',
                      px: 3,
                      py: 1.8,
                      borderRadius: '999px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      backdropFilter: 'blur(10px)',
                      bgcolor: 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.18)',

                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.18)',
                      },
                    }}
                  >
                    Watch Farm Video
                  </Button>
                </Stack>

                {/* STATS */}
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    pt: 2,
                  }}
                >
                  {[
                    {
                      value: '5000+',
                      label: 'Birds Sold',
                    },
                    {
                      value: '10+',
                      label: 'Years Experience',
                    },
                    {
                      value: '98%',
                      label: 'Happy Clients',
                    },
                  ].map((item) => (
                    <Box
                      key={item.label}
                      sx={{
                        px: 3,
                        py: 2,
                        borderRadius: 4,
                        bgcolor: 'rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.16)',
                        minWidth: 140,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#22C55E',
                          fontWeight: 900,
                          fontSize: '1.7rem',
                        }}
                      >
                        {item.value}
                      </Typography>

                      <Typography
                        sx={{
                          color: 'rgba(255,255,255,0.72)',
                          fontSize: '0.9rem',
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Stack>
            </Grid>

            {/* RIGHT SIDE */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Card
                sx={{
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  boxShadow: '0 25px 80px rgba(0,0,0,0.35)',
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=1200&auto=format&fit=crop"
                  alt="Bird"
                  sx={{
                    width: '100%',
                    height: 320,
                    objectFit: 'cover',
                  }}
                />

                <CardContent sx={{ p: 4 }}>
                  <Typography
                    sx={{
                      color: '#22C55E',
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    Premium Collection
                  </Typography>

                  <Typography
                    sx={{
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '2rem',
                      lineHeight: 1.2,
                    }}
                  >
                    Exotic Healthy Birds Available
                  </Typography>

                  <Typography
                    sx={{
                      color: 'rgba(255,255,255,0.72)',
                      mt: 2,
                      lineHeight: 1.8,
                    }}
                  >
                    Professionally raised birds with proper nutrition, natural
                    environment, and expert care support.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FEATURES SECTION */}
      <Box
        sx={{
          py: 10,
          position: 'relative',
          mt: -5,
          zIndex: 5,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {features.map((feature) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 3 }}
                key={feature.title}
              >
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 6,
                    bgcolor: '#fff',
                    boxShadow: '0 15px 50px rgba(15,23,42,0.08)',
                    transition: '0.3s',

                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 65,
                      height: 65,
                      borderRadius: '50%',
                      bgcolor: 'rgba(34,197,94,0.1)',
                      color: '#22C55E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    {feature.icon}
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: 800,
                      color: '#111827',
                      mb: 1,
                      fontSize: '1.05rem',
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: '#6B7280',
                      lineHeight: 1.7,
                    }}
                  >
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