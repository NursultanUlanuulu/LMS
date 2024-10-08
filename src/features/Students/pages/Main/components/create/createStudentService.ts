import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectPromoters } from "@/features/Promoters/store/selector";
import { Roles, StatusResponse } from "@/shared/enums";
import { validator } from "@/shared/libs";
import { useMemo } from "react";
import * as yup from "yup";
import { createStudent } from "@/features/Students/store/actions";
import { selectCreateStudentStatus } from "@/features/Students/store/selector";
import { CreateStudent } from "@/features/Students/types";

export const createStudentService = () => {
  const promoters = useAppSelector(selectPromoters).data;
  const isCreateStudentLoading =
    useAppSelector(selectCreateStudentStatus) === StatusResponse.LOADING;
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
  });

  const promotersList = useMemo(() => {
    return promoters.map((promoter) => {
      return { value: promoter.id, text: promoter.name };
    });
  }, []);

  const initialValues: CreateStudent = {
    full_name: "",
    phone: "",
    optional_phone_list: [],
    date_birth: "",
    promoter: 0,
    user_type: Roles.Student,
    comment: "",
  };
  const onSubmit = (values: CreateStudent) => {
    dispatch(createStudent(values));
  };
  return {
    initialValues,
    validationSchema,
    promotersList,
    isCreateStudentLoading,
    onSubmit,
  };
};
