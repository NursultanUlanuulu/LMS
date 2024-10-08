import { PendingFilter } from './../../../../type';
import { useAppDispatch, useAppSelector } from '@/app/store'
import { getDayOfWeekList } from '@/features/DayOfWeek/store/actions'
import { getPendingsList } from '@/features/Main/store/actions'
import { getSubjectsList } from '@/features/Subjects/store/actions'
import { getTimeList } from '@/features/Time/store/actions'
import { useEffect, useState } from 'react'
import { selectDayOfWeek } from '@/features/DayOfWeek/store/selector';
import { selectTime } from '@/features/Time/store/selector';
import { selectPendings } from '@/features/Main/store/selector';
import { selectSubjects } from '@/features/Subjects/store/selector';

const listService = () => {
    const dispatch = useAppDispatch()
    const headerLinks = ["ФИО", "Номер телефона", "Предмет", "Дни", "Время", "Преподаватель", ""]
    const list = useAppSelector(selectPendings)
    const [filter, setFilter] = useState<PendingFilter>({
        page: 1,
        search: "",
        subject: "",
        day_of_the_week: "",
        time: "",
    })
    const daysOfWeek = useAppSelector(selectDayOfWeek).data.map((day) => {
        return {
            text: day.week_day,
            value: day.id
        }
    })
    const subjects = useAppSelector(selectSubjects).data.map((subject) => {
        return {
            text: subject.predmet,
            value: subject.id
        }
    })
    const times = useAppSelector(selectTime).data.map((time) => {
        return {
            text: time.time,
            value: time.id
        }
    })
    const handleChangeFilter = (event: any) => {
        setFilter({ ...filter, [event.target.name]: event.target.value })
    }

    const handleSearchClick = () => {
        dispatch(getPendingsList(filter))
    }
    const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, page: number) => {
        setFilter({ ...filter, page })
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const resetFilter = () => {
        setFilter({
            page: 1,
            search: "",
            subject: "",
            day_of_the_week: "",
            time: "",
        })
    }
    useEffect(() => {
        dispatch(getTimeList())
        dispatch(getSubjectsList())
        dispatch(getDayOfWeekList())

    }, [])
    useEffect(() => {
        dispatch(getPendingsList(filter))
    }, [filter])
    return {
        headerLinks, list, handleChangeFilter, filter, daysOfWeek, times,
        resetFilter,
        handleSearchClick, subjects, handleChangePage
    }
}

export default listService
