import React, { FC, useEffect, useState } from "react"
import { useParams } from "react-router"
import Info from "./components/info"
import Groups from "./components/groups"
import History from "./components/history"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { getTeacherById } from "../../store/actions"
import { selectListTeachers, selectTeacherById } from "../../store/selector"
import { StatusResponse } from "@/shared/enums"
import { clickBackHistory } from "@/shared/libs"

const infoService = () => {
  const dispatch = useAppDispatch()
  const teacherId = useParams().id
  const {} = clickBackHistory()

  const { status, data: teacher } = useAppSelector(selectTeacherById)
  const isLoading = status === StatusResponse.LOADING
  const [tab, setTab] = useState(1)
  const onChangeTab = (part: number) => {
    setTab(part)
  }
  const InnerModule: FC = () => {
    switch (tab) {
      case 1:
        return <Info isLoading={isLoading} teacher={teacher} />
      case 2:
        return <Groups teacher={teacher} />
      case 3:
        return <History id={teacher.id} />
      default:
        return <Info isLoading={isLoading} teacher={teacher} />
    }
  }

  const links = [
    { text: "Общая информация", value: 1 },
    { text: "Группы", value: 2 },
    { text: "История", value: 3 },
  ]
  useEffect(() => {
    dispatch(getTeacherById(Number(teacherId)))
  }, [])
  return { links, InnerModule, tab, onChangeTab, teacher }
}

export default infoService
