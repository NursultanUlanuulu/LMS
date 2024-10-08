import { useAppDispatch, useAppSelector } from "@/app/store";
import { StatusResponse } from "@/shared/enums";
import { validator } from "@/shared/libs";
import * as yup from "yup";
import { transferPayment } from "@/features/Students/store/actions";
import { selectTransferPaymentStatus } from "@/features/Students/store/selector";
import { Student, TransferPayment } from "@/features/Students/types";

export const transferPaymentService = (student: Student) => {
  const dispatch = useAppDispatch();
  const isTransferPaymentLoading =
    useAppSelector(selectTransferPaymentStatus) === StatusResponse.LOADING;

  const validationSchema = yup.object().shape({
    summ: yup.number().required("Обязательное поле"),
    phone: yup
      .string()
      .required("Обязательное поле")
      .test(
        "Введите корректный номер телефона.",
        "Введите корректный номер телефона.",
        (value) => validator.phoneWithout996Checker(value)
      ),
    comment: yup.string().required("Обязательное поле"),
  });

  const initialValues: TransferPayment = {
    phone: "",
    summ: 0,
    comment: "",
  };
  const onSubmit = (values: TransferPayment) => {
    dispatch(
      transferPayment({
        balance: String(values.summ),
        comment: values.comment,
        phone: values.phone,
        studentId: student.id,
      })
    );
  };
  return {
    initialValues,
    validationSchema,
    onSubmit,
    isTransferPaymentLoading,
  };
};
