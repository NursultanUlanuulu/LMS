import { FC, useEffect, useState } from "react"
import Info from "./components/info"
import Students from "./components/students"
import History from "./components/history"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { getGroupById } from "../../store/actions"
import { useParams } from "react-router"
import { selectGroup } from "../../store/selector"
import { StatusResponse } from "@/shared/enums"
import { clickBackHistory } from "@/shared/libs"

const infoService = () => {
  const [tab, setTab] = useState(1)
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const info = useAppSelector(selectGroup)
  const {} = clickBackHistory()

  const isLoading =
    useAppSelector(s => s.group.detail.status) === StatusResponse.LOADING
  const onChangeTab = (part: number) => {
    setTab(part)
  }
  const InnerModule: FC = () => {
    switch (tab) {
      case 1:
        return <Info data={info} />
      case 2:
        return <Students />
      case 3:
        return <History />
      default:
        return <Info data={info} />
    }
  }
  const headerLinks = [
    "Предмет",
    "Название",
    "Время",
    "Дни",
    "Преподаватель",
    "Тип тарифа",
    "Цена обучения",
    "Кол-во студентов",
    "Книга",
  ];
  const links = [
    { text: "Общая информация", value: 1 },
    { text: "Студенты", value: 2 },
    { text: "История", value: 3 },
  ]
  useEffect(() => {
    dispatch(getGroupById(id as unknown as number))
  }, [])
  return { links, InnerModule, tab, onChangeTab, name: info.name, isLoading, headerLinks }
}

export default infoService
