import { tokensDark } from "@/app/providers/ThemeProvider"
import { MyInput, MySelect } from "@/shared/ui"
import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { Formik } from "formik"
import { addToPendingService } from "./addToPendingService"
import { Header, MultipleSelect } from "@/widgets"

const AddToPending = () => {
  const {
    initialValues,
    days,
    subjects,
    teachers,
    time,
    onSubmit,
    validationSchema,
  } = addToPendingService()

  return (
    <Box>
      <Header title="Добавить в ожидание" />
      <Box sx={{ maxWidth: "600px", mt: "20px" }}>
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
                <Stack direction="column" spacing={3}>
                  <MySelect
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    labelName="Предмет"
                    errorMessage={errors.subject}
                    error={touched.subject && Boolean(errors.subject)}
                    defaultValue=""
                    items={subjects}
                  />
                  <MySelect
                    name="teacher"
                    labelName="Выберите преподавателя"
                    value={values.teacher}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.teacher}
                    error={touched.teacher && Boolean(errors.teacher)}
                    items={teachers}
                    defaultValue=""
                  />

                  <MyInput
                    placeholder="Уровень"
                    name="level"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.level && Boolean(errors.level)}
                    errorMessage={errors.level}
                    value={values.level}
                  />
                  <MySelect
                    name="day_of_the_week"
                    labelName="Выберите дни"
                    multiple
                    value={values.day_of_the_week}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.day_of_the_week?.toString()}
                    error={
                      touched.day_of_the_week && Boolean(errors.day_of_the_week)
                    }
                    items={days}
                    defaultValue=""
                  />
                  <MySelect
                    name="time"
                    labelName="Выберите время"
                    value={values.time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.time}
                    error={touched.time && Boolean(errors.time)}
                    items={time}
                    defaultValue=""
                  />

                  <MyInput
                    placeholder="Комментарий"
                    name="comment"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.comment && Boolean(errors.comment)}
                    errorMessage={errors.comment}
                    value={values.comment}
                  />
                  <Button
                    sx={{ background: tokensDark.greenAccent[500] }}
                    variant="contained"
                    type="submit"
                  >
                    Добавить
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

export default AddToPending
