import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Modal,
  OutlinedInput,
} from '@mui/material'
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded'
import { useState } from 'react'
import createVideo from '../services/videos/createVideo'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const CreateVideo = (props: any) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    url: '',
  })

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }))
  }

  const createVideoHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const onError = (error: any) => setErrorMessage(error)
    const video = await createVideo(inputs, props.creatorSession, onError)

    if (video) {
      props.close()
    }
  }

  return (
    <div>
      <Modal
        open={props.show}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box borderRadius={2} sx={style}>
          <form onSubmit={createVideoHandler}>
            <Box
              display="flex"
              flexDirection={'column'}
              alignItems="center"
              justifyContent={'center'}
              margin="auto"
            >
              <h1>Create New Video</h1>
              <FormControl
                sx={{ width: '26ch' }}
                margin="normal"
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-title">
                  Title
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-title"
                  name="title"
                  value={inputs.title}
                  type={'text'}
                  onChange={handleOnChange}
                  label="Title"
                  required
                />
              </FormControl>

              <FormControl
                sx={{ width: '26ch' }}
                margin="normal"
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-description">
                  Description
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-description"
                  name="description"
                  value={inputs.description}
                  type={'text'}
                  onChange={handleOnChange}
                  label="Description"
                  required
                  multiline
                />
              </FormControl>

              <FormControl
                sx={{ width: '26ch' }}
                margin="normal"
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-url">URL</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-url"
                  name="url"
                  value={inputs.url}
                  type={'url'}
                  onChange={handleOnChange}
                  label="url"
                  required
                />
              </FormControl>

              <Button
                endIcon={<AddBoxRoundedIcon />}
                type="submit"
                sx={{
                  marginTop: 2,
                  borderRadius: 3,
                }}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Box>
          </form>
          {errorMessage && <p>{errorMessage}</p>}
        </Box>
      </Modal>
    </div>
  )
}
export default CreateVideo
