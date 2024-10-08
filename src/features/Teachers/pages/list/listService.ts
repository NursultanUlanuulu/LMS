import { useAppSelector } from "@/app/store";
import { useEffect } from "react";
import React, { useState } from "react";
import { useAppDispatch } from "@/app/store";
import { getList } from "../../store/actions";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "@/shared/data";
import { StatusResponse } from "@/shared/enums";
import { selectListTeachers } from "../../store/selector";

const service = () => {
  const headerLinks = [
    "ФИО",
    "Предмет",
    "Дата рождения",
    "Возраст",
    "Номер телефона",
    "ИНН",
    "Адрес",
  ];
  const [createModal, setCreateModal] = useState(false);
  // const [infoModal, setInfoModal] = useState(false)
//   const [teacherId, setTeacherId] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(Number(id));
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState({
    search: "",
    status: "true",
  });
  const listState = useAppSelector(selectListTeachers);
  const isLoading = listState.status === StatusResponse.LOADING;
  const isError = listState.status === StatusResponse.ERROR;
  const isSuccess = listState.status === StatusResponse.SUCCESS;

  const handleChangeFilter = (event: any) => {
    setFilter({ ...filter, status: event.target.value });
  };
  const onCloseCreateModal = () => {
    setCreateModal(false);
  };
  const onOpenCreateModal = () => {
    setCreateModal(true);
  };
  // const onCloseInfoModal = () => {
  //     setInfoModal(false)

  // }
  // const onOpenInfoModal = (id: number) => {
  //     setInfoModal(true)
  //     setTeacherId(id.toString())
  // }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, search: event.target.value });
  };
  const handleSearchClick = () => {
    dispatch(
      getList({ search: filter.search, page, is_active: filter.status })
    );
  };
  const handleChangePage = (
    _: React.ChangeEvent<HTMLInputElement>,
    page: number
  ) => {
    setPage(page);
    navigate(`/${ROUTES.teachers}/${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const resetFilter = () => {
    setFilter({
      search: "",
      status: "true",
    });
    dispatch(getList({ search: "", page, is_active: "true" }));
  };
  useEffect(() => {
    dispatch(
      getList({ search: filter.search, page, is_active: filter.status })
    );
  }, [page, filter.status]);
  useEffect(() => {
    setPage(Number(id));
  }, [id]);

  return {
    headerLinks,
    listState,
    onCloseCreateModal,
    onOpenCreateModal,
    createModal,
    handleChangeFilter,
    filter,
    handleSearch,
    handleSearchClick,
    isError,
    isLoading,
    isSuccess,
    handleChangePage,
    page,
    resetFilter,
  };
};

export default service;
