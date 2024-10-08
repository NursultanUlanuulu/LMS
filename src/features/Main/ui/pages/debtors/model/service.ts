import { useNavigate } from 'react-router';
import { useAppDispatch } from './../../../../../../app/store';
import { useAppSelector } from '@/app/store'
import { selectDebtors } from '@/features/Main/store/selector'
import { useEffect, useState } from 'react'
import { PendingFilter } from '@/features/Main/type';
import { getDebtorsList } from '@/features/Main/store/actions';

const listService = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const headerLinks = ["ФИО", "Дата долга", "Менеджер", "Коммент", "Сумма долга"]
    const list = useAppSelector(selectDebtors)
    const [filter, setFilter] = useState<PendingFilter>({
        page: 1,
        search: ""
    })
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({ ...filter, search: event.target.value })
    }
    const handleSearchClick = () => {
        dispatch(getDebtorsList(filter))
    }
    const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, page: number) => {
        setFilter({ ...filter, page })
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    useEffect(() => {
        dispatch(getDebtorsList(filter))
    }, [filter.page])
    return {
        headerLinks, list,
        filter, handleSearch, handleSearchClick, handleChangePage
    }
}

export default listService
