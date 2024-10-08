import { tokensDark } from "@/app/providers/ThemeProvider";
import { MyInput, MySelect } from "@/shared/ui";
import { Header } from "@/widgets";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Formik } from "formik";
import createService from "./createService";

const CreateManager = () => {
  const {
    initialValues,
    validationSchema,
    isCreateManagerLoading,
    branches,
    onSubmit,
  } = createService();

  return (
    <Box>
      <Header title="Добавление" />
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
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing={2}>
                  <MyInput
                    name="surname"
                    value={values.surname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    labelName="Фамилия"
                    errorMessage={errors.surname}
                    error={touched.surname && Boolean(errors.surname)}
                  />
                  <MyInput
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    labelName="Имя"
                    errorMessage={errors.name}
                    error={touched.name && Boolean(errors.name)}
                  />

                  <MyInput
                    name="patronymic"
                    value={values.patronymic}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    labelName="Отчество"
                    errorMessage={errors.patronymic}
                    error={touched.patronymic && Boolean(errors.patronymic)}
                  />

                  <MyInput
                    name="date_birth"
                    value={values.date_birth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="date"
                    labelName="Дата рождения"
                    errorMessage={errors.date_birth}
                    error={touched.date_birth && Boolean(errors.date_birth)}
                  />
                  <MyInput
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="tel"
                    placeholder="Н-р: 0555777444"
                    labelName="Номер телефона"
                    errorMessage={errors.phone}
                    error={touched.phone && Boolean(errors.phone)}
                  />

                  <MyInput
                    name="inn"
                    value={values.inn}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                    labelName="ИНН"
                    errorMessage={errors.inn}
                    error={touched.inn && Boolean(errors.inn)}
                  />
                  <MyInput
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    labelName="Адрес"
                    errorMessage={errors.address}
                    error={touched.address && Boolean(errors.address)}
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
                  <MyInput
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    labelName="Пароль"
                    errorMessage={errors.password}
                    error={touched.password && Boolean(errors.password)}
                  />
                  <Button
                    sx={{ background: tokensDark.greenAccent[500] }}
                    variant="contained"
                    type="submit"
                    disabled={isCreateManagerLoading}
                  >
                    Добавить
                  </Button>
                </Stack>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default CreateManager;
