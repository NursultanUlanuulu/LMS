import { useAppDispatch, useAppSelector } from '@/app/store'
import { getPromotersList } from '@/features/Promoters/store/actions'
import { ROUTES } from '@/shared/data'
import { StatusResponse } from '@/shared/enums'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getStudentsList } from '../../store/actions'
import {
	selectCreateStudentStatus,
	selectGetStudentsStatus,
	selectStudents,
} from '../../store/selector'

export const studentsPageService = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { id } = useParams()
	const [page, setPage] = useState<number>(Number(id))
	const tableHeaderLinks = ['ФИО', 'Возраст', 'Баланс']
	const studentsList = useAppSelector(selectStudents)
	const getStudentsStatus = useAppSelector(selectGetStudentsStatus)
	const isCreateStudentSuccess =
		useAppSelector(selectCreateStudentStatus) === StatusResponse.SUCCESS

	const [createModal, setCreateModal] = useState(false)

	const [search, setSearch] = useState<string>('')

	const onCloseCreateModal = () => {
		setCreateModal(false)
	}
	const onOpenCreateModal = () => {
		setCreateModal(true)
	}

	const openDetailsPage = (id: number) => {
		navigate(`/students/details/${id}`)
	}
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}
	const handleSearchClick = () => {
		dispatch(getStudentsList({ search, page }))
	}

	const handleChangePage = (
		event: React.ChangeEvent<HTMLInputElement>,
		page: number
	) => {
		setPage(page)
		navigate(`/${ROUTES.students}/${page}`)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	useEffect(() => {
		dispatch(getStudentsList({ search, page }))
	}, [page])

	useEffect(() => {
		setPage(Number(id))
	}, [id])

	useEffect(() => {
		if (isCreateStudentSuccess && createModal) {
			onCloseCreateModal()
		}
	}, [isCreateStudentSuccess])

	useEffect(() => {
		dispatch(getPromotersList())
	}, [])

	return {
		tableHeaderLinks,
		studentsList,
		getStudentsStatus,
		onCloseCreateModal,
		onOpenCreateModal,
		createModal,
		search,
		page,
		handleSearch,
		handleChangePage,
		handleSearchClick,
		openDetailsPage,
	}
}
