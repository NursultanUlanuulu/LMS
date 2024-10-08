import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { getGroupList } from "@/features/Groups/store/actions";
import { useParams } from "react-router";
import {
  selectGetGroupsStatus,
  selectGroups,
} from "@/features/Groups/store/selector";
import { StatusResponse } from "@/shared/enums";
import {
  selectAddStudentToGroupStatus,
  selectAddToPending,
} from "@/features/Students/store/selector";
import {
  changePriceOfStudGroup,
  deleteFromGroup,
  getMoneyForBook,
} from "@/features/Students/store/actions";
import { selectStudent } from "@/features/Students/store/selector";
import { Group } from "@/features/Groups/type";
import { SxProps, Theme } from "@mui/material";
import { tokensDark } from "@/app/providers/ThemeProvider";
import { reloadPage } from "@/shared/funcs/funcs";

const headerLinks = [
  "Предмет",
  "Название",
  "Время",
  "Дни",
  "Преподаватель",
  "Тип тарифа",
  "Цена обучения",
  "Кол-во студентов",
  "Книга",
];

export type ModalTypes =
  | "signUpForCourse"
  | "signUpForLesson"
  | "addToPending"
  | "studentAttendanceWithDate"
  | "studentAttendanceWithoutDate"
  | "takeMoneyForBook"
  | "deleteStudent"
  | "changePrice";

const btnStyles: SxProps<Theme> = {
  transition: "all 0.4s ease",
  background: tokensDark.greenAccent[500],
  "&:hover": {
    background: tokensDark.greenAccent[900],
  },
  "@media(max-width:600px)": {
    fontSize: "12px",
    width: "100%",
    marginLeft: "0 !important",
  },
  "@media(min-width:600px) and (max-width:900px)": {

    fontSize: "14px",
    width: "100%",
    marginLeft: "0 !important",
  },
};

export const coursesService = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const studentGroups = useAppSelector(selectGroups);
  const student = useAppSelector(selectStudent);
  const getGroupsStatus = useAppSelector(selectGetGroupsStatus);
  const isAddStudentToGroupSuccess =
    useAppSelector(selectAddStudentToGroupStatus) === StatusResponse.SUCCESS;
  const isAddToPendingSuccess =
    useAppSelector(selectAddToPending) === StatusResponse.SUCCESS;
  const [activeRow, setActiveRow] = useState({ group: "", tarif: "" });
  const [activeGroup, setActiveGroup] = useState({} as Group);
  const [modals, setModals] = useState<{ [key: string]: boolean }>({
    signUpForCourse: false,
    signUpForLesson: false,
    addToPending: false,
    studentAttendanceWithDate: false,
    studentAttendanceWithoutDate: false,
    changePrice: false,
    takeMoneyForBook: false,
    deleteStudent: false,
  });
  const handleChangeModals = (modal: ModalTypes) => {
    setModals({ ...modals, [modal]: !modals[modal] });

  };

  const handleChangeActiveGroup = (group: Group) => {
    setActiveGroup(group);
  };
  const takeMoneyForBook = () => {
    dispatch(getMoneyForBook({ student: Number(id), group: activeGroup.id }));
    handleChangeModals("takeMoneyForBook");
    reloadPage()
  };
  const deleteStudent = () => {
    dispatch(deleteFromGroup({ student: Number(id), group: activeGroup.id }));
    handleChangeModals("deleteStudent");
  };
  const changeStudGroupPrice = (price: number, tarif_type: string) => {
    dispatch(
      changePriceOfStudGroup({
        student: Number(id),
        group: Number(activeRow.group),
        tarif_sum: price.toString(),
        tarif: Number(activeRow.tarif),
        tarif_type: tarif_type
      })
    ).then(() => {
      dispatch(getGroupList({ filter: { student: id, archived: "false" }, page: 1 }));
    });
  };
  useEffect(() => {
    dispatch(getGroupList({ filter: { student: id, archived: "false" }, page: 1 }));
  }, []);

  useEffect(() => {
    if (modals.signUpForCourse && isAddStudentToGroupSuccess) {
      handleChangeModals("signUpForCourse");
    }
  }, [isAddStudentToGroupSuccess]);

  useEffect(() => {
    if (modals.addToPending && isAddToPendingSuccess) {
      handleChangeModals("addToPending");
    }
  }, [isAddToPendingSuccess]);

  return {
    studentGroups,
    modals,
    student,
    activeGroup,
    btnStyles,
    getGroupsStatus,
    headerLinks,
    id,
    handleChangeActiveGroup,
    handleChangeModals,
    setActiveRow,
    deleteStudent,
    takeMoneyForBook,
    changeStudGroupPrice,
  };
};
