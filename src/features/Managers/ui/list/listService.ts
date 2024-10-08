import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useState } from "react";
import { deleteManager, getManagersList } from "../../store/actions";
import {
  selectCreateManagerStatus,
  selectDeleteManagerStatus,
  selectEditManagerStatus,
  selectGetManagersStatus,
  selectManagersList,
} from "../../store/selector";
import { StatusResponse } from "@/shared/enums";
import { getBranchesList } from "@/features/Branches/store/actions";
import { Manager } from "../../type";

type Modal = "edit" | "create" | "delete";

const service = () => {
  const headerLinks = ["ФИО", "ФИЛИАЛ", ""];
  const dispatch = useAppDispatch();
  const managers = useAppSelector(selectManagersList);

  const getManagersStatus = useAppSelector(selectGetManagersStatus);
  const isCreateManagerSuccess =
    useAppSelector(selectCreateManagerStatus) === StatusResponse.SUCCESS;

  const isEditManagerSucces =
    useAppSelector(selectEditManagerStatus) === StatusResponse.SUCCESS;

  const isDeleteManagerSucces =
    useAppSelector(selectDeleteManagerStatus) === StatusResponse.SUCCESS;
  const [modal, setModal] = useState<{
    [key: string]: boolean;
  }>({
    create: false,
    edit: false,
    delete: false,
  });

  const [activeManager, setActiveManager] = useState({} as Manager);
  useEffect(() => {
    dispatch(getManagersList());
    dispatch(getBranchesList());
  }, []);

  useEffect(() => {
    if (isCreateManagerSuccess && modal.create) {
      setModal({ ...modal, create: false });
    }
  }, [isCreateManagerSuccess]);

  useEffect(() => {
    if (isEditManagerSucces && modal.edit) {
      setModal({ ...modal, edit: false });
    }
  }, [isEditManagerSucces]);

  useEffect(() => {
    if (isDeleteManagerSucces && modal.delete) {
      setModal({ ...modal, delete: false });
    }
  }, [isDeleteManagerSucces]);

  const handleModal = (type: Modal) => {
    setModal({ ...modal, [type]: !modal[type] });
  };

  const handleDeleteManager = () => {
    dispatch(deleteManager(activeManager.id ?? 0));
  };
  const handleChangeActiveManager = (manager: Manager) => {
    setActiveManager(manager);
  };
  return {
    headerLinks,
    modal,
    managers,
    getManagersStatus,
    activeManager,
    handleModal,
    handleChangeActiveManager,
    handleDeleteManager,
  };
};

export default service;
