import { Graduated } from "@/features/Students/types"
import { getAgeYears } from "@/shared/libs"
import { TableCell, TableRow } from "@mui/material"
import { useNavigate } from "react-router"

const Row = ({ row }: { row: Graduated }) => {
  const navigate = useNavigate()

  return (
    <TableRow
      sx={{
        cursor: "pointer",
      }}
    >
      <TableCell
        onClick={() => {
          navigate(`/students/details/${row.student_id}`)
        }}
      >
        {row.student_full_name}
      </TableCell>
      <TableCell>{getAgeYears(row.student_date_birth)}</TableCell>

      <TableCell>{row.student_phone}</TableCell>
      <TableCell>{row.group_name || ""}</TableCell>
      <TableCell>
        {row.day_of_the_week.map(dayOfWeek => (
          <span key={dayOfWeek.id}>{dayOfWeek.week_day}; </span>
        ))}
      </TableCell>
      <TableCell>{row.group_subject_name}</TableCell>
      <TableCell>{row.group_time}</TableCell>
    </TableRow>
  )
}

export default Row
