import { Unrecorded } from "@/features/Main/type"
import { TableCell, TableRow } from "@mui/material"
import { useNavigate } from "react-router"

const Row = ({ row }: { row: Unrecorded }) => {
  const navigate = useNavigate()
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
      <TableCell>{row.subject}</TableCell>
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
      <TableCell>{row.level}</TableCell>
    </TableRow>
  )
}

export default Row
