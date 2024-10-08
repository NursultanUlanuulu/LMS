import { createSubject } from './../../store/actions';
import { Subject, EditSubject } from './../../type';
import { selectCreateSubjectStatus } from './../../store/selector';
import { useAppDispatch, useAppSelector } from "@/app/store";
import { StatusResponse } from "@/shared/enums";
import * as yup from "yup";

const createService = () => {
  const dispatch = useAppDispatch();
  const isCreateSubjectLoading =
    useAppSelector(selectCreateSubjectStatus) === StatusResponse.LOADING;

  const validationSchema = yup.object().shape({
    predmet: yup.string().required("Обязательное поле")
  });

  const initialValues: EditSubject = {
    predmet: ''
  };
  const onSubmit = (values: EditSubject) => {
    dispatch(createSubject(values));
  };
  return {
    initialValues,
    validationSchema,
    isCreateSubjectLoading,
    onSubmit,
  };
};

export default createService;
