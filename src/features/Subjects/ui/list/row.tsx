import { TableCell, TableRow } from "@mui/material"
import { Subject } from "../../type"

const Row = ({ row, callback }: { row: Subject; callback: () => void }) => {
  return (
    <TableRow
      onClick={callback}
      sx={{
        cursor: "pointer",
        transition: "all 0.4s ease",
        "&:hover": {
          opacity: 0.7,
        },
      }}
      key={row.id}
    >
      <TableCell>{row.predmet}</TableCell>
    </TableRow>
  )
}

export default Row
