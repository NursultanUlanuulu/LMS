import { Debtors } from "@/features/Main/type"
import { getFormatedDate } from "@/shared/libs"
import { TableCell, TableRow } from "@mui/material"
import { useNavigate } from "react-router"

const Row = ({ row }: { row: Debtors }) => {
  const navigate = useNavigate()

  return (
    <TableRow>
      <TableCell
        sx={{
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/students/details/" + row.student)
        }}
      >
        {row.student_name || "-"}
      </TableCell>
      <TableCell>{getFormatedDate(row.created)}</TableCell>
      <TableCell>{row.manager}</TableCell>
      <TableCell>{row.comment || "-"}</TableCell>
      <TableCell>{row.amount} сом</TableCell>
    </TableRow>
  )
}

export default Row
