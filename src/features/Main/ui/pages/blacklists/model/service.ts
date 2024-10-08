import { getStudentsList } from './../../../../../Students/store/actions';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './../../../../../../app/store';
import { useState } from 'react'
import { selectStudents } from '@/features/Students/store/selector';

const listService = () => {
    const headerLinks = ["ФИО", "Номер телефона", "Коммент", ""]
    const dispatch = useAppDispatch()
    const [page, setPage] = useState<number>(1)

    const list = useAppSelector(selectStudents)
    const [search, setSearch] = useState<string>("")
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }
    const handleSearchClick = () => {
        dispatch(getStudentsList({ search, page: 1, blacklist: true }))
    }
    const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, page: number) => {
        setPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    useEffect(() => {
        dispatch(getStudentsList({ search, page, blacklist: true }))
    }, [page])
    return {
        headerLinks, list,
        search, handleSearch, handleSearchClick, handleChangePage, page
    }
}

export default listService
