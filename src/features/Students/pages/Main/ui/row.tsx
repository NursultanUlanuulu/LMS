import { Student } from "@/features/Students/types"
import { getAgeYears } from "@/shared/libs"
import { TableCell, TableRow } from "@mui/material"

const Row = ({ data, callback }: { data: Student; callback: () => void }) => {
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
      key={data.id}
    >
      <TableCell component="th" scope="row">
        {data.full_name}
      </TableCell>
      <TableCell component="th" scope="row">
        {getAgeYears(data.date_birth)}
      </TableCell>
      <TableCell component="th" scope="row">
        {data.balance} сом
      </TableCell>
    </TableRow>
  )
}

export default Row
