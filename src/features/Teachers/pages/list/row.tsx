import { getAgeYears } from "@/shared/libs"
import { TableCell, TableRow } from "@mui/material"
import { Teacher } from "../../type"

const Row = ({ row, callback }: { row: Teacher; callback: () => void }) => {
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
      <TableCell>{row.full_name}</TableCell>
      <TableCell>{row.predmet}</TableCell>
      <TableCell>
        {new Date(row.date_birth).toLocaleDateString() ?? "-"}
      </TableCell>
      <TableCell>{getAgeYears(row.date_birth ?? "")}</TableCell>

      <TableCell>{row.phone ?? "-"}</TableCell>
      <TableCell>{row.inn}</TableCell>
      <TableCell>{row.address}</TableCell>
    </TableRow>
  )
}

export default Row
