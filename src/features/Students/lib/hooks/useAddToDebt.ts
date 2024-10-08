import { validator } from "@/shared/libs";
import * as yup from "yup";
import { AddToDebt, TransferPayment } from "../../types";

const useAddToDebt = () => {
  const validationSchema = yup.object().shape({
    tarif: yup.string().required("Обязательное поле"),
    comment: yup.string().required("Обязательное поле"),
    startDate: yup.string().required("Обязтельное поле"),
  });

  const initialValues: AddToDebt = {
    tarif: "",
    startDate: "",
    comment: "",
  };
  const onSubmit = (values: AddToDebt) => {
  };
  return { initialValues, validationSchema, onSubmit };
};

export default useAddToDebt;
