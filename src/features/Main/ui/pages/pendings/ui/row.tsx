import { useAppDispatch } from "@/app/store"
import { api } from "@/features/Main/api"
import { getPendingsList } from "@/features/Main/store/actions"
import { Pending } from "@/features/Main/type"
import { toastSuccess } from "@/shared/libs"
import { Button, TableCell, TableRow } from "@mui/material"
import { useNavigate } from "react-router"

const Row = ({ row }: { row: Pending }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onAddToUnrecorded = async () => {
    const token = window.localStorage.getItem("token") || ""
    await api.addToUnrecorded(token, row.id).then(() => {
      toastSuccess("Вы перенесли студента в незаписанные")
      dispatch(getPendingsList({ page: 1, search: "" }))
    })
  }
  return (
    <TableRow
      sx={{
        cursor: "pointer",
      }}
      key={row.id}
    >
      <TableCell
        onClick={() => {
          navigate("/students/details/" + row.student_id)
        }}
      >
        {row.student_full_name}
      </TableCell>
      <TableCell>{row.student_phone}</TableCell>
      <TableCell>{row.subject_name}</TableCell>
      <TableCell>
        {row.day_of_the_week.map(dayOfWeek => (
          <span key={dayOfWeek.id}>{dayOfWeek.week_day}; </span>
        ))}
      </TableCell>
      <TableCell>{row.time}</TableCell>
      <TableCell
        onClick={() => {
          if (row.teacher_id) {
            navigate(`/teachers/details/${row.teacher_id}`)
          }
        }}
      >
        {row.teacher_name || "-"}
      </TableCell>
      {/* <TableCell>{row.level}</TableCell> */}
      <TableCell>
        <Button onClick={onAddToUnrecorded} color="success" variant="contained">
          Добавить в незаписанные
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default Row
