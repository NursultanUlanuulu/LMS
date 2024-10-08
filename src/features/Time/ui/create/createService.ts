import { useAppDispatch, useAppSelector } from "@/app/store";
import { StatusResponse } from "@/shared/enums";
import * as yup from "yup";
import { createTime } from "../../store/actions";
import { selectCreateTimeStatus } from "../../store/selector";
import { EditTime } from "../../type";

const createService = () => {
  const dispatch = useAppDispatch();
  const isCreaeteLoading =
    useAppSelector(selectCreateTimeStatus) === StatusResponse.LOADING;

  const validationSchema = yup.object().shape({
    time: yup.string().required("Обязательное поле")
  });

  const initialValues: EditTime = {
    time: ''
  };
  const onSubmit = (values: EditTime) => {
    dispatch(createTime(values));
  };
  return {
    initialValues,
    validationSchema,
    isCreaeteLoading,
    onSubmit,
  };
};

export default createService;
