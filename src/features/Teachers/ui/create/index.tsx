import { tokensDark } from "@/app/providers/ThemeProvider";
import { MyInput, MySelect, MyTextArea } from "@/shared/ui";
import { Header } from "@/widgets";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { FieldArray, Formik, getIn } from "formik";
import createService from "./createService";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CreateTeacher = ({ onClose }: { onClose: () => void }) => {
  const { initialValues, validationSchema, onSubmit, subjects } =
    createService(onClose);
  return (
    <Box>
      <Header title="Создание преподавателя" />
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
                <MySelect
                  name="predmet"
                  showNothing={false}
                  value={values.predmet}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Предмет"
                  errorMessage={errors.predmet}
                  error={touched.predmet && Boolean(errors.predmet)}
                  items={subjects.map((sub) => {
                    return {
                      text: sub.predmet,
                      value: sub.id,
                    };
                  })}
                  defaultValue={""}
                />
                <MyInput
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Н-р: 0555444777"
                  labelName="Номер телефона"
                  errorMessage={errors.phone}
                  error={touched.phone && Boolean(errors.phone)}
                />
                <FieldArray name="optional_phone_list">
                  {({ push, remove }) => {
                    return (
                      <div className="rooms_subform">
                        {values.optional_phone_list.map(
                          (i: any, index: number) => {
                            const phoneName = `optional_phone_list[${index}].phone`;
                            const touchedphoneName = getIn(touched, phoneName);
                            const errorphoneName = getIn(errors, phoneName);
                            return (
                              <div style={{ marginBottom: "20px" }} key={index}>
                                <Stack spacing={2} direction="row">
                                  <MyInput
                                    type="tel"
                                    name={phoneName}
                                    value={i.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    labelName=""
                                    placeholder="Доп.номер телефона"
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
                  name="inn"
                  value={values.inn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="ИНН"
                  errorMessage={errors.inn}
                  error={touched.inn && Boolean(errors.inn)}
                />
                <MyInput
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Адрес"
                  errorMessage={errors.address}
                  error={touched.address && Boolean(errors.address)}
                />
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
                <FieldArray name="education_list">
                  {({ push, remove }) => {
                    return (
                      <div>
                        {values.education_list.map((i: any, index: number) => {
                          const experienceName = `education_list[${index}].place_of_study`;
                          const touchedexperienceName = getIn(
                            touched,
                            experienceName
                          );
                          const errorexperienceName = getIn(
                            errors,
                            experienceName
                          );
                          return (
                            <div style={{ marginBottom: "20px" }} key={index}>
                              <Stack direction="row" spacing={2}>
                                <MyInput
                                  name={experienceName}
                                  value={i.place_of_study}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  labelName=""
                                  placeholder={
                                    index >= 1
                                      ? "Доп. учебное заведение"
                                      : "Учебное заведение"
                                  }
                                  error={Boolean(
                                    touchedexperienceName && errorexperienceName
                                  )}
                                  errorMessage={errorexperienceName}
                                />
                                {index >= 1 && (
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
                        })}
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => push({ place_of_study: "" })}
                        >
                          Добавить
                        </Button>
                      </div>
                    );
                  }}
                </FieldArray>
                <MyInput
                  name="staj"
                  value={values.staj}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Стаж"
                  errorMessage={errors.staj}
                  error={touched.staj && Boolean(errors.staj)}
                />
                <FieldArray name="work_list">
                  {({ push, remove }) => {
                    return (
                      <div>
                        {values.work_list.map((i: any, index: number) => {
                          const experienceName = `work_list[${index}].place_of_work`;
                          const touchedexperienceName = getIn(
                            touched,
                            experienceName
                          );
                          const errorexperienceName = getIn(
                            errors,
                            experienceName
                          );
                          return (
                            <div style={{ marginBottom: "20px" }} key={index}>
                              <Stack direction="row" spacing={2}>
                                <MyInput
                                  name={experienceName}
                                  value={i.place_of_work}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  labelName={index >= 1 ? "" : "Места работы"}
                                  placeholder={
                                    index >= 1
                                      ? "Доп. места работы"
                                      : "Места работы"
                                  }
                                  error={Boolean(
                                    touchedexperienceName && errorexperienceName
                                  )}
                                  errorMessage={errorexperienceName}
                                />
                                {index >= 1 && (
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
                        })}
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => push({ place_of_work: "" })}
                        >
                          Добавить
                        </Button>
                      </div>
                    );
                  }}
                </FieldArray>
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

export default CreateTeacher;
