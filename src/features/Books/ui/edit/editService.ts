import { useAppDispatch, useAppSelector } from "@/app/store";
import { getBranchesList } from "@/features/Branches/store/actions";
import { selectBranchesList } from "@/features/Branches/store/selector";
import { selectSubjects } from "@/features/Subjects/store/selector";
import { StatusResponse } from "@/shared/enums";
import { useEffect } from "react";
import * as yup from "yup";
import { updateBook } from "../../store/actions";
import { selectEditBookStatus } from "../../store/selector";
import { Book } from "../../type";

const editService = ({ book }: { book: Book }) => {
  const branches = useAppSelector(selectBranchesList).map((branch) => {
    return { text: branch.name, value: branch.id! };
  });

  const dispatch = useAppDispatch();

  const subjects = useAppSelector(selectSubjects).data.map((subject) => {
    return { text: subject.predmet, value: subject.id };
  });

  const isEditBookLoading =
    useAppSelector(selectEditBookStatus) === StatusResponse.LOADING;

  const validationSchema = yup.object().shape({
    title: yup.string().required("Обязательное поле"),
    quantity: yup.number().required("Обязательное поле"),
    price: yup
      .number()
      .required("Обязательное поле")
      .test("Цена", "Цена должна быть больше 0", (value) =>
        value ? value > 0 : false
      ),
    predmet: yup
      .number()
      .required("Обязательное поле")
      .test("Предмет", "Выберите Предмет", (value) =>
        value ? value > 0 : false
      ),
  });

  const initialValues: Book = {
    id: book.id,
    title: book.title,
    predmet: book.predmet,
    price: book.price,
    quantity: book.quantity,
    branch: book.branch
  };
  const onSubmit = (values: Book) => {
    dispatch(updateBook(values));
  }
  useEffect(() => {
    dispatch(getBranchesList())
  }, [])
  return {
    initialValues,
    validationSchema,
    subjects,
    isEditBookLoading,
    onSubmit,
    branches
  };
};

export default editService;
