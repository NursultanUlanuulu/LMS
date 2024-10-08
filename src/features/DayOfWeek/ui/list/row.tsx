import { TableCell, TableRow } from "@mui/material"
import { DayOfWeek } from "../../type"

const Row = ({ row, callback }: { row: DayOfWeek; callback: () => void }) => {
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
      <TableCell>{row.week_day}</TableCell>
    </TableRow>
  )
}

export default Row
