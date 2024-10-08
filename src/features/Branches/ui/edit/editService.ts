import { useAppDispatch, useAppSelector } from "@/app/store"
import { StatusResponse } from "@/shared/enums"
import * as yup from "yup"
import { updateBranch } from "../../store/actions"
import { selectEditBranchStatus } from "../../store/selector"
import { Branch } from "../../type"

const editService = ({ branch }: { branch: Branch }) => {
  const isEditLoading =
    useAppSelector(selectEditBranchStatus) === StatusResponse.LOADING

  const dispatch = useAppDispatch()

  const validationSchema = yup.object().shape({
    name: yup.string().required("Обязательное поле"),
    address: yup.string().required("Обязательное поле"),
  })

  const initialValues: Branch = {
    name: branch.name,
    address: branch.address,
  };
  const onSubmit = (values: Branch) => {
    dispatch(updateBranch({ ...values, id: branch.id }))
  }
  return { initialValues, validationSchema, isEditLoading, onSubmit }
}

export default editService
