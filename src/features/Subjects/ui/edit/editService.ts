import { updateSubject } from './../../store/actions';
import { selectEditSubjectStatus } from './../../store/selector';
import { EditSubject, Subject } from './../../type';
import { useAppDispatch, useAppSelector } from "@/app/store"
import { StatusResponse } from "@/shared/enums"
import * as yup from "yup"

const editService = (data: Subject) => {
  const isEditManagerLoading =
    useAppSelector(selectEditSubjectStatus) === StatusResponse.LOADING;
  const dispatch = useAppDispatch();
  const validationSchema = yup.object().shape({
    predmet: yup.string().required("Обязательное поле")
  });

  const initialValues: EditSubject = {
    predmet: data.predmet
  };
  const onSubmit = (values: EditSubject) => {
    dispatch(updateSubject({ subject: values, id: data.id }));
  };
  return { initialValues, validationSchema, isEditManagerLoading, onSubmit };
};

export default editService;
