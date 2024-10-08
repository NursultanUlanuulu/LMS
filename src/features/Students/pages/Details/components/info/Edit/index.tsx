import { tokensDark } from "@/app/providers/ThemeProvider"
import { MyInput, MyTextArea, MySelect } from "@/shared/ui"
import { Header } from "@/widgets"
import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { FieldArray, Formik, getIn } from "formik"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { editService } from "./editService"
import { EditStudent, Student } from "@/features/Students/types"
import { useAppSelector } from "@/app/store"
import { selectPromoters } from "@/features/Promoters/store/selector"

const EditStudentProfile = ({ student }: { student: Student }) => {
  const promoters = useAppSelector(selectPromoters)
  const initialData: EditStudent = {
    id: student.id,
    full_name: student.full_name,
    date_birth: student.date_birth,
    optional_phone_list: student.phone_numbers,
    comment: student.comment,
    promoter:
      promoters.data.find(promoter => promoter.name === student.promoter)?.id ??
      0,
    phone: student.phone,
  }
  const {
    initialValues,
    validationSchema,
    promotersList,
    isEditStudentLoading,
    onSubmit,
  } = editService({
    initialData,
  })
  return (
    <Box>
      <Header title="Редактирование" />
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
                <MyInput
                  name="full_name"
                  value={values.full_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="ФИО"
                  errorMessage={errors.full_name}
                  error={touched.full_name && Boolean(errors.full_name)}
                />
                <MyInput
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Номер телефона"
                  errorMessage={errors.phone}
                  error={touched.phone && Boolean(errors.phone)}
                />
                <FieldArray name="optional_phone_list">
                  {({ push, remove }) => {
                    return (
                      <div className="rooms_subform">
                        {values.optional_phone_list?.length
                          ? values.optional_phone_list.map(
                              (i: any, index: number) => {
                                const phoneName = `optional_phone_list[${index}].phone`
                                const touchedphoneName = getIn(
                                  touched,
                                  phoneName
                                )
                                const errorphoneName = getIn(errors, phoneName)
                                return (
                                  <div
                                    style={{ marginBottom: "20px" }}
                                    key={index}
                                  >
                                    <Stack spacing={2} direction="row">
                                      <MyInput
                                        name={phoneName}
                                        value={i.phone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        labelName=""
                                        placeholder="Доп.телефон"
                                        error={Boolean(
                                          touchedphoneName && errorphoneName
                                        )}
                                        errorMessage={errorphoneName}
                                      />
                                      {index >= 0 && (
                                        <Button
                                          color="error"
                                          size="small"
                                          variant="contained"
                                          onClick={() => remove(index)}
                                        >
                                          <DeleteForeverIcon />
                                        </Button>
                                      )}
                                    </Stack>
                                  </div>
                                )
                              }
                            )
                          : null}
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => push({ phone: "" })}
                        >
                          Добавить
                        </Button>
                      </div>
                    )
                  }}
                </FieldArray>
                <MyInput
                  name="date_birth"
                  value={values.date_birth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="date"
                  labelName="Укажите дату рождения"
                  errorMessage={errors.date_birth}
                  error={touched.date_birth && Boolean(errors.date_birth)}
                />
                <MySelect
                  name="promoter"
                  value={values.promoter}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Откуда узнал"
                  errorMessage={errors.promoter}
                  error={touched.promoter && Boolean(errors.promoter)}
                  defaultValue=""
                  items={promotersList}
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
                <Button
                  sx={{ background: tokensDark.greenAccent[500] }}
                  variant="contained"
                  type="submit"
                  disabled={isEditStudentLoading}
                >
                  {isEditStudentLoading ? "Загрузка..." : "Изменить"}
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default EditStudentProfile
