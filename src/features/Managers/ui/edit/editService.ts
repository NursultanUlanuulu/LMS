import { useAppDispatch, useAppSelector } from "@/app/store";
import { StatusResponse } from "@/shared/enums";
import * as yup from "yup";
import { updateManager } from "../../store/actions";
import { selectEditManagerStatus } from "../../store/selector";
import { EditManager, Manager } from "../../type";
import { validator } from "@/shared/libs";

const editService = (manager: Manager) => {
  const isEditManagerLoading =
    useAppSelector(selectEditManagerStatus) === StatusResponse.LOADING;

  const dispatch = useAppDispatch();

  const validationSchema = yup.object().shape({
    name: yup.string().required("Обязательное поле"),
    surname: yup.string().required("Обязательное поле"),
    date_birth: yup.string().required("Обязтельное поле"),
    patronymic: yup.string().required("Обязтельное поле"),
    inn: yup
      .string()
      .required("Обязательное поле")
      .test("Неправильный формат ИНН", "Неправильный формат ИНН", (value) =>
        validator.innChecker(value)
      ),
    address: yup.string().required("Обязательное поле"),
  
  });

  const initialValues: EditManager = {
    id: manager.id,
    name: manager.name,
    surname: manager.surname,
    date_birth: manager.date_birth,
    patronymic: manager.patronymic,
    phone: manager.phone,
    inn: manager.inn,
    address: manager.address,
    password:manager.password,
  };
  console.log('====================================');
  console.log(initialValues);
  console.log('====================================');
  const onSubmit = (values: EditManager) => {
    dispatch(updateManager(values));
  };
  return { initialValues, validationSchema, isEditManagerLoading, onSubmit };
};

export default editService;
