import { updateTime } from './../../store/actions';
import { Time, EditTime } from './../../type';
import { useAppDispatch, useAppSelector } from "@/app/store"
import { StatusResponse } from "@/shared/enums"
import * as yup from "yup"
import { selectEditTimeStatus } from "../../store/selector";

const editService = (data: Time) => {
  const isEditManagerLoading =
    useAppSelector(selectEditTimeStatus) === StatusResponse.LOADING;
  const dispatch = useAppDispatch();
  const validationSchema = yup.object().shape({
    time: yup.string().required("Обязательное поле")
  });

  const initialValues: EditTime = {
    time: data.time
  };
  const onSubmit = (values: EditTime) => {
    dispatch(updateTime({ time: values, id: data.id }));
  };
  return { initialValues, validationSchema, isEditManagerLoading, onSubmit };
};

export default editService;
