import { getTimeList } from "./../../../Time/store/actions";
import { selectListTeachers } from "./../../../Teachers/store/selector";
import { getDayOfWeekList } from "./../../../DayOfWeek/store/actions";
import { getSubjectsList } from "@/features/Subjects/store/actions";
import { selectGroups } from "./../../store/selector";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { getGroupList } from "../../store/actions";
import { useParams } from "react-router";
import { StatusResponse } from "@/shared/enums";
import { ROUTES } from "@/shared/data";
import { Filter } from "../../type";
import { getList } from "@/features/Teachers/store/actions";
import { selectSubjects } from "@/features/Subjects/store/selector";
import { selectDayOfWeek } from "@/features/DayOfWeek/store/selector";
import { selectTime } from "@/features/Time/store/selector";

const service = () => {
  const headerLinks = [
    "Предмет",
    "Уровень группы",
    "Дни",
    "Время",
    "Текущий преподаватель",
    "кол-во студентов",
    "",
  ];

  const [createModal, setCreateModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(Number(id));
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<Filter>({
    subject: "",
    day_of_the_week: "",
    time: "",
    current_teacher: "",
    group_status: "",
    archived: "false",
  });
  const listState = useAppSelector(selectGroups);
  const isLoading = listState.status === StatusResponse.LOADING;
  const isError = listState.status === StatusResponse.ERROR;
  const isSuccess = listState.status === StatusResponse.SUCCESS;
  const teachers = useAppSelector(selectListTeachers).data.map((teacher) => {
    return {
      text: teacher.full_name,
      value: teacher.id,
    };
  });
  const subjects = useAppSelector(selectSubjects).data.map((subject) => {
    return {
      text: subject.predmet,
      value: subject.id,
    };
  });
  const daysOfWeek = useAppSelector(selectDayOfWeek).data.map((day) => {
    return {
      text: day.week_day,
      value: day.id,
    };
  });
  const times = useAppSelector(selectTime).data.map((time) => {
    return {
      text: time.time,
      value: time.id,
    };
  });
  const handleChangeFilter = (event: any) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  const onCloseCreateModal = () => {
    setCreateModal(false);
  };
  const onOpenCreateModal = () => {
    setCreateModal(true);
  };

  const resetFilter = () => {
    setFilter({
      subject: "",
      day_of_the_week: "",
      time: "",
      current_teacher: "",
      group_status: "",
      archived: "false",
    });
  };
  const handleChangePage = (
    event: React.ChangeEvent<HTMLInputElement>,
    page: number
  ) => {
    setPage(page);
    navigate(`/${ROUTES.groups}/${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    dispatch(getGroupList({ filter, page }));
  }, [page, filter]);
  useEffect(() => {
    setPage(Number(id));
    dispatch(getSubjectsList());
    dispatch(getDayOfWeekList());
    dispatch(getTimeList());
    dispatch(
      getList({ search: "", page: 1, per_page: 100, is_active: "true" })
    );
  }, [id]);
  return {
    headerLinks,
    onCloseCreateModal,
    onOpenCreateModal,
    createModal,
    handleChangeFilter,
    filter,
    resetFilter,
    isError,
    isLoading,
    isSuccess,
    handleChangePage,
    page,
    listState,
    teachers,
    subjects,
    daysOfWeek,
    times,
    navigate,
  };
};

export default service;
