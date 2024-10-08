import { useAppDispatch, useAppSelector } from '@/app/store'
import { getPromotersList } from '@/features/Promoters/store/actions'
import { StatusResponse } from '@/shared/enums'
import { clickBackHistory } from '@/shared/libs'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getStudentById } from '../../store/actions'
import {
	selectGetStudentDetailStatus,
	selectStudent,
} from '../../store/selector'
import { Courses, History, Info, TrialLessons } from './components'

const infoService = () => {
	const { id } = useParams()
	const dispatch = useAppDispatch()

	const [tab, setTab] = useState(1)
	const student = useAppSelector(selectStudent)
	const isGetStudentLoading =
		useAppSelector(selectGetStudentDetailStatus) === StatusResponse.LOADING
	const {} = clickBackHistory()
	const onChangeTab = (part: number) => {
		setTab(part)
	}
	const InnerModule: FC = () => {
		switch (tab) {
			case 1:
				return <Info />
			case 2:
				return <Courses />
			case 3:
				return <TrialLessons id={id as unknown as number} />
			case 4:
				return <History id={id as unknown as number} />
			default:
				return <Info />
		}
	}

	const links = [
		{ text: 'Общая информация', value: 1 },
		{ text: 'Курсы', value: 2 },
		{ text: 'Пробные уроки', value: 3 },
		{ text: 'История', value: 4 },
	]

	useEffect(() => {
		dispatch(getStudentById(Number(id)))
		dispatch(getPromotersList())
	}, [])

	return { links, InnerModule, tab, student, isGetStudentLoading, onChangeTab }
}

export default infoService
