import { useAppDispatch, useAppSelector } from "@/app/store";
import { getGroupList } from "@/features/Groups/store/actions";
import React, { useEffect, useState } from "react";
import { Group } from "@/features/Groups/type";
import { selectGroups } from "@/features/Groups/store/selector";
import { Attendance, CurrentTime } from "../../type";
import { createAttendance } from "../../store/actions";
import { selectCreateAttendanceStatus, selectTime } from "../../store/selector";
import { StatusResponse } from "@/shared/enums";
import { SelectChangeEvent } from "@mui/material";
import { getTimeList } from "@/features/Time/store/actions";

const listService = () => {
  const headerLinks = [
    "Название",
    "Дни",
    "Время",
    "Текущий преподаватель",
    "Кол-во студентов",
    "",
  ];
  const [create, setCreate] = useState(false);
  const [groupAttendanceList, setGroupAttendanceList] = useState(false);
  const [editAttendance, setEditAttendance] = useState(false);
  const [page, setPage] = useState(1);
  const [activeGroup, setActiveGroup] = useState({} as Group);
  const [currentId, setCurrentId] = useState("");
  const [time, setTime] = useState("Текущее время");
  const timeChangeHandler = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };
  const dispatch = useAppDispatch();
  const timeList = useAppSelector(selectTime);
  const [dateState, setDateState] = useState(new Date());

  const createAttendanceStatus = useAppSelector(selectCreateAttendanceStatus);

  const groups = useAppSelector(selectGroups);
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 10000);
  }, []);

  useEffect(() => {
    dispatch(getTimeList());
  }, [time]);

  useEffect(() => {
    function getCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      return `${hours}.00-${+hours + 1}.00`;
    }
    const initialTime = getCurrentTime();
    const foundItem = timeList?.data.find((item) => item.time === initialTime);
    if (foundItem) {
      setCurrentId(foundItem.id.toString());
    }
  }, [timeList.data]);

  useEffect(() => {
    const dayOfWeek =
      new Date().getDay() === 0 ? "8" : new Date().getDay().toString();
    const selectedTime = time === "Текущее время" ? currentId : time;

    if (currentId !== "") {
      dispatch(
        getGroupList({
          filter: {
            day_of_the_week: dayOfWeek,
            time: selectedTime,
            archived: "false",
          },
          page,
        })
      );
    }
  }, [page, time, currentId]);

  useEffect(() => {
    if (createAttendanceStatus === StatusResponse.SUCCESS && create) {
      handleChangeCreateAttendance();
      dispatch(
        getGroupList({
          filter: {
            day_of_the_week:
              new Date().getDay() === 0 ? "8" : new Date().getDay().toString(),
            archived: "false",
          },
          page,
        })
      );
    }
  }, [createAttendanceStatus]);

  const handleChangeCreateAttendance = () => {
    setCreate(!create);
  };

  const handleChangeGroupAttendanceList = () => {
    setGroupAttendanceList(!groupAttendanceList);
  };

  const handleChangeEditAttendance = () => {
    setEditAttendance(!editAttendance);
  };

  const handleChangePage = (
    event: React.ChangeEvent<HTMLInputElement>,
    page: number
  ) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChangeActiveGroup = (group: Group) => {
    setActiveGroup(group);
  };

  const submitAttendance = (
    data: Omit<Attendance, "group"> & { teacher_who_conducted: number }
  ) => {
    dispatch(createAttendance({ ...data, group: activeGroup.id }));
  };

  return {
    headerLinks,
    dateState,
    handleChangeCreateAttendance,
    handleChangeActiveGroup,
    activeGroup,
    page,
    handleChangePage,
    submitAttendance,
    create,
    groups,
    groupAttendanceList,
    editAttendance,
    handleChangeGroupAttendanceList,
    handleChangeEditAttendance,
    time,
    timeChangeHandler,
    timeList,
  };
};

export default listService;


