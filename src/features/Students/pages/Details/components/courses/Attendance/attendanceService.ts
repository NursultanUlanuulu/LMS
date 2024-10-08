import { useState } from "react";
import * as yup from "yup";
import { Student } from "@/features/Students/types";
import { useAppSelector } from "@/app/store";
import { selectStudent } from "@/features/Students/store/selector";
import { StudentAttendanceFilter } from "@/features/Attendances/type";
import { selectGroups } from "@/features/Groups/store/selector";
import { Group } from "@/features/Groups/type";

export const attendanceService = () => {
  const validationSchema = yup.object().shape({
    attendance_group: yup
      .number()
      .required("Обязательное поле")
      .test("Группа", "Выберите группу", (value) =>
        value ? value > 0 : false
      ),
    start_date: yup.string().required("Обязательное поле"),
    end_date: yup.string().required("Обязательное поле"),
  });

  const [attendanceModal, setAttendanceModal] = useState(false);

  const [studentAttendanceFilterData, setStudentAttendanceFilterData] =
    useState(
      {} as {
        student: Student;
        group: Group;
        start_date: string;
        end_date: string;
      }
    );

  const student = useAppSelector(selectStudent);
  const groupList = useAppSelector(selectGroups);
  const groups = groupList.data.map((group) => {
    return { value: group.id, text: group.name };
  });

  const initialValues: Omit<StudentAttendanceFilter, "student" | "page"> = {
    attendance_group: 0,
    end_date: "",
    start_date: "",
  };

  const handleChangeAttendanceModal = () => {
    setAttendanceModal(!attendanceModal);
  };
  const onSubmit = (
    values: Omit<StudentAttendanceFilter, "student" | "page">
  ) => {
    const group = groupList.data.find(
      (group) => group.id === values.attendance_group
    );
    setStudentAttendanceFilterData({
      group: group ?? ({} as Group),
      student,
      start_date: values.start_date
        ? new Date(values.start_date).toISOString()
        : "",
      end_date: values.end_date ? new Date(values.end_date).toISOString() : "",
    });
    handleChangeAttendanceModal();
  };
  return {
    initialValues,
    validationSchema,
    groups,
    attendanceModal,
    handleChangeAttendanceModal,
    studentAttendanceFilterData,
    onSubmit,
  };
};
