import { useAppDispatch } from "@/app/store"
import { deleteFromTrialsList } from "@/features/Main/store/actions"
import { Trial } from "@/features/Main/type"
import { getFormatedDate } from "@/shared/libs"
import PromptModal from "@/widgets/PropmptModal"
import { Button, TableCell, TableRow } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router"

const Row = ({ row }: { row: Trial }) => {
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const dispatch = useAppDispatch()
  return (
    <TableRow
      sx={{
        cursor: "pointer",
      }}
      key={row.id}
    >
      <PromptModal
        open={modal}
        handleClose={function (): void {
          setModal(false)
        }}
        text={"Вы уверены что хотите удалить студента из пробников?"}
        agreeCallback={function (): void {
          dispatch(deleteFromTrialsList(row.id))
          setModal(false)
        }}
      />
      <TableCell
        onClick={() => {
          navigate("/students/details/" + row.student)
        }}
      >
        {row.student_name}
      </TableCell>
      <TableCell>{row.student_phone}</TableCell>
      <TableCell>{row.group_name}</TableCell>
      <TableCell>{new Date(row.lesson_date).toLocaleDateString()}</TableCell>

      <TableCell>
        {row.day_of_the_week.map(dayOfWeek => `${dayOfWeek.week_day}; `)}
      </TableCell>
      <TableCell>{row.group_time}</TableCell>
      <TableCell>{row.group_subject}</TableCell>
      <TableCell>
        <Button
          onClick={() => {
            setModal(true)
          }}
          size="small"
          variant="contained"
          color="error"
        >
          Удалить из пробников
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default Row
