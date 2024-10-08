import { useEffect } from "react";
import * as yup from "yup";
import { AddToPending } from "@/features/Students/types";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { getList } from "@/features/Teachers/store/actions";
import { getTimeList } from "@/features/Time/store/actions";
import { getDayOfWeekList } from "@/features/DayOfWeek/store/actions";
import { getSubjectsList } from "@/features/Subjects/store/actions";
import { selectListTeachers } from "@/features/Teachers/store/selector";
import { selectSubjects } from "@/features/Subjects/store/selector";
import { selectTime } from "@/features/Time/store/selector";
import { selectDayOfWeek } from "@/features/DayOfWeek/store/selector";
import { useParams } from "react-router";
import { addToPending } from "@/features/Students/store/actions";

export const addToPendingService = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const validationSchema = yup.object().shape({
    day_of_the_week: yup
      .mixed()
      .required("Обязательное поле")
      .test("День", "Выберите дни", (value) =>
        value ? value.length > 0 : false
      ),
    subject: yup
      .number()
      .required("Обязательное поле")
      .test("Предмет", "Выберите предмет", (value) =>
        value ? value > 0 : false
      ),
    time: yup
      .number()
      .required("Обязательное поле")
      .test("Время", "Выберите время", (value) =>
        value ? value > 0 : false
      ),
  });

  const teachers = useAppSelector(selectListTeachers).data.map((teacher) => {
    return { value: teacher.id, text: teacher.full_name };
  });

  const subjects = useAppSelector(selectSubjects).data.map((subject) => {
    return { value: subject.id, text: subject.predmet };
  });

  const time = useAppSelector(selectTime).data.map((time) => {
    return { value: time.id, text: time.time };
  });

  const days = useAppSelector(selectDayOfWeek).data.map((day) => {
    return { value: day.id, text: day.week_day };
  });

  const initialValues: AddToPending = {
    student: Number(id),
    day_of_the_week: [],
    level: "",
    subject: 0,
    teacher: 0,
    time: 0,
    comment: "",
  };

  useEffect(() => {
    dispatch(getList({}));
    dispatch(getTimeList());
    dispatch(getDayOfWeekList());
    dispatch(getSubjectsList());
  }, []);

  const onSubmit = (values: AddToPending) => {
    const req: AddToPending = {
      ...values, teacher: values.teacher == 0 ? null : values.teacher
    }
    dispatch(addToPending(req));
  };
  return {
    initialValues,
    validationSchema,
    subjects,
    days,
    teachers,
    time,
    onSubmit,
  };
};
