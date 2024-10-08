import { useAppDispatch } from "@/app/store"
import { addDebtorSum } from "@/features/Students/store/actions"
import { toastError } from "@/shared/libs"
import { MyInput, MyTextArea } from "@/shared/ui"
import { Header } from "@/widgets"
import { Box, Button, Stack, Typography } from "@mui/material"
import React, { useState } from "react"

const AddDebtor = ({
  studentId,
  onCloseModal,
}: {
  studentId: number
  onCloseModal: () => void
}) => {
  const dispatch = useAppDispatch()
  const [inputState, setInputState] = useState({
    student: studentId,
    comment: "",
    amount: "",
  })
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState({ ...inputState, [event.target.name]: event.target.value })
  }
  const onFormClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputState.amount || !inputState.comment) {
      toastError("Заполните все поля")
    } else {
      dispatch(
        addDebtorSum({ ...inputState, amount: Number(inputState.amount) })
      )
    }
  }
  return (
    <Box>
      <Header title="Дать в долг" />
      <Stack component="form" onSubmit={onFormClick} spacing={2}>
        <Box>
          <Typography>Сумма долга</Typography>
          <MyInput
            name="amount"
            onChange={handleInput}
            onBlur={() => {}}
            value={inputState.amount}
            type="number"
          />
        </Box>
        <Box>
          <Typography>Коммент</Typography>
          <MyTextArea
            name="comment"
            value={inputState.comment}
            onChange={handleInput}
            onBlur={() => {}}
          />
        </Box>
        <Button variant="contained" type="submit">
          Отправить
        </Button>
      </Stack>
    </Box>
  )
}

export default AddDebtor
