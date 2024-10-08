import { tokensDark } from "@/app/providers/ThemeProvider"
import { MyInput, MySelect } from "@/shared/ui"
import { Header } from "@/widgets"
import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { Formik } from "formik"
import createService from "./createService"

const CreateManager = () => {
  const { initialValues, validationSchema, isCreaeteLoading, onSubmit } =
    createService()

  return (
    <Box>
      <Header title="Добавление" />
      <Box sx={{ maxWidth: "600px" }}>
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
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing={2}>
                  <MyInput
                    name="week_day"
                    value={values.week_day}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    labelName="Название"
                    errorMessage={errors.week_day}
                    error={touched.week_day && Boolean(errors.week_day)}
                  />

                  <Button
                    sx={{ background: tokensDark.greenAccent[500] }}
                    variant="contained"
                    type="submit"
                    disabled={isCreaeteLoading}
                  >
                    {isCreaeteLoading ? "Загрузка..." : "Добавить"}
                  </Button>
                </Stack>
              </form>
            )
          }}
        </Formik>
      </Box>
    </Box>
  )
}

export default CreateManager
