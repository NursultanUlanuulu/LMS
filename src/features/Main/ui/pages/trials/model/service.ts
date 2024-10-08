import { useEffect, useState } from "react";
import {
  selectTimeForTrails,
  selectTrials,
} from "./../../../../store/selector";
import { useAppSelector, useAppDispatch } from "./../../../../../../app/store";
import { getTrialsList } from "@/features/Main/store/actions";
import { selectSubjects } from "@/features/Subjects/store/selector";
import { TrialFilter } from "@/features/Main/type";
import { getTimeList } from "@/features/Time/store/actions";
import { SelectChangeEvent } from "@mui/material";

interface Filter {
  subject: string;
  day: string[];
  time: string[];
}
const listService = () => {
  const headerLinks = [
    "ФИО",
    "Номер телефона",
    "Наименование группы",
    "Дата пробного занятия",
    "Дни",
    "Время урока",
    "Предмет",
    "",
  ];
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(1);
  const [time, setTime] = useState("Выберите время");
  const [filter, setFilter] = useState<TrialFilter>({
    lesson_date: "",
    group__subject: "",
  });

  const subjects = useAppSelector(selectSubjects).data.map((subject) => {
    return {
      text: subject.predmet,
      value: subject.id,
    };
  });
  const list = useAppSelector(selectTrials);
  const handleChangeFilter = (event: any) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };
  const handleChangePage = (
    event: React.ChangeEvent<HTMLInputElement>,
    page: number
  ) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const times = time === "Выберите время" ? "" : time;
    dispatch(getTrialsList({ page, filter, search, group__time: times }));
  }, [page, filter, time]);

  const handleSearchClick = () => {
    dispatch(getTrialsList({ page, filter, search }));
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);
  const resetSearchIcon = () => {
    setSearch("");
    dispatch(getTrialsList({ page }));
  };
  const timeList = useAppSelector(selectTimeForTrails);
  const timeChangeHandler = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };
  const resetHandler = () => {
    setTime("");
    setSearch("");
    setFilter({ lesson_date: "", group__subject: "" });
  };

  useEffect(() => {
    dispatch(getTimeList());
  }, [time]);
  return {
    headerLinks,
    list,
    handleChangePage,
    page,
    subjects,
    filter,
    handleChangeFilter,
    handleSearchClick,
    handleSearchChange,
    search,
    resetSearchIcon,
    time,
    timeChangeHandler,
    timeList,
    resetHandler,
  };
};

export default listService;
