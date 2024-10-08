import { tokensDark } from "@/app/providers/ThemeProvider"
import { MyInput } from "@/shared/ui"
import { Header } from "@/widgets"
import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { Formik } from "formik"
import { Promoter } from "../../type"
import editService from "./editService"

const ManagerEdit = ({ data }: { data: Promoter }) => {
  const { initialValues, validationSchema, isEditManagerLoading, onSubmit } =
    editService(data)

  return (
    <Box>
      <Header title="Редактирование" />
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
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack direction="column" spacing={2}>
                <MyInput
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Название"
                  errorMessage={errors.name}
                  error={touched.name && Boolean(errors.name)}
                />

                <Button
                  sx={{ background: tokensDark.greenAccent[500] }}
                  variant="contained"
                  type="submit"
                  disabled={isEditManagerLoading}
                >
                  {isEditManagerLoading ? "Загрузка..." : "Сохранить"}
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default ManagerEdit
