import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectPromoters } from "@/features/Promoters/store/selector";
import * as yup from "yup";
import { EditStudent } from "@/features/Students/types";
import { useMemo } from "react";
import { updateStudent } from "@/features/Students/store/actions";
import { selectEditStudentStatus } from "@/features/Students/store/selector";
import { StatusResponse } from "@/shared/enums";

export const editService = ({ initialData }: { initialData: EditStudent }) => {
  const promoters = useAppSelector(selectPromoters);
  const isEditStudentLoading =
    useAppSelector(selectEditStudentStatus) === StatusResponse.LOADING;
  const dispatch = useAppDispatch();
  const validationSchema = yup.object().shape({
    full_name: yup.string().required("Обязательное поле"),
    date_birth: yup.string().required("Обязательное поле"),
    phone: yup
      .string()
      .required("Обязательное поле")
    ,
    promoter: yup
      .number()
      .required("Обязательное поле")
      .test("Источник информации", "Выберите источник информации", (value) =>
        value ? value > 0 : false
      ),
    comment: yup.string().required("Обязтальное поле"),
  });

  const promotersList = useMemo(() => {
    return promoters.data.map((promoter) => {
      return { text: promoter.name, value: promoter.id };
    });
  }, []);

  const initialValues: EditStudent = {
    id: initialData.id,
    full_name: initialData.full_name,
    phone: initialData.phone,
    promoter: initialData.promoter,
    optional_phone_list: initialData.optional_phone_list,
    date_birth: initialData.date_birth,
    comment: initialData.comment,
  }
  const onSubmit = (values: EditStudent) => {
    dispatch(updateStudent({ student: values, id: values.id }));
  };
  return {
    initialValues,
    validationSchema,
    promotersList,
    isEditStudentLoading,
    onSubmit,
  };
};
