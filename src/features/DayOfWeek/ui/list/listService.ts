import { selectDayOfWeek } from './../../store/selector';
import { getDayOfWeekList } from './../../store/actions';
import { DayOfWeek } from './../../type';
import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { useState } from "react"
import { StatusResponse } from "@/shared/enums"

type Modal = "info" | "create";

const service = () => {
  const headerLinks = ["Название"];
  const dispatch = useAppDispatch();
  const { data: list, status } = useAppSelector(selectDayOfWeek)
  const loading = status === StatusResponse.LOADING
  const success = status === StatusResponse.SUCCESS
  const error = status === StatusResponse.ERROR
  const isCreateSuccess =
    useAppSelector(s => s.DayOfWeek.create.status) === StatusResponse.SUCCESS;
  const isUpdateSuccess =
    useAppSelector(s => s.DayOfWeek.update.status) === StatusResponse.SUCCESS;
  const isDeleteSuccess =
    useAppSelector(s => s.DayOfWeek.delete.status) === StatusResponse.SUCCESS
  const [modal, setModal] = useState<{
    [key: string]: boolean;
  }>({
    create: false,
    info: false,
  });
  const [activeManager, setActiveManager] = useState({} as DayOfWeek);
  useEffect(() => {
    dispatch(getDayOfWeekList());
  }, []);
  const handleModal = (type: Modal) => {
    setModal({ ...modal, [type]: !modal[type] });
  }
  const handleChangeActiveManager = (manager: DayOfWeek) => {
    setActiveManager(manager);
  }
  useEffect(() => {
    if (isCreateSuccess && modal.create) {
      setModal({ ...modal, create: false });
    }
  }, [isCreateSuccess]);

  useEffect(() => {
    if ((isUpdateSuccess || isDeleteSuccess) && modal.info) {
      setModal({ ...modal, info: false });
    }
  }, [isUpdateSuccess, isDeleteSuccess]);
  return {
    headerLinks,
    modal,
    list,
    activeManager,
    handleModal,
    handleChangeActiveManager,
    success, error, loading
  };
};

export default service;