import {
  selectGetGroupAttendancesStatusHistory,
  selectGroupAttendanceStudentsHistory,
} from "../../store/selectors";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { useEffect, useMemo, useState } from "react";
import { getGroupAttendancesHistory } from "../../store/actions";

import { format } from "date-fns";

export const historyService = () => {
  const [selectedTime, setSelectedTime] = useState<Date>();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const attendancesList = useAppSelector(selectGroupAttendanceStudentsHistory);
  const getStudentsStatus = useAppSelector(
    selectGetGroupAttendancesStatusHistory
  );
  const formattedDateStr = format(
    selectedTime ?? new Date(),
    "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
  );

  const handleTimeChange = (time: any) => {
    setSelectedTime(time[0]);
  };
  ///
  const resetHandler = () => {
    setSelectedTime(undefined);
    setSearch("");
  };
  const handleChangePage = (
    event: React.ChangeEvent<HTMLInputElement>,
    newPage: number
  ) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const attendanceHistoryParams = {
      page,
      in_date: selectedTime ? formattedDateStr : "",
    };
    dispatch(getGroupAttendancesHistory(attendanceHistoryParams));
  }, [page, selectedTime]);

  const sortedData = useMemo(() => {
    const validEntries = attendancesList.data.filter(
      (gr) => gr.students !== null
    );
    const sortedData = validEntries.sort(
      (a: { date: string }, b: { date: string }) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return sortedData;
  }, [attendancesList]);

  //

  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);
  const searchHandler = () => {
    const attendanceHistoryParams = {
      page,
      in_date: "",
      search: search.trim(),
    };
    dispatch(getGroupAttendancesHistory(attendanceHistoryParams));
  };
  const resetSearchHandler = () => {
    setSearch("");
    const attendanceHistoryParams = {
      page,
      in_date: "",
      search: "",
    };
    dispatch(getGroupAttendancesHistory(attendanceHistoryParams));
  };
  //
  const students = useMemo(() => {
    const studentsSet = new Set<string>();
    const uniqueStudents: { name: string; trial: boolean }[] = [];
    sortedData.forEach(
      (entry: { students: { student_name: string; trial: boolean }[] }) => {
        entry.students.forEach(
          (student: { student_name: string; trial: boolean }) => {
            if (!studentsSet.has(student.student_name)) {
              studentsSet.add(student.student_name);
              uniqueStudents.push({
                name: student.student_name,
                trial: student.trial,
              });
            }
          }
        );
      }
    );
    return uniqueStudents;
  }, [sortedData]);

  return {
    selectedTime,
    handleTimeChange,
    attendancesList,
    getStudentsStatus,
    page,
    students,
    sortedData,
    handleChangePage,
    resetHandler,
    searchHandler,
    searchChangeHandler,
    search,
    resetSearchHandler,
  };
};
