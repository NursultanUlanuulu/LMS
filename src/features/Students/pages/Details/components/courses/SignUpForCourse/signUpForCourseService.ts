import { getTimeList } from "@/features/Time/store/actions"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { getDayOfWeekList } from "@/features/DayOfWeek/store/actions"
import { selectDayOfWeek } from "@/features/DayOfWeek/store/selector"
import { getGroupList } from "@/features/Groups/store/actions"
import {
  selectGetGroupsStatus,
  selectGroups,
} from "@/features/Groups/store/selector"
import { Group } from "@/features/Groups/type"
import { getSubjectsList } from "@/features/Subjects/store/actions"
import { selectSubjects } from "@/features/Subjects/store/selector"
import { getList as getTeachers } from "@/features/Teachers/store/actions"
import { selectListTeachers } from "@/features/Teachers/store/selector"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { addStudentToGroup } from "@/features/Students/store/actions"
import { selectTime } from "@/features/Time/store/selector"
import { addToTrial as addToTrialAction } from "@/features/Students/store/actions"
import { toastInfo } from "@/shared/libs"

export const signUpPageService = (text: string) => {
  const { id } = useParams()
  const [filter, setFilter] = useState({
    subject: "",
    teacher: "",
    days: "",
    time: "",
  })
  const [page, setPage] = useState(1)
  const [activeGroup, setActiveGroup] = useState({} as Group)
  const [tariffModal, setTariffModal] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const groupsList = useAppSelector(selectGroups)
  const getGroupsStatus = useAppSelector(selectGetGroupsStatus)
  const teachers = useAppSelector(selectListTeachers).data.map((teacher) => {
    return { value: teacher.id, text: teacher.full_name }
  })
  const subjects = useAppSelector(selectSubjects).data.map((subject) => {
    return { value: subject.id, text: subject.predmet }
  })
  const weekDays = useAppSelector(selectDayOfWeek).data.map((weekDay) => {
    return { value: weekDay.id, text: weekDay.week_day }
  })
  const times = useAppSelector(selectTime).data.map((time) => {
    return { value: time.id, text: time.time }
  })
  const mapWeekDays: Record<string, number> = {
    'Пон': 1,
    'Вт': 2,
    'Ср': 3,
    'Чт': 4,
    'Пт': 5,
    'Субб': 6,
    'Вс': 7,
  };


  const addToTrial = (group: Group, trialDate: string) => {
    const trialDay = new Date(trialDate || "").getDay() || 7; // Преобразование воскресенья (0) в 7

    // Преобразуем строки с днями недели группы в числа
    const groupWeekDays = group.day_of_the_week[0].week_day
      .split('-')
      .map(day => mapWeekDays[day.trim()]);

    // Проверяем, если дата пустая
    if (!trialDate) {
      toastInfo("Заполните дату");
    }
    // Проверяем, входит ли выбранный день в список дней занятий группы
    else if (!groupWeekDays.includes(trialDay)) {
      toastInfo("Выбранная дата не является днем по которым идут занятия");
    }
    // Проверка, не попала ли дата до начала занятий группы
    else if (!(new Date(trialDate).getTime() >= new Date(group.start_of_classes).getTime())) {
      toastInfo("Дата попала до начала занятий группы");
    }
    // Если все проверки пройдены
    else {
      dispatch(addToTrialAction({ group: group.id, student: Number(id), lesson_date: trialDate }));
      navigate(`/students/details/${id}/`);
    }
  };


  useEffect(() => {
    dispatch(getSubjectsList())
    dispatch(getTeachers({ is_active: "true" }))
    dispatch(getDayOfWeekList())
    dispatch(getTimeList())
    return () => {
      dispatch(
        getGroupList({ filter: { student: id, archived: "false" }, page })
      )
    }
  }, [])

  useEffect(() => {
    dispatch(
      getGroupList({
        filter: {
          current_teacher: filter.teacher,
          day_of_the_week: filter.days,
          subject: filter.subject,
          time: filter.time,
          archived: "false",
        },
        page: 1,
      })
    )
  }, [filter])

  useEffect(() => {
    dispatch(
      getGroupList({
        filter: {
          current_teacher: filter.teacher,
          day_of_the_week: filter.days,
          subject: filter.subject,
          time: filter.time,
          archived: "false",
        },
        page,
      })
    )
  }, [page])

  const handleChangeFilter = (event: any) => {
    setFilter({ ...filter, [event.target.name]: event.target.value })
  }

  const handleClearFilter = () => {
    setFilter({ subject: "", teacher: "", days: "", time: "" })
  }

  const handleChangePage = (
    event: React.ChangeEvent<HTMLInputElement>,
    page: number
  ) => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleChangeTariffModal = () => {
    setTariffModal(!tariffModal)
  }

  const signUpStudent = (tarif_sum: number) => {
    dispatch(
      addStudentToGroup({
        tarif_sum: tarif_sum,
        group: activeGroup.id,
        student: Number(id),
      })
    )
  }

  return {
    filter,
    teachers,
    subjects,
    weekDays,
    times,
    groupsList,
    getGroupsStatus,
    page,
    tariffModal,
    handleChangePage,
    handleChangeFilter,
    handleClearFilter,
    handleChangeTariffModal,
    signUpStudent,
    addToTrial,
    setActiveGroup
  }
}
