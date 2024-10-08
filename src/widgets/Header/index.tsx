import { tokensDark } from "@/app/providers/ThemeProvider"
import { Typography, Box, useTheme, Color } from "@mui/material"
import React from "react"

interface HeaderProps {
  title: string
  subtitle?: string
  color?: string
}
const Header: React.FC<HeaderProps> = ({ title, subtitle, color }) => {
  const theme = useTheme()
  return (
    <Box sx={{ marginBottom: "15px" }}>
      <Typography
        variant="h2"
        color={color || (theme.palette.grey as unknown as Color)[100]}
        fontWeight="bold"
        sx={{
          mb: "5px",
          fontSize: "32px",
          "@media(max-width:640px)": {
            fontSize: "25px",
          },
        }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={tokensDark.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  )
}

export default Header
