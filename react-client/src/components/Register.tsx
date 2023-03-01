import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  HowToRegOutlined,
  LoginOutlined,
} from '@mui/icons-material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import signup from '../services/creators/signup'

const Register = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [inputs, setInputs] = React.useState({
    name: '',
    type: '',
    email: '',
    password: '',
  })

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSelectOnChange = (event: SelectChangeEvent<unknown>) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }))
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const createUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const onError = ({ errors: [{ message }] }: any) => setErrorMessage(message)
    const data: {
      message: string
      token: string
    } = await signup(inputs, onError)
    if (data) navigate('/login')
  }

  return (
    <div>
      <Box
        maxWidth={400}
        margin="auto"
        boxShadow={'7px 7px 7px 7px #ccc'}
        padding={1}
        borderRadius={2}
      >
        <h1
          style={{
            textAlign: 'center',
            color: 'blue',
          }}
        >
          Video Creators
        </h1>
      </Box>

      <form onSubmit={createUser}>
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
          <h1>Register</h1>
          <FormControl
            sx={{ width: '26ch' }}
            margin="normal"
            variant="outlined"
            placeholder="Name"
          >
            <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-name"
              name="name"
              value={inputs.name}
              type={'text'}
              onChange={handleOnChange}
              label="Name"
              required
            />
          </FormControl>

          <FormControl
            sx={{ width: '26ch' }}
            margin="normal"
            variant="outlined"
          >
            <InputLabel id="demo-simple-select-label">Creator Type</InputLabel>
            <Select
              id="demo-simple-select"
              defaultValue=""
              name="type"
              onChange={handleSelectOnChange}
              label="Creator Type"
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            sx={{ width: '26ch' }}
            margin="normal"
            variant="outlined"
            placeholder="Email"
          >
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              name="email"
              value={inputs.email}
              type={'email'}
              onChange={handleOnChange}
              label="Email"
              required
            />
          </FormControl>

          <FormControl
            sx={{ width: '26ch' }}
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
              value={inputs.password}
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
            endIcon={<HowToRegOutlined />}
            type="submit"
            sx={{
              marginTop: 2,
              borderRadius: 3,
            }}
            variant="contained"
            color="warning"
          >
            Register
          </Button>

          <Button
            endIcon={<LoginOutlined />}
            sx={{
              marginTop: 2,
              marginBottom: 1,
            }}
            onClick={() => {
              navigate('/login')
            }}
          >
            Login
          </Button>
          {errorMessage && <p>{errorMessage}</p>}
        </Box>
      </form>
    </div>
  )
}

export default Register
