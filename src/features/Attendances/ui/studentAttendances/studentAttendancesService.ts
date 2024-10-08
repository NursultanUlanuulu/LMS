import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { Group } from "@/features/Groups/type";
import {
  selectGetStudentsAttendancesStatus,
  selectStudentAttendances,
} from "../../store/selector";
import { getStudentAttendances } from "../../store/actions";
import { Student } from "@/features/Students/types";

export const studentAttendancesService = ({
  selectedGroup,
  student,
  end_date,
  start_date,
}: {
  selectedGroup: Group;
  student: Student;
  start_date?: string;
  end_date?: string;
}) => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const studentAttendancesList = useAppSelector(selectStudentAttendances);
  const getStudentsAttendancesStatus = useAppSelector(
    selectGetStudentsAttendancesStatus
  );

  useEffect(() => {
    dispatch(
      getStudentAttendances({
        attendance_group: selectedGroup.id,
        student: student.id,
        end_date: end_date
          ? new Date(end_date).toISOString().slice(0, 10)
          : undefined,
        start_date: start_date
          ? new Date(start_date).toISOString().slice(0, 10)
          : undefined,
        page,
      })
    );
  }, [page]);

  const sortedAttendancesByDate = useMemo(() => {
    const sortedDates = studentAttendancesList.data.slice().sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedDates;
  }, [studentAttendancesList]);

  const handleChangePage = (
    event: React.ChangeEvent<HTMLInputElement>,
    page: number
  ) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    getStudentsAttendancesStatus,
    page,
    studentAttendancesList,
    sortedAttendancesByDate,
    handleChangePage,
  };
};
