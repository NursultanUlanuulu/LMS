import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { Group } from "@/features/Groups/type";
import {
  selectGetGroupAttendancesStatus,
  selectGroupAttendanceStudents,
} from "../../store/selector";
import { getGroupAttendances } from "../../store/actions";

export const groupAttendancesListService = ({
  selectedGroup,
}: {
  selectedGroup: Group;
}) => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const attendancesList = useAppSelector(selectGroupAttendanceStudents);
  const getStudentsStatus = useAppSelector(selectGetGroupAttendancesStatus);

  useEffect(() => {
    dispatch(
      getGroupAttendances({
        group: selectedGroup.id,
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

  const sortedData = useMemo(() => {
    const sortedData = attendancesList.data
      .filter((gr) => {
        return gr.students !== null;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return sortedData;
  }, [attendancesList]);

  const students = useMemo(() => {
    const studentsSet = new Set<string>();
    const uniqueStudents: { name: string; trial: boolean }[] = [];
    sortedData.forEach((entry) => {
      entry.students.forEach((student) => {
        if (!studentsSet.has(student.student_name)) {
          studentsSet.add(student.student_name);
          uniqueStudents.push({
            name: student.student_name,
            trial: student.trial,
          });
        }
      });
    });
    const students = Array.from(uniqueStudents);
    return students;
  }, [sortedData]);

  return {
    attendancesList,
    getStudentsStatus,
    page,
    students,
    sortedData,
    handleChangePage,
  };
};
