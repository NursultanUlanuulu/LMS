import { Button } from "@mui/material"
import { Box } from "@mui/system"
import { NavLink } from "react-router-dom"
import forniddenImg from "@/shared/assets/images/forbidden.svg"
import notFoundImg from "@/shared/assets/images/notFound.svg"
import { tokensDark } from "@/app/providers/ThemeProvider"

const ErrorPage = ({ type }: { type: 404 | 403 }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          width: "40%",
          margin: "20px auto 0 auto",
          "@media(max-width:968px)": {
            width: "60%",
          },
        }}
      >
        <img
          style={{ maxWidth: "100%" }}
          src={type === 403 ? forniddenImg : notFoundImg}
          alt="404"
        />
      </Box>
      <NavLink to="/">
        <Button
          sx={{
            background: tokensDark.blueAccent[600],
            color: tokensDark.primary[100],
            marginTop: "20px",
          }}
          variant="outlined"
        >
          На главную
        </Button>
      </NavLink>
    </Box>
  )
}

export default ErrorPage
