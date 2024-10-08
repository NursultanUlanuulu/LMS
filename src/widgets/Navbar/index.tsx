import React, { useState } from "react"
import { Menu as MenuIcon } from "@mui/icons-material"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import {
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Box,
  Skeleton,
} from "@mui/material"
import FlexBetween from "@/shared/ui/FlexBetween"
import { logout } from "@/features/Auth/store/slice"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { useNavigate } from "react-router"
import { tokensDark } from "@/app/providers/ThemeProvider"
import { selectUserProfile } from "@/features/Auth/store/selectors"

interface NavbarProp {
  isNonMobile: boolean
  isSidebarOpen: boolean
  setIsSidebarOpen: any
  loading: boolean
}
const Navbar: React.FC<NavbarProp> = ({
  isNonMobile,
  isSidebarOpen,
  setIsSidebarOpen,
  loading,
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const { user } = useAppSelector(selectUserProfile)
  const isOpen = Boolean(anchorEl)
  const handleClick = (event: any) => setAnchorEl(event.currentTarget)
  const handleClose = () => {
    setAnchorEl(null)
    logoutBtn()
  }
  const logoutBtn = async () => {
    await dispatch(logout())
    navigate("/auth/")
  }
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <FlexBetween>
          {isNonMobile ? (
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={e => {
                  e.stopPropagation()
                  setIsSidebarOpen(!isSidebarOpen)
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                sx={{ color: tokensDark.greenAccent[500], fontSize: "26px" }}
                variant="h4"
                fontWeight="bold"
                onClick={() => navigate("/")}
              >
                LMS
              </Typography>
            </Stack>
          )}
        </FlexBetween>
        <FlexBetween gap="1.5rem">
          {loading ? (
            <Skeleton
              variant="circular"
              animation="wave"
              width={35}
              height={35}
            />
          ) : (
            <FlexBetween>
              <FlexBetween>
                <Menu
                  anchorEl={anchorEl}
                  open={isOpen}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                  {user.branch ? (
                    <Box sx={{ px: "10px", textAlign: "center", pt: "10px" }}>
                      Филиал: {user.branch}
                    </Box>
                  ) : null}
                  {user.name ? (
                    <Box sx={{ px: "10px", textAlign: "center", pb: "10px" }}>
                      Имя: {user.name}
                    </Box>
                  ) : null}
                  <MenuItem
                    sx={{ fontWeight: 700, textAlign: "center" }}
                    onClick={handleClose}
                  >
                    Выйти
                  </MenuItem>
                </Menu>
              </FlexBetween>
              <IconButton onClick={handleClick}>
                <PersonOutlinedIcon
                  sx={{
                    fontSize: "23px",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
