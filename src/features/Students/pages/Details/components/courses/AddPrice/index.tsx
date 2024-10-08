import { Button, Box, Stack } from "@mui/material"
import { Header } from "@/widgets"
import { Formik } from "formik"
import * as yup from "yup"
import { useAppSelector } from "@/app/store"
import { tokensDark } from "@/app/providers/ThemeProvider"
import { selectAddStudentToGroupStatus } from "@/features/Students/store/selector"
import { StatusResponse } from "@/shared/enums"
import { MyInput } from "@/shared/ui"

const AddPrice = ({
  callback,
  title = "Цена по которой студент будет обучаться",
  label = "Укажите цену",
}: {
  callback: (sum: number) => void
  title?: string
  label?: string
}) => {
  const isAddToGroupLoading =
    useAppSelector(selectAddStudentToGroupStatus) === StatusResponse.LOADING
  const initialValues = {
    sum: "",
  }
  const validationSchema = yup.object().shape({
    sum: yup.number().required("Обязательное поле"),
  })

  const onSubmit = (values: { sum: string }) => {
    if (values.sum) {
      callback(Number(values.sum))
    }
  }
  return (
    <Box>
      <Header title={title} />
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
                  name="sum"
                  type="number"
                  value={values.sum}
                  labelName={label}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.sum}
                  error={touched.sum && Boolean(errors.sum)}
                />
                <Button
                  sx={{ background: tokensDark.greenAccent[500] }}
                  variant="contained"
                  type="submit"
                  disabled={isAddToGroupLoading}
                >
                  Отправить
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default AddPrice
