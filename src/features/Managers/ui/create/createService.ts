import { getBranchesList } from "./../../../Branches/store/actions";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectBranchesList } from "@/features/Branches/store/selector";
import { StatusResponse } from "@/shared/enums";
import * as yup from "yup";
import { createManager } from "../../store/actions";
import { selectCreateManagerStatus } from "../../store/selector";
import { Manager } from "../../type";
import { validator } from "@/shared/libs";

const createService = () => {
  const dispatch = useAppDispatch();

  const isCreateManagerLoading =
    useAppSelector(selectCreateManagerStatus) === StatusResponse.LOADING;

  const branches = useAppSelector(selectBranchesList).map((branch) => {
    return { value: branch.id ?? 0, text: branch.name };
  });

  const validationSchema = yup.object().shape({
    name: yup.string().required("Обязательное поле"),
    surname: yup.string().required("Обязательное поле"),
    password: yup.string().required("Обязательное поле"),
    branch: yup
      .number()
      .required("Обязательное поле")
      .test("Филиал", "Выберите филиал", (value) =>
        value ? value > 0 : false
      ),
    inn: yup
      .string()
      .required("Обязательное поле")
      .test("Неправильный формат ИНН", "Неправильный формат ИНН", (value) =>
        validator.innChecker(value)
      ),
    address: yup.string().required("Обязательное поле"),
    phone: yup
      .string()
      .required("Обязательное поле")
      .test(
        "Неправильный формат номера телефона",
        "Неправильный формат номера телефона",
        (value) => validator.phoneWithout996Checker(value)
      ),
    date_birth: yup.string().required("Обязательное поле"),
    patronymic: yup.string().required("Обязтательное поле"),
  });

  const initialValues: Manager = {
    name: "",
    surname: "",
    date_birth: "",
    patronymic: "",
    password: "",
    branch: 0,
    phone: "",
    inn: "",
    address: "",
  };
  const onSubmit = (values: Manager) => {
    dispatch(createManager(values));
  };
  useEffect(() => {
    dispatch(getBranchesList());
  }, []);
  return {
    initialValues,
    validationSchema,
    isCreateManagerLoading,
    branches,
    onSubmit,
  };
};

export default createService;
