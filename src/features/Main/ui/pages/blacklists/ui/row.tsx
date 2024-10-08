import { useAppDispatch } from "@/app/store"
import {
  addStudentToBlacklist,
  getStudentsList,
} from "@/features/Students/store/actions"
import { Student } from "@/features/Students/types"
import { Button, TableCell, TableRow } from "@mui/material"
import { useNavigate } from "react-router"

const Row = ({ row }: { row: Student }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const deleteFromBlackList = () => {
    dispatch(
      addStudentToBlacklist({
        comment: "",
        studentId: row.id,
        blacklist: false,
      })
    ).then(() => {
      dispatch(getStudentsList({ search: "", page: 1, blacklist: true }))
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
          navigate(`/students/details/${row.id}`)
        }}
      >
        {row.full_name}
      </TableCell>
      <TableCell>{row.phone}</TableCell>
      <TableCell>{row.comment || ""}</TableCell>
      <TableCell>
        <Button
          onClick={deleteFromBlackList}
          color="success"
          variant="contained"
        >
          Удалить из черного списка
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default Row
