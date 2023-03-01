import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import {
  LoginOutlined,
  HowToRegOutlined,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import login from '../services/login'

const Login = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [loginInputs, setLoginInputs] = React.useState({
    email: '',
    password: '',
  })

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }))
  }

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const onError = (message: string) => setErrorMessage(message)
    const data = await login(loginInputs, onError)
    if (data) {
      window.localStorage.setItem('loggedCreator', JSON.stringify(data))
      navigate('/dashboard')
    }
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={loginHandler}>
        <Box
          display="flex"
          flexDirection={'column'}
          maxWidth={400}
          alignItems="center"
          justifyContent={'center'}
          margin="auto"
          marginTop={5}
          padding={2}
          borderRadius={2}
          boxShadow={'5px 5px 5px #ccc'}
          sx={{
            ':hover': {
              boxShadow: '10px 10px 20px #ccc',
            },
          }}
        >
          <h1>Login</h1>
          <FormControl
            sx={{ width: '30ch' }}
            margin="normal"
            variant="outlined"
            placeholder="Email"
          >
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              name="email"
              value={loginInputs.email}
              type={'email'}
              onChange={handleOnChange}
              label="Email"
              required
            />
          </FormControl>

          <FormControl
            sx={{ width: '30ch' }}
            margin="normal"
            variant="outlined"
            placeholder="Password"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              value={loginInputs.password}
              type={showPassword ? 'text' : 'password'}
              onChange={handleOnChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              required
            />
          </FormControl>

          <Button
            endIcon={<LoginOutlined />}
            type="submit"
            sx={{
              marginTop: 2,
              borderRadius: 3,
            }}
            variant="contained"
            color="warning"
          >
            Login
          </Button>

          <Button
            endIcon={<HowToRegOutlined />}
            sx={{
              marginTop: 2,
              marginBottom: 1,
            }}
            onClick={() => {
              navigate('/register')
            }}
          >
            Register
          </Button>
          {errorMessage && <p>{errorMessage}</p>}
        </Box>
      </form>
    </div>
  )
}

export default Login
