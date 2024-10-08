import { tokensDark } from "@/app/providers/ThemeProvider";
import { MyInput, MyTextArea, MySelect } from "@/shared/ui";
import { Header } from "@/widgets";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Field, FieldArray, Formik, getIn } from "formik";
import { createStudentService } from "./createStudentService";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CreateStudent = () => {
  const {
    initialValues,
    validationSchema,
    promotersList,
    isCreateStudentLoading,
    onSubmit,
  } = createStudentService();
  return (
    <Box>
      <Header title="Добавление студента" />
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
                        {values.optional_phone_list &&
                          values.optional_phone_list.map(
                            (i: any, index: number) => {
                              const phoneName = `optional_phone_list[${index}].phone`;
                              const touchedphoneName = getIn(
                                touched,
                                phoneName
                              );
                              const errorphoneName = getIn(errors, phoneName);
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
                              );
                            }
                          )}
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => push({ phone: "" })}
                        >
                          Добавить
                        </Button>
                      </div>
                    );
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
                  disabled={isCreateStudentLoading}
                >
                  Сохранить
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default CreateStudent;
