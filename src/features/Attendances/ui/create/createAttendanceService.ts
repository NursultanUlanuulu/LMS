import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { Group } from "@/features/Groups/type";
import { toastInfo } from "@/shared/libs";
import { Attendance, Student } from "../../type";
import { getJournal } from "../../store/actions";
import { selectGetJournalStatus, selectJournal } from "../../store/selector";
import { getList } from "@/features/Teachers/store/actions";
import { selectListTeachers } from "@/features/Teachers/store/selector";

const headerLinks = [
  "ФИО студента",
  "Баланс  студента",
  "Тип тарифа",
  "Сумма за один урок",
  "Отметьте присутствие",
  "Причина отсутствия",
];

export const createAttendanceService = ({
  selectedGroup,
  submitAttendance,
}: {
  selectedGroup: Group;
  submitAttendance: (
    data: Omit<Attendance, "group"> & { teacher_who_conducted: number }
  ) => void;
}) => {
  const [attendanceData, setAttendanceData] = useState<
    {
      student: number;
      attend: boolean;
      status?: string;
      reason_for_absence: null | string;
    }[]
  >([]);
  const dispatch = useAppDispatch();
  const journal = useAppSelector(selectJournal);
  const teachers = useAppSelector(selectListTeachers).data.map((t) => ({
    text: t.full_name,
    value: t.id,
  }));

  const [teacher, setTeacher] = useState(0);
  const [students, setStudents] = useState<Student[]>([]);
  const getJournalStatus = useAppSelector(selectGetJournalStatus);

  useEffect(() => {
    if (Array.isArray(journal.students)) {
      const sortedStudents = [...journal.students].sort((a, b) => {
        if (a.admit && !b.admit) return -1;
        if (!a.admit && b.admit) return 1;
        return 0;
      });

      setStudents(sortedStudents);
    }
  }, [journal]);

  useEffect(() => {
    dispatch(getJournal(selectedGroup.id));
    dispatch(getList({}));
  }, []);

  useEffect(() => {
    setTeacher(journal.current_teacher_id);
    let attendances: {
      student: number;
      attend: boolean;
      status?: string;
      reason_for_absence: null | string;
    }[] = [];
    if (journal.students !== null && journal.students.length > 0) {
      attendances = journal.students
        .filter((st) => st.is_active)
        .map((st) => {
          return st.admit
            ? {
                student: st.student_id,
                attend: false,
                reason_for_absence: null,
              }
            : {
                student: st.student_id,
                attend: false,
                status: "Нет баланса",
                reason_for_absence: null,
              };
        });
    }
    if (journal.trial_students !== null && journal.trial_students?.length > 0) {
      const trialStudents = journal.trial_students.map((st) => {
        return {
          student: st.student,
          attend: false,
          reason_for_absence: null,
        };
      });
      attendances = [...attendances, ...trialStudents];
    }
    setAttendanceData(attendances);
  }, [journal]);

  const handleChangeAttendanceData = (e: any, studentId: number) => {
    setAttendanceData(
      attendanceData.map((attendance) => {
        return attendance.student === studentId
          ? {
              ...attendance,
              [e.target.name]:
                e.target.name == "attend" ? e.target.checked : e.target.value,
            }
          : attendance;
      })
    );
  };

  const onAddBtnClick = () => {
    const isReasonNotSelected = attendanceData.find(
      (attendance) =>
        !attendance.attend &&
        !attendance.reason_for_absence &&
        !attendance.status
    );
    if (isReasonNotSelected) {
      toastInfo("Укажите для отсутствующих студентов причину отсутствия");
    } else {
      const attendances = attendanceData.map((attendance) => {
        return attendance.attend
          ? { ...attendance, reason_for_absence: null }
          : attendance;
      });
      const date = new Date();
      submitAttendance({
        date: date.toISOString(),
        attendance_day_of_the_week: date.getDay() === 0 ? 8 : date.getDay(),
        students: attendances,
        teacher_who_conducted: teacher,
      });
    }
  };

  const checkStudentsLength = useMemo(() => {
    if (students) {
      return students.length;
    } else if (journal.trial_students) {
      return journal.trial_students?.length;
    } else {
      return 0;
    }
  }, [journal]);

  const checkTrailStudentsLength = useMemo(() => {
    if (journal.trial_students) {
      return journal.trial_students.length;
    } else {
      return 0;
    }
  }, [journal]);
  const handleChangeTeacher = (e: any) => {
    setTeacher(e.target.value);
  };

  return {
    journal,
    getJournalStatus,
    handleChangeAttendanceData,
    onAddBtnClick,
    handleChangeTeacher,
    teacher,
    teachers,
    checkStudentsLength,
    checkTrailStudentsLength,
    headerLinks,
    attendanceData,
    students,
  };
};
