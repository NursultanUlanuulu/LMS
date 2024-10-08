import { useAppDispatch, useAppSelector } from "@/app/store"
import { StatusResponse } from "@/shared/enums"
import * as yup from "yup"
import { createBranch } from "../../store/actions"
import { selectCreateBranchStatus } from "../../store/selector"
import { Branch } from "../../type"

const createService = () => {
  const dispatch = useAppDispatch()

  const isCreateBranchLoading =
    useAppSelector(selectCreateBranchStatus) === StatusResponse.LOADING

  const validationSchema = yup.object().shape({
    name: yup.string().required("Обязательное поле"),
    address: yup.string().required("Обязательное поле"),
  })

  const initialValues: Branch = {
    name: "",
    address: "",
  };
  const onSubmit = (values: Branch) => {
    dispatch(createBranch(values))
  }
  return { initialValues, validationSchema, onSubmit, isCreateBranchLoading }
}

export default createService
