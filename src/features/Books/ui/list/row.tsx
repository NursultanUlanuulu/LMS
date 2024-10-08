import { TableCell, TableRow, Button, Stack } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { Delete } from "@mui/icons-material"
import { Book } from "../../type"
import AddIcon from "@mui/icons-material/Add"

const Row = ({
  row,
  editCallback,
  deleteCallback,
  addAmountCallback,
}: {
  row: Book
  editCallback: () => void
  deleteCallback: () => void
  addAmountCallback: () => void
}) => {
  return (
    <TableRow key={row.id}>
      <TableCell>{row.title}</TableCell>
      <TableCell>{row.quantity}</TableCell>
      <TableCell>{row.price}</TableCell>
      <TableCell>
        <Stack spacing={2} direction="row">
          <Button color="success" variant="contained" onClick={editCallback}>
            <EditIcon sx={{ color: "#fff" }} />
          </Button>
          <Button color="error" variant="contained" onClick={deleteCallback}>
            <Delete sx={{ color: "#fff" }} />
          </Button>
          <Button color="info" variant="contained" onClick={addAmountCallback}>
            <AddIcon sx={{ color: "#fff" }} />
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  )
}

export default Row
