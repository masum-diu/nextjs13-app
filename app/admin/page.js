'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  Box, Button, Chip, CircularProgress, Container,
  Dialog, DialogContent, DialogTitle, Divider,
  Grid, IconButton, MenuItem, Select, Stack,
  Tab, Tabs, TextField, Typography,
} from '@mui/material'
import {
  Add, Close, Delete, Edit, ExitToApp, Pets,
  Refresh, ShoppingBag, EggAlt,
} from '@mui/icons-material'

const STATUS_COLORS = {
  new:       { bg: '#22C55E', text: '#000' },
  contacted: { bg: '#F59E0B', text: '#000' },
  done:      { bg: '#6B7280', text: '#fff' },
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [tab,        setTab]        = useState(0)
  const [orders,     setOrders]     = useState([])
  const [birds,      setBirds]      = useState([])
  const [loading,    setLoading]    = useState(true)
  const [addOpen,    setAddOpen]    = useState(false)
  const [editBird,   setEditBird]   = useState(null)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/admin/login')
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') { fetchOrders(); fetchBirds() }
  }, [status])

  async function fetchOrders() {
    setLoading(true)
    const res = await fetch('/api/orders')
    const data = await res.json()
    setOrders(data.orders || [])
    setLoading(false)
  }

  async function fetchBirds() {
    const res  = await fetch('/api/birds')
    const data = await res.json()
    setBirds(data.birds || [])
  }

  async function deleteBird(id) {
    if (!confirm('Delete this bird?')) return
    await fetch(`/api/birds/${id}`, { method: 'DELETE' })
    setBirds((prev) => prev.filter((b) => b._id !== id))
  }

  async function updateStatus(id, newStatus) {
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o))
    )
  }

  async function deleteOrder(id) {
    if (!confirm('Delete this inquiry?')) return
    await fetch(`/api/orders/${id}`, { method: 'DELETE' })
    setOrders((prev) => prev.filter((o) => o._id !== id))
  }

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#060D08', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#22C55E' }} />
      </Box>
    )
  }

  const newCount = orders.filter((o) => o.status === 'new').length

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#060D08' }}>

      {/* TOP BAR */}
      <Box sx={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        bgcolor: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(10px)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center"  sx={{ py: 1.5, justifyContent: 'space-between' }}>
            <Stack direction="row" alignItems="center" gap={1.5}>
              <Box sx={{
                width: 36, height: 36, borderRadius: 2,
                bgcolor: 'rgba(34,197,94,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Pets sx={{ color: '#22C55E', fontSize: 20 }} />
              </Box>
              <Box>
                <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem', lineHeight: 1 }}>
                  SN Agro Admin
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>
                  {session?.user?.email}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
              {/* <Button
                onClick={async () => {
                  if (!confirm('Migrate static birds to database?')) return
                  const res  = await fetch('/api/seed', { method: 'POST' })
                  const data = await res.json()
                  alert(`Done! Inserted: ${data.inserted}, Skipped: ${data.skipped}`)
                  fetchBirds()
                }}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)',
                  borderRadius: 999, textTransform: 'none',
                  fontWeight: 600, fontSize: '0.82rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  px: 2, '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', color: '#fff' },
                }}
              >
                Seed Birds
              </Button> */}
              <Button
                onClick={() => setAddOpen(true)}
                startIcon={<Add />}
                size="small"
                sx={{
                  bgcolor: '#22C55E', color: '#fff',
                  borderRadius: 999, textTransform: 'none',
                  fontWeight: 600, fontSize: '0.82rem',
                  px: 2, '&:hover': { bgcolor: '#16A34A' },
                }}
              >
                Add Bird
              </Button>
              <IconButton onClick={() => signOut({ callbackUrl: '/admin/login' })} size="small"
                sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: '#fff' } }}>
                <ExitToApp fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>

        {/* STATS ROW */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {[
            { label: 'Total Inquiries', value: orders.length,  color: '#fff' },
            { label: 'New',             value: newCount,        color: '#22C55E' },
            { label: 'Contacted',       value: orders.filter((o) => o.status === 'contacted').length, color: '#F59E0B' },
            { label: 'Done',            value: orders.filter((o) => o.status === 'done').length,      color: '#6B7280' },
          ].map((s) => (
            <Grid size={{ xs: 6, md: 3 }} key={s.label}>
              <Box sx={{
                p: 3, borderRadius: 4,
                bgcolor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <Typography sx={{ color: s.color, fontWeight: 900, fontSize: '2rem', lineHeight: 1 }}>
                  {s.value}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', mt: 0.5 }}>
                  {s.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* TABS */}
        <Tabs
          value={tab} onChange={(_, v) => setTab(v)}
          sx={{
            mb: 3,
            '& .MuiTab-root': { color: 'rgba(255,255,255,0.45)', textTransform: 'none', fontWeight: 600 },
            '& .Mui-selected': { color: '#22C55E !important' },
            '& .MuiTabs-indicator': { bgcolor: '#22C55E' },
          }}
        >
          <Tab label={`Inquiries (${orders.length})`} icon={<ShoppingBag fontSize="small" />} iconPosition="start" />
          <Tab label={`Birds (${birds.length})`} icon={<EggAlt fontSize="small" />} iconPosition="start" />
        </Tabs>

        {/* ORDERS LIST */}
        {tab === 0 && (
          <Box>
            <Stack direction="row" justifyContent="flex-end" mb={2}>
              <IconButton onClick={fetchOrders} size="small" sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#22C55E' } }}>
                <Refresh fontSize="small" />
              </IconButton>
            </Stack>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress sx={{ color: '#22C55E' }} />
              </Box>
            ) : orders.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '1rem' }}>No inquiries yet</Typography>
              </Box>
            ) : (
              <Stack spacing={2}>
                {orders.map((order) => {
                  const sc = STATUS_COLORS[order.status] || STATUS_COLORS.new
                  return (
                    <Box key={order._id} sx={{
                      borderRadius: 3, overflow: 'hidden', position: 'relative',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%)',
                      border: `1px solid ${sc.bg}28`,
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 10px 40px ${sc.bg}18`,
                        border: `1px solid ${sc.bg}55`,
                      },
                    }}>
                      {/* LEFT ACCENT BAR */}
                      <Box sx={{
                        position: 'absolute', left: 0, top: 0, bottom: 0,
                        width: 4, bgcolor: sc.bg, borderRadius: '3px 0 0 3px',
                      }} />

                      {/* MAIN BODY */}
                      <Box sx={{ pl: { xs: 2.5, sm: 3.5 }, pr: { xs: 2, sm: 2.5 }, pt: 2.5, pb: 0 }}>

                        {/* TOP: avatar + name + date */}
                        <Stack spacing={1.5} direction="row" alignItems="flex-start" gap={1.5} mb={1.5}>
                          <Box sx={{
                            width: 42, height: 42, borderRadius: '10px', flexShrink: 0,
                            background: `linear-gradient(135deg, ${sc.bg}30, ${sc.bg}10)`,
                            border: `1.5px solid ${sc.bg}40`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <Typography sx={{ color: sc.bg, fontWeight: 900, fontSize: '1.05rem', lineHeight: 1 }}>
                              {order.name?.charAt(0).toUpperCase()}
                            </Typography>
                          </Box>

                          <Box flex={1} minWidth={0} mt={0.3}>
                            <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
                              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.96rem', letterSpacing: '-0.01em' }}>
                                {order.name}
                              </Typography>
                              <Box sx={{
                                px: 0.9, py: 0.15, borderRadius: '6px',
                                bgcolor: sc.bg + '20', border: `1px solid ${sc.bg}45`,
                              }}>
                                <Typography sx={{ color: sc.bg, fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                                  {order.status}
                                </Typography>
                              </Box>
                            </Stack>
                            <Typography sx={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.71rem', mt: 0.3 }}>
                              {new Date(order.createdAt).toLocaleString('en-BD')}
                            </Typography>
                          </Box>
                        </Stack>

                        {/* DETAIL ROW: bird + phone */}
                        <Stack direction="column" spacing={1} flexWrap="wrap" mb={1.5} sx={{ pl: 0.2 ,pt: 0.5 }}>
                          <Stack direction="row" alignItems="center" spacing={0.6}>
                            <Pets sx={{ fontSize: '0.82rem', color: '#22C55E' }} />
                            <Typography sx={{ color: '#22C55E', fontSize: '0.82rem', fontWeight: 600 }}>
                              {order.birdName || '—'}
                            </Typography>
                          </Stack>
                          <Stack direction="row" alignItems="center" spacing={0.6}>
                            <Typography sx={{ fontSize: '0.75rem', lineHeight: 1 }}>📞</Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem' }}>
                              {order.phone}
                            </Typography>
                          </Stack>
                        </Stack>

                        {/* MESSAGE */}
                        {order.message && (
                          <Box sx={{
                            mb: 2, px: 1.5, py: 1, borderRadius: 2,
                            bgcolor: 'rgba(0,0,0,0.2)',
                            borderLeft: `3px solid ${sc.bg}55`,
                          }}>
                            <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', fontStyle: 'italic', lineHeight: 1.55 }}>
                              &ldquo;{order.message}&rdquo;
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      {/* ACTION BAR */}
                      <Stack
                        direction="row" alignItems="center" spacing={1}
                        sx={{
                          px: { xs: 2, sm: 2.5 }, py: 1.2,
                          mt: order.message ? 0 : 2,
                          borderTop: '1px solid rgba(255,255,255,0.06)',
                          bgcolor: 'rgba(0,0,0,0.18)',
                        }}
                      >
                        <Select
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          size="small"
                          sx={{
                            color: sc.bg, fontSize: '0.78rem', borderRadius: 2, minWidth: 130,
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: sc.bg + '40' },
                            '& .MuiSvgIcon-root': { color: sc.bg + 'aa' },
                            '& .MuiSelect-select': { py: 0.65, px: 1.4 },
                            bgcolor: sc.bg + '12',
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: sc.bg + '80' },
                          }}
                          MenuProps={{ PaperProps: { sx: {
                            bgcolor: '#0D1A0F', backgroundImage: 'none',
                            border: '1px solid rgba(255,255,255,0.1)',
                            '& .MuiMenuItem-root': { color: '#fff', fontSize: '0.82rem',
                              '&:hover': { bgcolor: 'rgba(34,197,94,0.1)' },
                              '&.Mui-selected': { bgcolor: 'rgba(34,197,94,0.15)', color: '#22C55E' },
                            },
                          }}}}
                        >
                          <MenuItem value="new">🟢 New</MenuItem>
                          <MenuItem value="contacted">🟡 Contacted</MenuItem>
                          <MenuItem value="done">⚫ Done</MenuItem>
                        </Select>

                        <Box flex={1} />

                        <Button
                          component="a" href={`tel:${order.phone}`}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(34,197,94,0.12)', color: '#22C55E',
                            border: '1px solid rgba(34,197,94,0.25)',
                            borderRadius: 2, textTransform: 'none',
                            fontWeight: 600, fontSize: '0.78rem', px: 2, py: 0.55,
                            '&:hover': { bgcolor: 'rgba(34,197,94,0.22)', borderColor: '#22C55E' },
                          }}
                        >
                          📞 Call
                        </Button>

                        <IconButton
                          onClick={() => deleteOrder(order._id)}
                          size="small"
                          sx={{
                            color: 'rgba(255,80,80,0.4)',
                            border: '1px solid rgba(255,80,80,0.12)',
                            borderRadius: 2, p: 0.7,
                            '&:hover': { color: '#F87171', bgcolor: 'rgba(248,113,113,0.1)', borderColor: 'rgba(248,113,113,0.3)' },
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Box>
                  )
                })}
              </Stack>
            )}
          </Box>
        )}
        {/* BIRDS LIST */}
        {tab === 1 && (
          <Box>
            <Stack direction="row" justifyContent="flex-end" mb={2}>
              <IconButton onClick={fetchBirds} size="small" sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#22C55E' } }}>
                <Refresh fontSize="small" />
              </IconButton>
            </Stack>

            {birds.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '1rem' }}>No birds added yet</Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {birds.map((bird) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={bird._id}>
                    <Box sx={{
                      borderRadius: 4, overflow: 'hidden',
                      bgcolor: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex', flexDirection: 'column',
                      transition: '0.2s',
                      '&:hover': { border: '1px solid rgba(34,197,94,0.25)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' },
                    }}>
                      {/* IMAGE */}
                      <Box sx={{ position: 'relative' }}>
                        <Box
                          component="img"
                          src={bird.image}
                          alt={bird.name}
                          sx={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }}
                        />
                        {bird.badge && (
                          <Chip label={bird.badge} size="small" sx={{
                            position: 'absolute', top: 10, left: 10,
                            bgcolor: '#22C55E', color: '#000',
                            fontWeight: 700, fontSize: '0.7rem', height: 22,
                          }} />
                        )}
                      </Box>

                      {/* INFO */}
                      <Box sx={{ p: 2, flex: 1 }}>
                        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem', mb: 0.3 }}>
                          {bird.name}
                        </Typography>
                        <Typography sx={{ color: '#22C55E', fontSize: '0.75rem' }}>
                          {bird.categoryId}{bird.origin ? ` · ${bird.origin}` : ''}
                        </Typography>
                        {bird.price && (
                          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 600, mt: 0.5 }}>
                            {bird.price}
                          </Typography>
                        )}
                        {bird.description && (
                          <Typography sx={{
                            color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem',
                            mt: 1, lineHeight: 1.5,
                            display: '-webkit-box', WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical', overflow: 'hidden',
                          }}>
                            {bird.description}
                          </Typography>
                        )}
                      </Box>

                      {/* ACTION BAR */}
                      <Box sx={{
                        display: 'flex', gap: 1, p: 1.5, pt: 0,
                      }}>
                        <Button
                          onClick={() => setEditBird(bird)}
                          startIcon={<Edit sx={{ fontSize: 15 }} />}
                          fullWidth
                          size="small"
                          sx={{
                            bgcolor: 'rgba(34,197,94,0.12)',
                            color: '#22C55E',
                            border: '1px solid rgba(34,197,94,0.2)',
                            borderRadius: 2, textTransform: 'none',
                            fontWeight: 600, fontSize: '0.8rem',
                            '&:hover': { bgcolor: 'rgba(34,197,94,0.22)' },
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteBird(bird._id)}
                          startIcon={<Delete sx={{ fontSize: 15 }} />}
                          fullWidth
                          size="small"
                          sx={{
                            bgcolor: 'rgba(248,113,113,0.08)',
                            color: '#F87171',
                            border: '1px solid rgba(248,113,113,0.2)',
                            borderRadius: 2, textTransform: 'none',
                            fontWeight: 600, fontSize: '0.8rem',
                            '&:hover': { bgcolor: 'rgba(248,113,113,0.18)' },
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

      </Container>

      {/* ADD BIRD DIALOG */}
      <AddBirdDialog open={addOpen} onClose={() => { setAddOpen(false); fetchBirds() }} />

      {/* EDIT BIRD DIALOG */}
      <EditBirdDialog
        bird={editBird}
        onClose={() => setEditBird(null)}
        onSaved={(updated) => {
          setBirds((prev) => prev.map((b) => b._id === updated._id ? updated : b))
          setEditBird(null)
        }}
      />
    </Box>
  )
}

function AddBirdDialog({ open, onClose }) {
  const [form, setForm] = useState({
    slug: '', name: '', origin: '', categoryId: 'local',
    image: '', description: '', badge: '', price: '',
    features: '',
  })
  const [loading,      setLoading]      = useState(false)
  const [uploading,    setUploading]    = useState(false)
  const [error,        setError]        = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [dragOver,     setDragOver]     = useState(false)

  function handleChange(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  async function handleImageFile(file) {
    if (!file) return
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) {
      setError('Only JPG, PNG, WEBP allowed')
      return
    }
    if (file.size > 1 * 1024 * 1024) {
      setError('Image must be under 1MB')
      return
    }
    setError('')
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res  = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      setForm((f) => ({ ...f, image: data.url }))
      setImagePreview(data.url)
    } catch (err) {
      setError(err.message)
    }
    setUploading(false)
  }

  function onFileInput(e) { handleImageFile(e.target.files[0]) }
  function onDrop(e) {
    e.preventDefault()
    setDragOver(false)
    handleImageFile(e.dataTransfer.files[0])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.image) { setError('Please upload an image'); return }
    setLoading(true)
    setError('')
    try {
      const payload = {
        ...form,
        images: [form.image],
        features: form.features.split(',').map((s) => s.trim()).filter(Boolean),
      }
      const res = await fetch('/api/birds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      onClose()
      setForm({ slug: '', name: '', origin: '', categoryId: 'local', image: '', description: '', badge: '', price: '', features: '' })
      setImagePreview('')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#0D1A0F',
          backgroundImage: 'none',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 4,
        },
      }}
    >
      <DialogTitle sx={{ color: '#fff', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#0D1A0F' }}>
        Add New Bird
        <IconButton onClick={onClose} size="small" sx={{ color: 'rgba(255,255,255,0.4)' }}>
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
      <DialogContent sx={{ pt: 3, bgcolor: '#0D1A0F' }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[
              { key: 'name',   label: 'Bird Name *',  required: true },
              { key: 'slug',   label: 'Slug (url) *',  required: true },
              { key: 'origin', label: 'Origin' },
              { key: 'price',  label: 'Price (e.g. ৳5,000)' },
              { key: 'badge',  label: 'Badge (e.g. Best Seller)' },
              { key: 'features', label: 'Features (comma separated)' },
            ].map(({ key, label, required }) => (
              <Grid size={{ xs: 12, sm: 6 }} key={key}>
                <TextField
                  fullWidth label={label} value={form[key]}
                  onChange={handleChange(key)} required={required}
                  sx={fieldSx} size="small"
                />
              </Grid>
            ))}

            {/* IMAGE UPLOAD */}
            <Grid size={12}>
              <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', mb: 1 }}>
                Bird Image * (max 1MB · JPG / PNG / WEBP)
              </Typography>

              {imagePreview ? (
                <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', height: 160 }}>
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="preview"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box
                    onClick={() => { setImagePreview(''); setForm((f) => ({ ...f, image: '' })) }}
                    sx={{
                      position: 'absolute', top: 8, right: 8,
                      width: 28, height: 28, borderRadius: '50%',
                      bgcolor: 'rgba(0,0,0,0.7)', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      '&:hover': { bgcolor: '#F87171' },
                    }}
                  >
                    <Close sx={{ color: '#fff', fontSize: 14 }} />
                  </Box>
                </Box>
              ) : (
                <Box
                  component="label"
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={onDrop}
                  sx={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: 1, height: 140, borderRadius: 3, cursor: 'pointer',
                    border: `2px dashed ${dragOver ? '#22C55E' : 'rgba(255,255,255,0.15)'}`,
                    bgcolor: dragOver ? 'rgba(34,197,94,0.07)' : 'rgba(255,255,255,0.03)',
                    transition: 'all 0.2s',
                    '&:hover': { borderColor: '#22C55E', bgcolor: 'rgba(34,197,94,0.05)' },
                  }}
                >
                  <input type="file" accept="image/*" hidden onChange={onFileInput} />
                  {uploading ? (
                    <CircularProgress size={28} sx={{ color: '#22C55E' }} />
                  ) : (
                    <>
                      <Box sx={{
                        width: 44, height: 44, borderRadius: '50%',
                        bgcolor: 'rgba(34,197,94,0.12)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Add sx={{ color: '#22C55E', fontSize: 24 }} />
                      </Box>
                      <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
                        Click or drag & drop image
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem' }}>
                        Max 1MB
                      </Typography>
                    </>
                  )}
                </Box>
              )}
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth label="Category" value={form.categoryId}
                onChange={handleChange('categoryId')}
                select sx={fieldSx} size="small"
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        bgcolor: '#0D1A0F',
                        backgroundImage: 'none',
                        border: '1px solid rgba(255,255,255,0.1)',
                        '& .MuiMenuItem-root': {
                          color: '#fff',
                          '&:hover':   { bgcolor: 'rgba(34,197,94,0.1)' },
                          '&.Mui-selected': { bgcolor: 'rgba(34,197,94,0.15)', color: '#22C55E' },
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="premium">Premium</MenuItem>
                <MenuItem value="local">Local</MenuItem>
                <MenuItem value="farm">Farm</MenuItem>
              </TextField>
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth label="Description" value={form.description}
                onChange={handleChange('description')}
                multiline rows={3} sx={fieldSx} size="small"
              />
            </Grid>
          </Grid>

          {error && (
            <Typography sx={{ color: '#F87171', fontSize: '0.82rem', mt: 2 }}>{error}</Typography>
          )}

          <Button
            type="submit" fullWidth disabled={loading}
            sx={{
              mt: 3, py: 1.5, borderRadius: 999,
              bgcolor: '#22C55E', color: '#fff',
              fontWeight: 700, textTransform: 'none',
              '&:hover': { bgcolor: '#16A34A' },
              '&:disabled': { bgcolor: 'rgba(34,197,94,0.4)' },
            }}
          >
            {loading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : 'Add Bird'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

function EditBirdDialog({ bird, onClose, onSaved }) {
  const [form,    setForm]    = useState({})
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [preview, setPreview] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (bird) {
      setForm({
        name:        bird.name        || '',
        origin:      bird.origin      || '',
        categoryId:  bird.categoryId  || 'local',
        price:       bird.price       || '',
        badge:       bird.badge       || '',
        features:    (bird.features || []).join(', '),
        description: bird.description || '',
        image:       bird.image       || '',
      })
      setPreview(bird.image || '')
      setError('')
    }
  }, [bird])

  function handleChange(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  async function handleImageFile(file) {
    if (!file) return
    if (file.size > 1 * 1024 * 1024) { setError('Image must be under 1MB'); return }
    setError(''); setUploading(true)
    try {
      const fd = new FormData(); fd.append('file', file)
      const res  = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setForm((f) => ({ ...f, image: data.url }))
      setPreview(data.url)
    } catch (err) { setError(err.message) }
    setUploading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const payload = {
        ...form,
        images: [form.image],
        features: form.features.split(',').map((s) => s.trim()).filter(Boolean),
      }
      const res  = await fetch(`/api/birds/${bird._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      onSaved(data.bird)
    } catch (err) { setError(err.message) }
    setLoading(false)
  }

  const menuProps = {
    PaperProps: {
      sx: {
        bgcolor: '#0D1A0F', backgroundImage: 'none',
        border: '1px solid rgba(255,255,255,0.1)',
        '& .MuiMenuItem-root': {
          color: '#fff',
          '&:hover': { bgcolor: 'rgba(34,197,94,0.1)' },
          '&.Mui-selected': { bgcolor: 'rgba(34,197,94,0.15)', color: '#22C55E' },
        },
      },
    },
  }

  return (
    <Dialog open={!!bird} onClose={onClose} maxWidth="sm" fullWidth
      PaperProps={{ sx: { bgcolor: '#0D1A0F', backgroundImage: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4 } }}
    >
      <DialogTitle sx={{ color: '#fff', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#0D1A0F' }}>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: '1.1rem' }}>Edit Bird</Typography>
          <Typography sx={{ color: '#22C55E', fontSize: '0.78rem', fontWeight: 500 }}>{bird?.name}</Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: 'rgba(255,255,255,0.4)' }}>
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
      <DialogContent sx={{ pt: 3, bgcolor: '#0D1A0F' }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[
              { key: 'name',     label: 'Bird Name *', required: true },
              { key: 'origin',   label: 'Origin' },
              { key: 'price',    label: 'Price' },
              { key: 'badge',    label: 'Badge' },
              { key: 'features', label: 'Features (comma separated)' },
            ].map(({ key, label, required }) => (
              <Grid size={{ xs: 12, sm: 6 }} key={key}>
                <TextField fullWidth label={label} value={form[key] || ''}
                  onChange={handleChange(key)} required={required}
                  sx={fieldSx} size="small" />
              </Grid>
            ))}
            <Grid size={12}>
              <TextField fullWidth label="Category" value={form.categoryId || 'local'}
                onChange={handleChange('categoryId')} select sx={fieldSx} size="small"
                SelectProps={{ MenuProps: menuProps }}
              >
                <MenuItem value="premium">Premium</MenuItem>
                <MenuItem value="local">Local</MenuItem>
                <MenuItem value="farm">Farm</MenuItem>
              </TextField>
            </Grid>

            {/* IMAGE */}
            <Grid size={12}>
              <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', mb: 1 }}>
                Bird Image (max 1MB)
              </Typography>
              <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', height: 150 }}>
                {preview && (
                  <Box component="img" src={preview} alt="preview"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
                <Box component="label" sx={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  bgcolor: preview ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.04)',
                  border: preview ? 'none' : '2px dashed rgba(255,255,255,0.15)',
                  borderRadius: 3, cursor: 'pointer',
                  opacity: preview ? 0 : 1,
                  '&:hover': { opacity: 1, bgcolor: 'rgba(0,0,0,0.55)' },
                  transition: 'opacity 0.2s',
                }}>
                  <input type="file" accept="image/*" hidden onChange={(e) => handleImageFile(e.target.files[0])} />
                  {uploading
                    ? <CircularProgress size={24} sx={{ color: '#22C55E' }} />
                    : <Stack alignItems="center" gap={0.5}>
                        <Edit sx={{ color: '#fff', fontSize: 22 }} />
                        <Typography sx={{ color: '#fff', fontSize: '0.75rem' }}>Change Image</Typography>
                      </Stack>
                  }
                </Box>
              </Box>
            </Grid>

            <Grid size={12}>
              <TextField fullWidth label="Description" value={form.description || ''}
                onChange={handleChange('description')}
                multiline rows={3} sx={fieldSx} size="small" />
            </Grid>
          </Grid>

          {error && <Typography sx={{ color: '#F87171', fontSize: '0.82rem', mt: 2 }}>{error}</Typography>}

          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
            <Button onClick={onClose} fullWidth
              sx={{
                py: 1.4, borderRadius: 999, textTransform: 'none', fontWeight: 600,
                bgcolor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >Cancel</Button>
            <Button type="submit" fullWidth disabled={loading}
              sx={{
                py: 1.4, borderRadius: 999, textTransform: 'none', fontWeight: 700,
                bgcolor: '#22C55E', color: '#fff',
                '&:hover': { bgcolor: '#16A34A' },
                '&:disabled': { bgcolor: 'rgba(34,197,94,0.4)' },
              }}
            >
              {loading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : 'Save Changes'}
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff', borderRadius: 2,
    bgcolor: 'rgba(255,255,255,0.05)',
    '& fieldset':             { borderColor: 'rgba(255,255,255,0.12)' },
    '&:hover fieldset':       { borderColor: 'rgba(255,255,255,0.25)' },
    '&.Mui-focused fieldset': { borderColor: '#22C55E' },
  },
  '& .MuiInputLabel-root':             { color: 'rgba(255,255,255,0.45)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#22C55E' },
  '& .MuiSelect-icon':                 { color: 'rgba(255,255,255,0.4)' },
}
