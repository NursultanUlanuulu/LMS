import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './../../../../../../app/store';
import { useState } from 'react'
import { selectGraduated } from '@/features/Students/store/selector';
import { getGraduated } from '@/features/Students/store/actions';
import { getSubjectsList } from '@/features/Subjects/store/actions';
import { selectSubjects } from '@/features/Subjects/store/selector';
import { SelectChangeEvent } from '@mui/material';

const listService = () => {
    const headerLinks = ["ФИО", "Возраст", "Номер телефона", "Группа", "Дни", "Предмет", "Время"]
    const dispatch = useAppDispatch()
    const [page, setPage] = useState<number>(1)
    const list = useAppSelector(selectGraduated)
    const [subject, setSubject] = useState<string>("")
    const subjects = useAppSelector(selectSubjects).data.map((subject) => {
        return {
            text: subject.predmet,
            value: subject.id
        }
    })
    const handleSubject = (event: SelectChangeEvent<string>) => {
        setSubject(event.target.value)
    }

    const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, page: number) => {
        setPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    useEffect(() => {
        dispatch(getGraduated({ page, group__subject: subject }))
        dispatch(getSubjectsList())

    }, [page, subject])
    return {
        headerLinks, list,
        subject, handleSubject, handleChangePage, page, subjects
    }
}

export default listService
