import { useAppSelector } from "@/app/store"
import { useState, useEffect, useMemo } from "react"
import { useAppDispatch } from "@/app/store"
import {
  selectBooks,
  selectCreateBookStatus,
  selectEditBookStatus,
  selectGetBooksStatus,
} from "../../store/selector"
import { Book } from "../../type"
import { deleteBook, getBooks, updateBook } from "../../store/actions"
import { getSubjectsList } from "@/features/Subjects/store/actions"
import { StatusResponse } from "@/shared/enums"
import { selectSubjects } from "@/features/Subjects/store/selector"

type ModalTypes = "edit" | "create" | "delete" | "addAmount"

const service = () => {
  const headerLinks = ["Название", "Количество", "Цена", ""]

  const dispatch = useAppDispatch()

  const books = useAppSelector(selectBooks)
  const subjects = useAppSelector(selectSubjects).data
  const getBooksStatus = useAppSelector(selectGetBooksStatus)
  const isCreateBookSuccess =
    useAppSelector(selectCreateBookStatus) === StatusResponse.SUCCESS

  const isUpdateBookSuccess =
    useAppSelector(selectEditBookStatus) === StatusResponse.SUCCESS
  const [modals, setModals] = useState<{ [key: string]: boolean }>({
    create: false,
    edit: false,
    delete: false,
    addAmount: false
  })
  const [filter, setFilter] = useState(0)
  const [activeBook, setActiveBook] = useState({} as Book)
  const handleChangeFilter = (event: any) => {
    setFilter(event.target.value)
  }

  const handleDeleteBook = () => {
    dispatch(deleteBook(activeBook.id ?? 0))
  }

  const handleChangeModals = (modal: ModalTypes) => {
    setModals({ ...modals, [modal]: !modals[modal] })
  }

  const handleChangeActiveBook = (book: Book) => {
    setActiveBook(book)
  }
  const onAddAmount = (amount: number) => {
    const newAmount = Number(activeBook.quantity) + amount
    dispatch(updateBook({ ...activeBook, quantity: newAmount }))
  }
  useEffect(() => {
    dispatch(getBooks({}))
    dispatch(getSubjectsList())
  }, [])

  useEffect(() => {
    if (isCreateBookSuccess && modals.create) {
      setModals({ ...modals, create: false })
    }
  }, [isCreateBookSuccess])

  useEffect(() => {
    if (isUpdateBookSuccess && modals.edit) {
      setModals({ ...modals, edit: false })
    }
  }, [isUpdateBookSuccess])

  useEffect(() => {
    if (filter > 0) {
      dispatch(getBooks({ predmet: filter }))
    } else {
      dispatch(getBooks({}))
    }
  }, [filter])

  const subjectsList = useMemo(() => {
    const all = [{ value: 0, text: "Все" }]
    return [
      ...all,
      ...subjects.map((subject) => {
        return { value: subject.id, text: subject.predmet }
      }),
    ]
  }, [subjects])



  return {
    headerLinks,
    filter,
    modals,
    activeBook,
    books,
    subjectsList,
    getBooksStatus,
    handleDeleteBook,
    handleChangeActiveBook,
    handleChangeModals,
    handleChangeFilter,
    onAddAmount
  }
}

export default service
