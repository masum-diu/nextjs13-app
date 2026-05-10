'use client'

import { useMemo, useState, useCallback, useEffect } from 'react'
import Link from 'next/link'

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'

import {
  ArrowBack,
  ArrowForward,
  Close,
  FilterList,
  Star,
  Verified,
  GridView,
} from '@mui/icons-material'

import { CATEGORY_TREE, matchesCatalogFilter } from '../lib/catalog'

const BADGE_COLORS = {
  'Best Seller': { bg: '#22C55E', text: '#fff' },
  Premium:       { bg: '#A78BFA', text: '#fff' },
  Rare:          { bg: '#F59E0B', text: '#000' },
  Popular:       { bg: '#38BDF8', text: '#000' },
  New:           { bg: '#FB923C', text: '#fff' },
  'Farm Pick':   { bg: '#34D399', text: '#000' },
  Care:          { bg: '#F472B6', text: '#fff' },
}

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeSub, setActiveSub]           = useState(null)
  const [drawerOpen, setDrawerOpen]         = useState(false)
  const [birds,     setBirds]               = useState([])
  const [birdLoading, setBirdLoading]       = useState(true)

  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  useEffect(() => {
    fetch('/api/birds')
      .then((r) => r.json())
      .then((d) => setBirds(d.birds || []))
      .finally(() => setBirdLoading(false))
  }, [])

  const filteredBirds = useMemo(
    () => birds.filter((b) => matchesCatalogFilter(b, activeCategory, activeSub)),
    [birds, activeCategory, activeSub],
  )

  const countFor = (catId, subId = null) =>
    birds.filter((b) => matchesCatalogFilter(b, catId, subId)).length

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#060D08',
        position: 'relative',
        overflow: 'clip',
      }}
    >
      {/* ── AMBIENT GLOWS ── */}
      <Box sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <Box sx={{
          position: 'absolute', top: -160, left: -160,
          width: 520, height: 520, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.22), transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <Box sx={{
          position: 'absolute', bottom: -160, right: -120,
          width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,222,128,0.15), transparent 70%)',
          filter: 'blur(80px)',
        }} />
        <Box sx={{
          position: 'absolute', top: '40%', right: '20%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.08), transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, py: { xs: 4, md: 6 } }}>

        {/* ── HEADER ── */}
        <Box mb={6}>
          <Button
            component={Link} href="/"
            startIcon={<ArrowBack sx={{ fontSize: 16 }} />}
            sx={{
              mb: 4, width: 'fit-content', color: 'rgba(255,255,255,0.6)',
              textTransform: 'none', fontSize: '0.85rem', borderRadius: 999,
              px: 2.5, py: 0.8,
              border: '1px solid rgba(255,255,255,0.10)',
              '&:hover': { color: '#fff', borderColor: 'rgba(255,255,255,0.2)', bgcolor: 'rgba(255,255,255,0.05)' },
            }}
          >
            Back to Home
          </Button>

          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'flex-end' }} spacing={3}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={{
                  width: 36, height: 36, borderRadius: 2,
                  bgcolor: 'rgba(34,197,94,0.15)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <GridView sx={{ color: '#22C55E', fontSize: 18 }} />
                </Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  SN Agro · Premium Collection
                </Typography>
              </Box>

              <Typography sx={{
                color: '#fff', fontWeight: 900, lineHeight: 1.05,
                letterSpacing: '-0.04em',
                fontSize: { xs: '2.8rem', sm: '3.8rem', md: '5.5rem' },
              }}>
                Explore
                <Box component="span" sx={{
                  display: 'block',
                  background: 'linear-gradient(90deg, #22C55E 0%, #86EFAC 50%, #4ADE80 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Exotic Birds
                </Box>
              </Typography>
            </Box>

            {/* STATS STRIP */}
            {/* <Stack direction="row" spacing={2} flexShrink={0} >
              {[
                { value: birds.length, label: 'Total Birds' },
                { value: CATEGORY_TREE.length, label: 'Categories' },
                { value: filteredBirds.length, label: 'Showing' },
              ].map((s) => (
                <Box key={s.label} sx={{
                  px: 3, py: 2, borderRadius: 4,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  textAlign: 'center', minWidth: 90,
                }}>
                  <Typography sx={{ color: '#22C55E', fontWeight: 900, fontSize: '1.6rem', lineHeight: 1 }}>
                    {s.value}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', mt: 0.5 }}>
                    {s.label}
                  </Typography>
                </Box>
              ))}
            </Stack> */}
          </Stack>
        </Box>

        {/* ── MAIN LAYOUT ── */}
        <Grid container spacing={4} alignItems="flex-start">

          {/* ── SIDEBAR (desktop only) ── */}
          <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{
              position: 'sticky', top: 24,
              maxHeight: 'calc(100vh - 48px)',
              overflowY: 'auto',
              borderRadius: 5,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
              p: 2.5,
              '&::-webkit-scrollbar': { width: 4 },
              '&::-webkit-scrollbar-track': { background: 'transparent' },
              '&::-webkit-scrollbar-thumb': { background: 'rgba(34,197,94,0.3)', borderRadius: 99 },
            }}>
              <FilterContent
                activeCategory={activeCategory}
                activeSub={activeSub}
                setActiveCategory={setActiveCategory}
                setActiveSub={setActiveSub}
                countFor={countFor}
                totalCount={birds.length}
              />
            </Box>
          </Grid>

          {/* ── MOBILE DRAWER ── */}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={closeDrawer}
            sx={{
              '& .MuiDrawer-paper': {
                width: 285,
                backgroundColor: '#060D08',
                backgroundImage: 'none',
                color: '#fff',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              },
            }}
          >
            {/* TOP GLOW */}
            <Box sx={{
              position: 'absolute', top: -80, left: -80,
              width: 220, height: 220, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(34,197,94,0.25), transparent 70%)',
              filter: 'blur(40px)', pointerEvents: 'none',
            }} />

            {/* HEADER */}
            <Box sx={{
              px: 3, pt: 3, pb: 2.5,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              position: 'relative',
            }}>
              <Stack direction="row" alignItems="center" sx={{ justifyContent: 'space-between', width: '100%' }}>
                <Box>
                  <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', mb: 0.5 }}>
                    SN Agro
                  </Typography>
                  <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '1.3rem', lineHeight: 1, letterSpacing: '-0.02em' }}>
                    Categories
                  </Typography>
                </Box>
                <IconButton
                  onClick={closeDrawer}
                  sx={{
                    width: 34, height: 34,
                    bgcolor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.5)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', color: '#fff' },
                  }}
                >
                  <Close sx={{ fontSize: 16 }} />
                </IconButton>
              </Stack>

              {/* ACTIVE FILTER PILL */}
              {activeCategory && (
                <Box sx={{
                  mt: 2, display: 'inline-flex', alignItems: 'center', gap: 1,
                  px: 1.5, py: 0.6, borderRadius: 999,
                  bgcolor: 'rgba(34,197,94,0.12)',
                  border: '1px solid rgba(34,197,94,0.25)',
                }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#22C55E', boxShadow: '0 0 6px #22C55E' }} />
                  <Typography sx={{ color: '#22C55E', fontSize: '0.75rem', fontWeight: 700 }}>
                    {CATEGORY_TREE.find(c => c.id === activeCategory)?.label}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* SCROLL AREA */}
            <Box sx={{
              flex: 1, overflowY: 'auto', px: 2, py: 2.5,
              '&::-webkit-scrollbar': { width: 3 },
              '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(34,197,94,0.3)', borderRadius: 99 },
            }}>
              <FilterContent
                activeCategory={activeCategory}
                activeSub={activeSub}
                setActiveCategory={(v) => { setActiveCategory(v); if (v === null) closeDrawer() }}
                setActiveSub={(v) => { setActiveSub(v); if (v !== null) closeDrawer() }}
                countFor={countFor}
                totalCount={birds.length}
              />
            </Box>

            {/* FOOTER */}
            <Box sx={{ px: 2.5, py: 2, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <Button
                fullWidth
                onClick={() => { setActiveCategory(null); setActiveSub(null); closeDrawer() }}
                sx={{
                  textTransform: 'none', borderRadius: 999,
                  py: 1.2, fontWeight: 700, fontSize: '0.88rem',
                  color: activeCategory ? '#060D08' : 'rgba(255,255,255,0.4)',
                  bgcolor: activeCategory ? '#22C55E' : 'rgba(255,255,255,0.05)',
                  border: activeCategory ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  '&:hover': { bgcolor: activeCategory ? '#16A34A' : 'rgba(255,255,255,0.08)' },
                  transition: '0.2s',
                }}
              >
                {activeCategory ? 'Clear Filter' : 'All Categories'}
              </Button>
            </Box>
          </Drawer>

          {/* ── PRODUCTS ── */}
          <Grid size={{ xs: 12, md: 9 }}>

            {/* TOPBAR */}
            <Box sx={{
              mb: 4, px: 3, py: 2, borderRadius: 4,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap',
            }}>
              {/* MOBILE FILTER BUTTON */}
              <Button
                onClick={() => setDrawerOpen(true)}
                startIcon={<FilterList sx={{ fontSize: 16 }} />}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  textTransform: 'none', color: '#fff', borderRadius: 999,
                  px: 2, py: 0.8, fontSize: '0.85rem', fontWeight: 600,
                  bgcolor: 'rgba(34,197,94,0.12)',
                  border: '1px solid rgba(34,197,94,0.25)',
                  '&:hover': { bgcolor: 'rgba(34,197,94,0.2)' },
                }}
              >
                Filter
                {activeCategory && (
                  <Box sx={{
                    ml: 1, width: 8, height: 8, borderRadius: '50%',
                    bgcolor: '#22C55E', boxShadow: '0 0 6px #22C55E',
                  }} />
                )}
              </Button>

              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22C55E', boxShadow: '0 0 8px #22C55E', display: { xs: 'none', md: 'block' } }} />
              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem' }}>
                <Box component="span" sx={{ color: '#22C55E', fontWeight: 800, fontSize: '1rem' }}>
                  {filteredBirds.length}
                </Box>
                {' '}results
                {activeCategory && (
                  <> · <Box component="span" sx={{ color: '#fff', fontWeight: 600 }}>
                    {CATEGORY_TREE.find((c) => c.id === activeCategory)?.label}
                  </Box></>
                )}
              </Typography>
            </Box>

            {/* GRID */}
            {birdLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress sx={{ color: '#22C55E' }} />
              </Box>
            ) : null}
            <Grid container spacing={3}>
              {filteredBirds.map((bird) => {
                const badge = BADGE_COLORS[bird.badge] ?? { bg: '#22C55E', text: '#fff' }
                return (
                  <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={bird.slug}>
                    <Box sx={{
                      height: '100%',
                      borderRadius: 6,
                      overflow: 'hidden',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(16px)',
                      transition: 'all 0.35s ease',
                      display: 'flex', flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        border: '1px solid rgba(34,197,94,0.35)',
                        boxShadow: '0 0 0 1px rgba(34,197,94,0.15), 0 30px 60px rgba(0,0,0,0.4)',
                      },
                    }}>

                      {/* IMAGE */}
                      <Box sx={{ position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                        <Box
                          component="img"
                          src={bird.image}
                          alt={bird.name}
                          sx={{
                            width: '100%', height: 240, objectFit: 'cover',
                            display: 'block', transition: '0.6s ease',
                            '&:hover': { transform: 'scale(1.06)' },
                          }}
                        />

                        {/* GRADIENT OVERLAY */}
                        <Box sx={{
                          position: 'absolute', inset: 0,
                          background: 'linear-gradient(180deg, transparent 40%, rgba(6,13,8,0.9) 100%)',
                        }} />

                        {/* BADGE */}
                        <Box sx={{
                          position: 'absolute', top: 14, left: 14,
                          px: 1.5, py: 0.5, borderRadius: 999,
                          bgcolor: badge.bg, color: badge.text,
                          fontSize: '0.72rem', fontWeight: 800,
                          letterSpacing: '0.04em',
                        }}>
                          {bird.badge}
                        </Box>

                        {/* RATING */}
                        <Stack direction="row" alignItems="center" spacing={0.5} sx={{
                          position: 'absolute', top: 14, right: 14,
                          px: 1.2, py: 0.5, borderRadius: 999,
                          bgcolor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                        }}>
                          <Star sx={{ color: '#FACC15', fontSize: 14 }} />
                          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.78rem' }}>
                            {bird.rating}
                          </Typography>
                          <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem' }}>
                            ({bird.reviews})
                          </Typography>
                        </Stack>

                        {/* FEATURES STRIP — bottom of image */}
                        <Stack direction="row" spacing={0.8} flexWrap="wrap" sx={{
                          position: 'absolute', bottom: 12, left: 12,
                        }}>
                          {bird.features.map((f) => (
                            <Box key={f} sx={{
                              px: 1.2, py: 0.3, borderRadius: 999,
                              bgcolor: 'rgba(34,197,94,0.18)',
                              border: '1px solid rgba(34,197,94,0.35)',
                              color: '#86EFAC', fontSize: '0.68rem', fontWeight: 600,
                            }}>
                              {f}
                            </Box>
                          ))}
                        </Stack>
                      </Box>

                      {/* CONTENT */}
                      <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                          <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.15rem', lineHeight: 1.3 }}>
                            {bird.name}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={0.7} mt={0.6}>
                            <Verified sx={{ color: '#22C55E', fontSize: 14 }} />
                            <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem' }}>
                              {bird.origin}
                            </Typography>
                          </Stack>
                        </Box>

                        <Button
                          component={Link}
                          href={`/birds/${bird.slug}`}
                          endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                          fullWidth
                          sx={{
                            mt: 'auto',
                            textTransform: 'none',
                            fontWeight: 700, fontSize: '0.9rem',
                            py: 1.3, borderRadius: 999,
                            background: 'linear-gradient(90deg, #16A34A, #22C55E)',
                            color: '#fff',
                            boxShadow: '0 8px 24px rgba(34,197,94,0.25)',
                            transition: '0.25s',
                            '&:hover': {
                              boxShadow: '0 12px 32px rgba(34,197,94,0.4)',
                              transform: 'scale(1.02)',
                            },
                          }}
                        >
                          View Details
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                )
              })}
            </Grid>

            {/* EMPTY STATE */}
            {filteredBirds.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 14 }}>
                <Typography sx={{ fontSize: '3rem', mb: 2 }}>🪹</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}>
                  No birds found in this category.
                </Typography>
                <Button
                  onClick={() => { setActiveCategory(null); setActiveSub(null) }}
                  sx={{ mt: 3, color: '#22C55E', textTransform: 'none', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 999, px: 3 }}
                >
                  View All
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const CAT_ICONS = {
  premium: '🏆',
  local:   '🌿',
  farm:    '🌾',
}

function FilterContent({ activeCategory, activeSub, setActiveCategory, setActiveSub, countFor, totalCount }) {
  return (
    <Stack spacing={1}>
      {/* ALL */}
      <SidebarBtn
        active={activeCategory === null}
        label="All Categories"
        count={totalCount}
        onClick={() => { setActiveCategory(null); setActiveSub(null) }}
      />

      <Box sx={{ my: 1, height: 1, bgcolor: 'rgba(255,255,255,0.06)' }} />

      {/* CATEGORIES */}
      {CATEGORY_TREE.map((cat, i) => (
        <Box key={cat.id}>
          {/* CATEGORY ROW */}
          <Box
            onClick={() => { setActiveCategory(cat.id); setActiveSub(null) }}
            sx={{
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 1.5,
              px: 1.5, py: 1.2, borderRadius: 3,
              transition: '0.2s',
              bgcolor: activeCategory === cat.id && activeSub === null
                ? 'rgba(34,197,94,0.12)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
            }}
          >
            {/* ICON BOX */}
            <Box sx={{
              width: 34, height: 34, borderRadius: 2, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem',
              bgcolor: activeCategory === cat.id
                ? 'rgba(34,197,94,0.18)' : 'rgba(255,255,255,0.05)',
              border: activeCategory === cat.id
                ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,255,255,0.07)',
            }}>
              {CAT_ICONS[cat.id]}
            </Box>

            <Box flex={1} minWidth={0}>
              <Typography sx={{
                color: activeCategory === cat.id ? '#22C55E' : '#fff',
                fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.2,
              }}>
                {cat.label}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', mt: 0.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {cat.description}
              </Typography>
            </Box>

            {/* COUNT */}
            <Box sx={{
              px: 1.2, py: 0.3, borderRadius: 999, flexShrink: 0,
              bgcolor: activeCategory === cat.id ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.06)',
              color: activeCategory === cat.id ? '#22C55E' : 'rgba(255,255,255,0.35)',
              fontSize: '0.7rem', fontWeight: 700,
            }}>
              {countFor(cat.id)}
            </Box>
          </Box>

          {/* SUBS */}
          {activeCategory === cat.id && (
            <Box sx={{ ml: 2.5, mt: 0.5, mb: 1, pl: 2, borderLeft: '1px solid rgba(34,197,94,0.2)' }}>
              <Stack spacing={0.5}>
                {cat.subs.map((sub) => {
                  const isActive = activeSub === sub.id
                  return (
                    <Box
                      key={sub.id}
                      onClick={() => { setActiveCategory(cat.id); setActiveSub(sub.id) }}
                      sx={{
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 1,
                        px: 1.5, py: 0.9, borderRadius: 2,
                        transition: '0.15s',
                        bgcolor: isActive ? 'rgba(34,197,94,0.15)' : 'transparent',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
                      }}
                    >
                      <Box sx={{
                        width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                        bgcolor: isActive ? '#22C55E' : 'rgba(255,255,255,0.25)',
                        boxShadow: isActive ? '0 0 6px #22C55E' : 'none',
                      }} />
                      <Typography sx={{
                        color: isActive ? '#22C55E' : 'rgba(255,255,255,0.6)',
                        fontSize: '0.82rem', fontWeight: isActive ? 700 : 500,
                      }}>
                        {sub.label}
                      </Typography>
                    </Box>
                  )
                })}
              </Stack>
            </Box>
          )}

          {i < CATEGORY_TREE.length - 1 && (
            <Box sx={{ mx: 1, mt: 1, height: 1, bgcolor: 'rgba(255,255,255,0.04)' }} />
          )}
        </Box>
      ))}
    </Stack>
  )
}

function SidebarBtn({ active, label, count, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        px: 2, py: 1.3, borderRadius: 3,
        transition: '0.2s',
        borderLeft: active ? '3px solid #22C55E' : '3px solid transparent',
        bgcolor: active ? 'rgba(34,197,94,0.10)' : 'transparent',
        '&:hover': { bgcolor: active ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.04)' },
      }}
    >
      <Typography sx={{ color: active ? '#22C55E' : 'rgba(255,255,255,0.72)', fontWeight: active ? 700 : 500, fontSize: '0.9rem' }}>
        {label}
      </Typography>
      <Box sx={{
        px: 1.2, py: 0.2, borderRadius: 999, minWidth: 28, textAlign: 'center',
        bgcolor: active ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.06)',
        color: active ? '#22C55E' : 'rgba(255,255,255,0.35)',
        fontSize: '0.72rem', fontWeight: 700,
      }}>
        {count}
      </Box>
    </Box>
  )
}
