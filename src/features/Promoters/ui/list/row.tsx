import { TableCell, TableRow } from "@mui/material"
import { Promoter } from "../../type"

const Row = ({ row, callback }: { row: Promoter; callback: () => void }) => {
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
      <TableCell>{row.name}</TableCell>
    </TableRow>
  )
}

export default Row
