import { StatusResponse } from "@/shared/enums";
import { useNavigate } from "react-router";
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
import { editGroup, getGroupById } from "../../store/actions";
import { useParams } from "react-router";
import { selectGroup } from "../../store/selector";
import { getDayOfWeekList } from "@/features/DayOfWeek/store/actions";
import { getSubjectsList } from "@/features/Subjects/store/actions";
import { getList } from "@/features/Teachers/store/actions";
import { getTimeList } from "@/features/Time/store/actions";

const editService = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const info = useAppSelector(selectGroup);
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
  const isLoading = [
    useAppSelector(selectSubjects).status === StatusResponse.LOADING,
    useAppSelector(selectListTeachers).status === StatusResponse.LOADING,
    useAppSelector(selectDayOfWeek).status === StatusResponse.LOADING,
    useAppSelector(selectTime).status === StatusResponse.LOADING,
    useAppSelector((s) => s.books.getBooks.status) === StatusResponse.LOADING,
    useAppSelector((s) => s.group.detail.status) === StatusResponse.LOADING,
  ].includes(true);
  const validationSchema = yup.object().shape({
    name: yup.string().required("Обязательное поле"),
    max_student_count: yup
      .number()
      .required("Обязательное поле")
      .min(1, "Минимальное количество 1"),
    number_of_lessons: yup
      .number()
      .required("Обязательное поле")
      .min(1, "Количество уроков должно быть больше 0"),
    subject: yup.string().required("Обязательное поле"),
    time: yup.mixed().required("Обязательное поле"),
    current_teacher: yup.string().required("Обязательное поле"),
    pourochno_price: yup.string().required("Обязательное поле"),

    day_of_the_week: yup.mixed().required("Обязательное поле"),
    start_of_classes: yup.date().required("Обязательное поле")
  });

  const initialValues: EditGroup = {
    name: info.name,
    max_student_count: info.max_student_count,
    time: times.find((time) => time.text === info.time)?.value || 0,
    comment: info.comment,
    is_active: true,
    day_of_the_week: info.day_of_the_week?.map((day) => day.id) || [],
    subject:
      subjects.find((subject) => subject.text === info.subject)?.value || 0,
    book: books.find((book) => book.text === info.book_name)?.value || "",
    current_teacher: Number(info.current_teacher_id),
    number_of_lessons: info.number_of_lessons,
    description: info.description,
    start_of_classes: info.start_of_classes || "",
    pourochno_price: info.pourochno_price || ""
  };
  const onSubmit = (values: EditGroup) => {
    dispatch(editGroup({ req: values, id: Number(id) })).then(() => {
      navigate("/groups/1");
    });
  };
  useEffect(() => {
    dispatch(getBooks({}));
    dispatch(getGroupById(id as unknown as number));
    dispatch(getSubjectsList());
    dispatch(getDayOfWeekList());
    dispatch(getTimeList());
    dispatch(
      getList({ search: "", page: 1, per_page: 100, is_active: "true" })
    );
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
    isLoading,
  };
};

export default editService;
