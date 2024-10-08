import { useAppDispatch, useAppSelector } from "@/app/store";
import { useEffect, useState } from "react";
import { getTrialLessons } from "@/features/Students/store/actions";
import {
  selectGetTrialStudentsStatus,
  selectTrialLessons,
} from "@/features/Students/store/selector";
import { useNavigate } from "react-router";

const trialLessonsService = (id: number) => {
  const headerLinks = [
    "Предмет",
    "Название",
    "Время",
    "Дни",
    "Дата пробного занятия",
    "Посетил ли",
    "Сгорел ли урок",
  ];

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const trialLessonsList = useAppSelector(selectTrialLessons);
  const getTrialLessonsStatus = useAppSelector(selectGetTrialStudentsStatus);
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(
      getTrialLessons({
        student: id,
        page,
      })
    );
  }, [page]);

  const handleChangePage = (
    event: React.ChangeEvent<HTMLInputElement>,
    page: number
  ) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    headerLinks,
    page,
    trialLessonsList,
    getTrialLessonsStatus,
    handleChangePage,
    navigate
  };
};

export default trialLessonsService;
