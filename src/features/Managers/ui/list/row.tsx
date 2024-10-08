import { TableCell, TableRow, Stack, Button } from "@mui/material";
import { Manager } from "../../type";
import { Delete, Edit } from "@mui/icons-material";

const Row = ({
  row,
  editCallback,
  deleteCallback,
}: {
  row: Manager;
  editCallback: () => void;
  deleteCallback: () => void;
}) => {
  return (
    <TableRow
      sx={{
        transition: "all 0.4s ease",
      }}
      key={row.id}
    >
      <TableCell>
        {row.surname} {row.name} {row.patronymic}
      </TableCell>
      <TableCell>{row.branch}</TableCell>
      <TableCell>
        <Stack spacing={2} direction="row">
          <Button color="success" variant="contained" onClick={editCallback}>
            <Edit sx={{ color: "#fff" }} />
          </Button>
          <Button color="error" variant="contained" onClick={deleteCallback}>
            <Delete sx={{ color: "#fff" }} />
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default Row;
