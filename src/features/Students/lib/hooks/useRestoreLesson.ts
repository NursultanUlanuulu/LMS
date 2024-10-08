import { validator } from "@/shared/libs";
import * as yup from "yup";
import { AddToPending, RestoreLesson } from "../../types";

const useRestoreLesson = () => {
  const validationSchema = yup.object().shape({
    lessonsQuantity: yup.number().required("Обязатальное поле"),
    paymentStartDate: yup.string().required("Обязательное поле"),
    comment: yup.string().required("Обязательное поле"),
  });

  const initialValues: RestoreLesson = {
    lessonsQuantity: 0,
    paymentStartDate: "",
    comment: "",
  };
  const onSubmit = (values: RestoreLesson) => {
  };
  return { initialValues, validationSchema, onSubmit };
};

export default useRestoreLesson;
