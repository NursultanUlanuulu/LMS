import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectDayOfWeek } from "@/features/DayOfWeek/store/selector";
import { selectSubjects } from "@/features/Subjects/store/selector";
import { selectListTeachers } from "@/features/Teachers/store/selector";
import { selectTime } from "@/features/Time/store/selector";
import * as yup from "yup";
import { EditGroup } from "../../type";
import { getBooks } from "@/features/Books/store/actions";
import { selectBooks } from "@/features/Books/store/selector";
import { createGroup } from "../../store/actions"

const createService = (onClose: () => void) => {
  const dispatch = useAppDispatch();
  const teachers = useAppSelector(selectListTeachers).data.map((teacher) => {
    return {
      text: teacher.full_name,
      value: teacher.id,
    };
  });
  const subjects = useAppSelector(selectSubjects).data.map((subject) => {
    return {
      text: subject.predmet,
      value: subject.id,
    };
  });
  const daysOfWeek = useAppSelector(selectDayOfWeek).data.map((day) => {
    return {
      text: day.week_day,
      value: day.id,
    };
  });
  const times = useAppSelector(selectTime).data.map((time) => {
    return {
      text: time.time,
      value: time.id,
    };
  });
  const books = useAppSelector(selectBooks).map((time) => {
    return {
      text: time.title,
      value: time.id || "",
    };
  });
  const validationSchema = yup.object().shape({
    name: yup.string().required("Обязательное поле"),
    max_student_count: yup
      .number()
      .required("Обязательное поле")
      .min(1, "Минимальное количество 1"),
    subject: yup.string().required("Обязательное поле"),
    time: yup.mixed().required("Обязательное поле"),
    current_teacher: yup.string().required("Обязательное поле"),
    day_of_the_week: yup.mixed().required("Обязательное поле"),
    pourochno_price: yup.string().required("Обязательное поле"),

    number_of_lessons: yup
      .number()
      .required("Обязтельное поле")
      .min(1, "Количество уроков должно быть больше 0"),
    start_of_classes: yup.date().required("Обязательное поле").min(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), "Минимальная дата - сегодня")


  });

  const initialValues: EditGroup = {
    name: "",
    max_student_count: "",
    time: 0,
    comment: "",
    is_active: true,
    day_of_the_week: [],
    subject: 0,
    book: "",
    current_teacher: 0,
    number_of_lessons: "",
    description: "",
    start_of_classes: "",
    pourochno_price: ""
  };
  const onSubmit = (values: EditGroup) => {
    dispatch(createGroup({ values, onClose }));
  };
  useEffect(() => {
    dispatch(getBooks({}));
  }, []);
  return {
    initialValues,
    validationSchema,
    onSubmit,
    times,
    subjects,
    teachers,
    daysOfWeek,
    books,
  };
};

export default createService;
