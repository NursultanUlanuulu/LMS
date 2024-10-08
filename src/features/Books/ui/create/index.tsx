import { tokensDark } from "@/app/providers/ThemeProvider"
import { MyInput, MySelect } from "@/shared/ui"
import { Header } from "@/widgets"
import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { Formik } from "formik"
import createService from "./createService"

const CreateBook = () => {
  const {
    initialValues,
    validationSchema,
    subjects,
    isCreateBookLoading,
    onSubmit,
    branches,
  } = createService()
  return (
    <Box>
      <Header title="Добавление книг" />
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
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Название"
                  errorMessage={errors.title}
                  error={touched.title && Boolean(errors.title)}
                />
                <MyInput
                  name="quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Количество"
                  type="number"
                  errorMessage={errors.quantity}
                  error={touched.quantity && Boolean(errors.quantity)}
                />
                <MyInput
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Цена"
                  type="number"
                  errorMessage={errors.price}
                  error={touched.price && Boolean(errors.price)}
                />

                <MySelect
                  name="predmet"
                  value={values.predmet}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Предмет"
                  errorMessage={errors.predmet}
                  error={touched.predmet && Boolean(errors.predmet)}
                  defaultValue=""
                  items={subjects}
                />
                <MySelect
                  name="branch"
                  value={values.branch}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Филиал"
                  errorMessage={errors.branch}
                  error={touched.branch && Boolean(errors.branch)}
                  defaultValue=""
                  items={branches}
                />
                <Button
                  sx={{ background: tokensDark.greenAccent[500] }}
                  variant="contained"
                  type="submit"
                  disabled={isCreateBookLoading}
                >
                  Сохранить
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default CreateBook
