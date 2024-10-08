import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { Group } from "@/features/Groups/type";
import {
  selectEditAttendanceStatus,
  selectGetGroupAttendancesStatus,
  selectGroupAttendanceStudents,
} from "../../store/selector";
import { editAttendance, getGroupAttendances } from "../../store/actions";
import { Attendance } from "../../type";

const headerLinks = [
  "ФИО студента",
  "Статус студента",
  "Отметьте присутствие",
  "Причина отсутствия",
];

export const editAttendanceService = ({
  selectedGroup,
}: {
  selectedGroup: Group;
}) => {
  const [attendanceData, setAttendanceData] = useState<
    { student: number; attend: boolean; reason_for_absence: string | null }[]
  >([]);
  const dispatch = useAppDispatch();
  const attendancesList = useAppSelector(selectGroupAttendanceStudents);
  const getStudentsStatus = useAppSelector(selectGetGroupAttendancesStatus);
  const editAttendanceStatus = useAppSelector(selectEditAttendanceStatus);
  useEffect(() => {
    var currentDate = new Date();
    var year = currentDate.getFullYear(); // год (например, 2023)
    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // месяц (от 01 до 12)
    var day = ("0" + currentDate.getDate()).slice(-2); // день (от 01 до 31)
    const formattedDate = year + "-" + month + "-" + day;
    dispatch(
      getGroupAttendances({
        group: selectedGroup.id,
        start_date: formattedDate,
      })
    );
  }, []);

  useEffect(() => {
    if (attendancesList.data.length > 0) {
      setAttendanceData(
        attendancesList.data[0].students.map((st) => {
          return {
            student: st.student,
            attend: st.attend,
            reason_for_absence: st.reason_for_absence,
          };
        })
      );
    }
  }, [attendancesList]);

  const students = useMemo(() => {
    return attendancesList.data.length > 0
      ? attendancesList.data[0].students.map((st) => {
        return {
          id: st.student,
          name: st.student_name,
          status: st.lack_of_balance ? "Нет баланса" : "Активен",
          attend: st.attend,
          reason_for_absence: st.reason_for_absence,
        };
      })
      : [];
  }, [attendancesList]);

  const handleChangeAttendanceData = (e: any, studentId: number) => {
    setAttendanceData(
      attendanceData.map((at) => {
        return at.student === studentId
          ? {
            ...at,
            [e.target.name]:
              e.target.name === "reason_for_absence"
                ? e.target.value
                : e.target.checked,
          }
          : at;
      })
    );
  };

  const saveAttendanceData = () => {
    const attendances = attendanceData.map((attendance) => {
      return attendance.attend
        ? { ...attendance, reason_for_absence: null }
        : attendance;
    });
    const date = new Date();
    const data: Attendance = {
      group: selectedGroup.id,
      attendance_day_of_the_week: date.getDay() === 0 ? 8 : date.getDay(),
      date: date.toISOString(),
      students: attendanceData,
    };
    dispatch(editAttendance({ id: attendancesList.data[0].id ?? 0, data }));
  };
  console.log(attendanceData);

  return {
    attendancesList,
    getStudentsStatus,
    headerLinks,
    students,
    editAttendanceStatus,
    handleChangeAttendanceData,
    attendanceData,
    saveAttendanceData,
  };
};
