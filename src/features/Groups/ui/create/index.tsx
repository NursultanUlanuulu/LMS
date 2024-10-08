import { tokensDark } from "@/app/providers/ThemeProvider"
import { MyInput, MySelect, MyTextArea } from "@/shared/ui"
import { Header, MultipleSelect } from "@/widgets"
import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { Formik } from "formik"
import createService from "./createService"

const CreateGroup = ({ onClose }: { onClose: () => void }) => {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    times,
    daysOfWeek,
    subjects,
    teachers,
    books,
  } = createService(onClose)
  return (
    <Box>
      <Header title="Создание" />
      <Box sx={{ maxWidth: "600px" }}>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
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
                  errorMessage={errors.subject?.toString()}
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

                <MultipleSelect
                  menuItems={daysOfWeek}
                  inputLabel="Дни"
                  name="day_of_the_week"
                  handleChangeValue={handleChange}
                  elevation={0}
                  isTransparent={true}
                  value={values.day_of_the_week}
                />
                <MySelect
                  showNothing={false}
                  defaultValue={""}
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
                  defaultValue={""}
                  items={teachers}
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
                  type="number"
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
                <MySelect
                  showNothing={false}
                  defaultValue={""}
                  items={books}
                  labelName="Книга"
                  name="book"
                  onChange={handleChange}
                  onBlur={handleBlur}
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

export default CreateGroup
