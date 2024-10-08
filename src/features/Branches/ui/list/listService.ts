import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { getBranchesList } from "../../store/actions";
import {
  selectBranchesList,
  selectCreateBranchStatus,
  selectDeleteBranchStatus,
  selectEditBranchStatus,
  selectGetBranchesStatus,
} from "../../store/selector";
import { StatusResponse } from "@/shared/enums";
import { Branch } from "../../type";

type Modal = "info" | "create";

const service = () => {
  const headerLinks = ["Название", "Адрес"];
  const branches = useAppSelector(selectBranchesList);
  const dispatch = useAppDispatch();
  const getBranchesStatus = useAppSelector(selectGetBranchesStatus);
  const isCreateBranchSuccess =
    useAppSelector(selectCreateBranchStatus) === StatusResponse.SUCCESS;

  const isUpdateBranchSuccess =
    useAppSelector(selectEditBranchStatus) === StatusResponse.SUCCESS;

  const isDeleteBranchSuccess =
    useAppSelector(selectDeleteBranchStatus) === StatusResponse.SUCCESS;

  useEffect(() => {
    dispatch(getBranchesList());
  }, []);

  useEffect(() => {
    if (isCreateBranchSuccess && modal.create) {
      setModal({ ...modal, create: false });
    }
  }, [isCreateBranchSuccess]);

  useEffect(() => {
    if ((isUpdateBranchSuccess || isDeleteBranchSuccess) && modal.info) {
      setModal({ ...modal, info: false });
    }
  }, [isUpdateBranchSuccess, isDeleteBranchSuccess]);

  const [modal, setModal] = useState<{
    [key: string]: boolean;
  }>({
    create: false,
    info: false,
  });

  const [activeBranch, setActiveBranch] = useState({} as Branch);

  const handleModal = (type: Modal) => {
    setModal({ ...modal, [type]: !modal[type] });
  };

  const handleChangeActiveBranch = (branch: Branch) => {
    setActiveBranch(branch);
  };
  return {
    headerLinks,
    branches,
    modal,
    activeBranch,
    getBranchesStatus,
    handleModal,
    handleChangeActiveBranch,
  };
};

export default service;
