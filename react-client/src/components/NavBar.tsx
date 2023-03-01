import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import VideoLibraryRoundedIcon from '@mui/icons-material/VideoLibraryRounded'
import { useNavigate } from 'react-router-dom'
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded'
import CreateVideoModal from './CreateVideoModal'
import { retrieveSession } from '../utils/retrieveSesion'

const pages = ['My videos', 'Following Videos', 'Liked Videos']
const settings = ['Profile', 'Logout']

function NavBar({ profileImage }: { profileImage: string }) {
  const navigate = useNavigate()
  const reload = () => window.location.reload()

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const [openCreateVideoModal, setOpenCreateVideoModal] = React.useState(false)

  const creatorSession = retrieveSession()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleMoveToProfile = () => {
    setAnchorElUser(null)
    navigate('/profile')
  }

  const handleLogout = () => {
    setAnchorElUser(null)
    localStorage.removeItem('loggedCreator')
    navigate('/login')
  }

  const handleCreateVideo = () => {
    setOpenCreateVideoModal(true)
  }

  return (
    <AppBar position="static" style={{ marginBottom: '30px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <VideoLibraryRoundedIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.05rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Videos Creator
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 3, color: 'white', display: 'block' }}
                variant="outlined"
                href={`/${page.toLowerCase().replace(' ', '-')}`}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Create Video">
              <IconButton onClick={handleCreateVideo} sx={{ p: 1 }}>
                <LibraryAddRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                <Avatar alt="" src={profileImage} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={
                    setting === 'Profile' ? handleMoveToProfile : handleLogout
                  }
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <div>
        <CreateVideoModal
          show={openCreateVideoModal}
          close={() => {
            setOpenCreateVideoModal(false)
            reload()
          }}
          creatorSession={creatorSession}
        />
      </div>
    </AppBar>
  )
}
export default NavBar
