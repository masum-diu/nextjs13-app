'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { Pets } from '@mui/icons-material'

export default function AdminLogin() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email, password, redirect: false,
    })

    setLoading(false)
    if (res?.ok) {
      router.push('/admin')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <Box sx={{
      minHeight: '100vh', bgcolor: '#060D08',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      p: 2,
    }}>
      <Box sx={{
        width: '100%', maxWidth: 400,
        bgcolor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 5,
        backdropFilter: 'blur(20px)',
        p: 4,
      }}>
        {/* LOGO */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <Box sx={{
            width: 42, height: 42, borderRadius: 2,
            bgcolor: 'rgba(34,197,94,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Pets sx={{ color: '#22C55E', fontSize: 22 }} />
          </Box>
          <Box>
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1rem', lineHeight: 1 }}>
              SN Agro Farm
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
              Admin Panel
            </Typography>
          </Box>
        </Box>

        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.4rem', mb: 0.5 }}>
          Sign In
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', mb: 3 }}>
          Access your admin dashboard
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Email" type="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            required
            sx={fieldSx}
          />
          <TextField
            fullWidth label="Password" type="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ ...fieldSx, mt: 2 }}
          />

          {error && (
            <Typography sx={{ color: '#F87171', fontSize: '0.82rem', mt: 1.5 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit" fullWidth disabled={loading}
            sx={{
              mt: 3, py: 1.6, borderRadius: 999,
              bgcolor: '#22C55E', color: '#fff',
              fontWeight: 700, fontSize: '0.95rem', textTransform: 'none',
              '&:hover': { bgcolor: '#16A34A' },
              '&:disabled': { bgcolor: 'rgba(34,197,94,0.4)' },
            }}
          >
            {loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Sign In'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff', borderRadius: 2,
    '& fieldset':        { borderColor: 'rgba(255,255,255,0.15)' },
    '&:hover fieldset':  { borderColor: 'rgba(255,255,255,0.3)' },
    '&.Mui-focused fieldset': { borderColor: '#22C55E' },
  },
  '& .MuiInputLabel-root':        { color: 'rgba(255,255,255,0.45)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#22C55E' },
}
