import { tokensDark } from "@/app/providers/ThemeProvider";
import { MyInput, MyTextArea } from "@/shared/ui";
import { Header } from "@/widgets";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Formik } from "formik";
import { transferPaymentService } from "./transferPaymentService";
import { Student } from "@/features/Students/types";

const TransferPayment = ({ student }: { student: Student }) => {
  const {
    initialValues,
    onSubmit,
    validationSchema,
    isTransferPaymentLoading,
  } = transferPaymentService(student);

  return (
    <Box>
      <Header title="Перенести оплату" />
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
                  name="summ"
                  value={values.summ}
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Сумма"
                  errorMessage={errors.summ}
                  error={touched.summ && Boolean(errors.summ)}
                />
                <MyInput
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelName="Номер телефона получателя"
                  errorMessage={errors.phone}
                  error={touched.phone && Boolean(errors.phone)}
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
                  disabled={isTransferPaymentLoading}
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

export default TransferPayment;
