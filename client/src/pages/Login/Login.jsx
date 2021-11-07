import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DefaultUsers from '../../components/DefaultUsers';
import * as api from '../../api/user'
import { LOCAL_STORAGE_KEY } from '../../constant'

const LoginPage = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault()
        
        if(!email || !password) return
        const {data} = await api.login(email,password)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({...data}))
        setEmail('')
        setPassword('')
        navigate('/')
    }

    const loadDefaultUser = (email,password) => {
        setEmail(email)
        setPassword(password)
    }

    return (
        <>
        <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
          <Typography variant='p'>
            Login with default Users all having the password of <br></br> 12341234
          </Typography>
          <DefaultUsers loadDefaultUser={loadDefaultUser} />
        </Box>
      </Container>
    </>
    )
}

export default LoginPage
