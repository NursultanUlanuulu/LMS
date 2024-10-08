import { Box, Typography, useMediaQuery, Grid } from "@mui/material"
import Form from "./Form"
import imgSrc from "@/shared/assets/images/login_back_page.svg"

const LoginPage = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      paddingX="5%"
      spacing={5}
      sx={{ position: "absolute", top: "50%", transform: "translateY(-50%)" }}
    >
      <Grid item md={6} xs={10} sm={9}>
        <Box
          sx={{
            "& img": {
              maxWidth: "90%",
            },
          }}
        >
          <img src={imgSrc} alt="login" />
        </Box>
      </Grid>
      <Grid item md={6} xs={12}>
        <Box m="2rem auto" borderRadius="1.5rem">
          <Typography
            sx={{
              marginBottom: "10px",
              fontSize: 18,
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            Войти
          </Typography>
          <Form />
        </Box>
      </Grid>
    </Grid>
  )
}

export default LoginPage
