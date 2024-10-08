import { createDayOfWeek } from './../../store/actions';
import { DayOfWeek, EditDayOfWeek } from './../../type';
import { selectCreateDayOfWeekStatus } from './../../store/selector';
import { useAppDispatch, useAppSelector } from "@/app/store";
import { StatusResponse } from "@/shared/enums";
import * as yup from "yup";

const createService = () => {
  const dispatch = useAppDispatch();
  const isCreaeteLoading =
    useAppSelector(selectCreateDayOfWeekStatus) === StatusResponse.LOADING;

  const validationSchema = yup.object().shape({
    week_day: yup.string().required("Обязательное поле")
  });

  const initialValues: EditDayOfWeek = {
    week_day: ''
  };
  const onSubmit = (values: EditDayOfWeek) => {
    dispatch(createDayOfWeek(values));
  };
  return {
    initialValues,
    validationSchema,
    isCreaeteLoading,
    onSubmit,
  };
};

export default createService;
