import { tokensDark } from "@/app/providers/ThemeProvider"
import { MyInput, MySelect } from "@/shared/ui"
import { Header } from "@/widgets"
import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { Formik } from "formik"
import { Book } from "../../type"
import editService from "./editService"

const BookEdit = ({ book }: { book: Book }) => {
  const {
    initialValues,
    validationSchema,
    subjects,
    isEditBookLoading,
    onSubmit,
    branches,
  } = editService({
    book,
  })
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
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Название книги"
                  errorMessage={errors.title}
                  error={touched.title && Boolean(errors.title)}
                />
                <MyInput
                  name="quantity"
                  type="number"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Количество"
                  errorMessage={errors.quantity}
                  error={touched.quantity && Boolean(errors.quantity)}
                />

                <MyInput
                  name="price"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Цена"
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
                  defaultValue={values.branch || ""}
                  items={branches}
                />
                <Button
                  sx={{ background: tokensDark.greenAccent[500] }}
                  variant="contained"
                  type="submit"
                  disabled={isEditBookLoading}
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

export default BookEdit
