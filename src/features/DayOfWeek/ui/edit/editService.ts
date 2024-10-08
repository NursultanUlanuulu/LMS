import { updateEditDayOfWeek } from './../../store/actions';
import { selectEditDayOfWeekStatus } from './../../store/selector';
import { EditDayOfWeek, DayOfWeek } from './../../type';
import { useAppDispatch, useAppSelector } from "@/app/store"
import { StatusResponse } from "@/shared/enums"
import * as yup from "yup"

const editService = (data: DayOfWeek) => {
  const isEditManagerLoading =
    useAppSelector(selectEditDayOfWeekStatus) === StatusResponse.LOADING;
  const dispatch = useAppDispatch();
  const validationSchema = yup.object().shape({
    week_day: yup.string().required("Обязательное поле")
  });

  const initialValues: EditDayOfWeek = {
    week_day: data.week_day
  };
  const onSubmit = (values: EditDayOfWeek) => {
    dispatch(updateEditDayOfWeek({ dayOfWeek: values, id: data.id }));
  };
  return { initialValues, validationSchema, isEditManagerLoading, onSubmit };
};

export default editService;
