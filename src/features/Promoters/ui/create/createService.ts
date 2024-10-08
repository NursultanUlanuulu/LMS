import { createPromoter } from './../../store/actions';
import { Promoter, EditPromoter } from './../../type';
import { selectCreatePromoterStatus } from './../../store/selector';
import { useAppDispatch, useAppSelector } from "@/app/store";
import { StatusResponse } from "@/shared/enums";
import * as yup from "yup";

const createService = () => {
  const dispatch = useAppDispatch();
  const isCreaeteLoading =
    useAppSelector(selectCreatePromoterStatus) === StatusResponse.LOADING;

  const validationSchema = yup.object().shape({
    name: yup.string().required("Обязательное поле")
  });

  const initialValues: EditPromoter = {
    name: ''
  };
  const onSubmit = (values: EditPromoter) => {
    dispatch(createPromoter(values));
  };
  return {
    initialValues,
    validationSchema,
    isCreaeteLoading,
    onSubmit,
  };
};

export default createService;
