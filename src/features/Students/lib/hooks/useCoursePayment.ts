import * as yup from "yup";
import { CoursePayment } from "../../types";

const useCoursePayment = () => {
  const validationSchema = yup.object().shape({
    lessonsQuantity: yup.number().required("Обязательное поле"),
    paymentStartDate: yup.string().required("Обязательное поле"),
    tarif: yup.string().required("Обязательное поле"),
    comment: yup.string().required("Обязательное поле"),
  });

  const initialValues: CoursePayment = {
    lessonsQuantity: 0,
    paymentStartDate: "",
    tarif: "",
    comment: "",
  };
  const onSubmit = (values: CoursePayment) => {
  };
  return { initialValues, validationSchema, onSubmit };
};

export default useCoursePayment;
