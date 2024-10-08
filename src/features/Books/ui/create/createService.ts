import React, { useEffect } from "react";
import { Book } from "../../type";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectSubjects } from "@/features/Subjects/store/selector";
import { selectCreateBookStatus } from "../../store/selector";
import { StatusResponse } from "@/shared/enums";
import { createBook } from "../../store/actions";
import { getBranchesList } from "@/features/Branches/store/actions";
import { selectBranchesList } from "@/features/Branches/store/selector";

const createService = () => {
  const dispatch = useAppDispatch();

  const subjects = useAppSelector(selectSubjects).data.map((subject) => {
    return { text: subject.predmet, value: subject.id };
  });
  const branches = useAppSelector(selectBranchesList).map((branch) => {
    return { text: branch.name, value: branch.id! };
  });
  const isCreateBookLoading =
    useAppSelector(selectCreateBookStatus) === StatusResponse.LOADING;

  const validationSchema = yup.object().shape({
    title: yup.string().required("Обязательное поле"),
    quantity: yup.number().required("Обязательное поле"),
    price: yup
    .number()
    .required("Обязательное поле")
    .test("Цена", "Цена должна быть больше или равно 0", (value) =>
       value!== undefined? value >= 0  : false
     ),
    predmet: yup
      .number()
      .required("Обязательное поле")
      .test("Предмет", "Выберите предмет", (value) =>
        value ? value > 0 : false
      ),
    branch: yup
      .number()
      .required("Обязательное поле")
      .test("Предмет", "Выберите предмет", (value) =>
        value ? value > 0 : false
      ),
  });

  const initialValues: Book = {
    title: "",
    predmet: 0,
    price: "",
    quantity: "",
    branch: 0
  };

  const onSubmit = (values: Book) => {
    dispatch(createBook(values));
  };
  useEffect(() => {
    dispatch(getBranchesList())
  }, [])
  return {
    initialValues,
    validationSchema,
    subjects,
    isCreateBookLoading,
    onSubmit,
    branches
  };
};

export default createService;
