import { tokensDark } from "@/app/providers/ThemeProvider"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { login } from "@/features/Auth/store/actions"
import { selectLogin } from "@/features/Auth/store/selectors"
import { LoginReq } from "@/features/Auth/type"
import { StatusResponse } from "@/shared/enums"
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material"
import { Formik } from "formik"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"

const Form = () => {
  const { palette } = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoading =
    useAppSelector(selectLogin).status === StatusResponse.LOADING
  const isNonMobile = useMediaQuery("(min-width:600px)")
  const validationSchema = yup.object().shape({
    phone: yup.string().required("Обязательное поле"),
    password: yup.string().required("Обязательное поле"),
  })

  const initialValues: LoginReq = {
    phone: "",
    password: "",
  }
  const onSubmit = (values: LoginReq) => {
    dispatch(login({ userData: values, navigate }))
  }

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="15px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Номер телефона"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phone}
              name="phone"
              error={Boolean(touched.phone) && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              variant="outlined"
              placeholder="Пароль"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                gridColumn: "span 4",
              }}
            />
          </Box>

          <Button
            fullWidth
            type="submit"
            disabled={isLoading}
            sx={{
              m: "1rem 0",
              p: "1rem",
              backgroundColor: tokensDark.blueAccent[500],
              color: tokensDark.blueAccent[100],
              "&:hover": { color: palette.primary.main },
            }}
          >
            {isLoading ? "Загрузка..." : "Отправить"}
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default Form
