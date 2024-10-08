import { tokensDark } from "@/app/providers/ThemeProvider"
import { MyInput, MySelect } from "@/shared/ui"
import { Header } from "@/widgets"
import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { Formik } from "formik"
import createService from "./createService"

const CreateManager = () => {
  const { initialValues, validationSchema, isCreateSubjectLoading, onSubmit } =
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
                    name="predmet"
                    value={values.predmet}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    labelName="Название"
                    errorMessage={errors.predmet}
                    error={touched.predmet && Boolean(errors.predmet)}
                  />

                  <Button
                    sx={{ background: tokensDark.greenAccent[500] }}
                    variant="contained"
                    type="submit"
                    disabled={isCreateSubjectLoading}
                  >
                    {isCreateSubjectLoading ? "Загрузка..." : "Добавить"}
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