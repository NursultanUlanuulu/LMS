import { tokensDark } from "@/app/providers/ThemeProvider"
import { Loading, MyInput, MySelect, MyTextArea } from "@/shared/ui"
import { Header } from "@/widgets"
import { Box, Skeleton } from "@mui/material"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { Formik } from "formik"
import editService from "./editService"

const EditGroup = () => {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    times,
    daysOfWeek,
    subjects,
    teachers,
    books,
    isLoading,
  } = editService()
  if (isLoading) {
    return (
      <Stack spacing={2} sx={{ maxWidth: "600px" }}>
        <Skeleton variant="text" width={"300px"} height={50} />
        {Array(7)
          .fill(2)
          .map((_, index) => {
            return (
              <Box>
                <Skeleton variant="text" width={"100px"} />
                <Skeleton variant="rounded" width={"100%"} height={40} />
              </Box>
            )
          })}
      </Stack>
    )
  }
  return (
    <Box>
      <Header title="Редактирование" />
      <Box sx={{ maxWidth: "600px" }}>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          enableReinitialize
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
                <MySelect
                  showNothing={false}
                  defaultValue={""}
                  items={subjects}
                  labelName="Предмет"
                  name="subject"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.subject}
                  error={touched.subject && Boolean(errors.subject)}
                />
                <MyInput
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Уровень группы"
                  errorMessage={errors.name}
                  error={touched.name && Boolean(errors.name)}
                />
                <MySelect
                  showNothing={false}
                  defaultValue={initialValues.time}
                  items={times}
                  labelName="Время"
                  name="time"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.time}
                  error={touched.time && Boolean(errors.time)}
                />
                <MySelect
                  showNothing={false}
                  defaultValue={initialValues.day_of_the_week}
                  items={daysOfWeek}
                  labelName="Дни"
                  name="day_of_the_week"
                  multiple={true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.day_of_the_week}
                  errorMessage={errors.day_of_the_week?.toString()}
                  error={
                    touched.day_of_the_week && Boolean(errors.day_of_the_week)
                  }
                />
                <MySelect
                  showNothing={false}
                  defaultValue={initialValues.current_teacher}
                  items={teachers}
                  value={initialValues.current_teacher}
                  labelName="Преподаватель"
                  name="current_teacher"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.current_teacher}
                  error={
                    touched.current_teacher && Boolean(errors.current_teacher)
                  }
                />
                <MyInput
                  name="max_student_count"
                  value={values.max_student_count}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Максимальное кол-во студентов"
                  errorMessage={errors.max_student_count}
                  error={
                    touched.max_student_count &&
                    Boolean(errors.max_student_count)
                  }
                />
                <MyInput
                  name="pourochno_price"
                  value={values.pourochno_price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Стоимость одного поурочного занятия"
                  errorMessage={errors.pourochno_price}
                  error={
                    touched.pourochno_price && Boolean(errors.pourochno_price)
                  }
                />
                <MyInput
                  name="number_of_lessons"
                  value={values.number_of_lessons}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Количество уроков"
                  errorMessage={errors.number_of_lessons}
                  error={
                    touched.number_of_lessons &&
                    Boolean(errors.number_of_lessons)
                  }
                />
                <MySelect
                  showNothing={false}
                  defaultValue={initialValues.book}
                  items={books}
                  labelName="Книга"
                  name="book"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.book}
                  error={touched.book && Boolean(errors.book)}
                />
                <MyInput
                  name="start_of_classes"
                  type="date"
                  value={values.start_of_classes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Начало обучения группы"
                  errorMessage={errors.start_of_classes}
                  error={
                    touched.start_of_classes && Boolean(errors.start_of_classes)
                  }
                />

                <MyTextArea
                  name="comment"
                  value={values.comment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Комментарий"
                  errorMessage={errors.comment}
                  error={touched.comment && Boolean(errors.comment)}
                />
                <MyTextArea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Описание группы"
                  errorMessage={errors.description}
                  error={touched.description && Boolean(errors.description)}
                />

                <Button
                  sx={{ background: tokensDark.greenAccent[500] }}
                  variant="contained"
                  type="submit"
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

export default EditGroup
