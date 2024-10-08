import { TableCell, TableRow } from "@mui/material"

const Row = ({ row, callback }: { row: any; callback: () => void }) => {
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
      <TableCell>{row.address}</TableCell>
    </TableRow>
  )
}

export default Row
