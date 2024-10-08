import { updatePromoter } from './../../store/actions';
import { selectEditPromoterStatus } from './../../store/selector';
import { EditPromoter, Promoter } from './../../type';
import { useAppDispatch, useAppSelector } from "@/app/store"
import { StatusResponse } from "@/shared/enums"
import * as yup from "yup"

const editService = (data: Promoter) => {
  const isEditManagerLoading =
    useAppSelector(selectEditPromoterStatus) === StatusResponse.LOADING;
  const dispatch = useAppDispatch();
  const validationSchema = yup.object().shape({
    name: yup.string().required("Обязательное поле")
  });

  const initialValues: EditPromoter = {
    name: data.name
  };
  const onSubmit = (values: EditPromoter) => {
    dispatch(updatePromoter({ promoter: values, id: data.id }));
  };
  return { initialValues, validationSchema, isEditManagerLoading, onSubmit };
};

export default editService;
