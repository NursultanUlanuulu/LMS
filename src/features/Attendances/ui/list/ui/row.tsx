import { Chip, TableCell, TableRow, Button, Stack } from "@mui/material";
import { Group } from "@/features/Groups/type";
import EditIcon from "@mui/icons-material/Edit";

const Row = ({
  row,
  createBtnCallback,
  editBtnCallback,
  rowCallback,
}: {
  row: Group;
  createBtnCallback: () => void;
  editBtnCallback: () => void;
  rowCallback: () => void;
}) => {
  return (
    <TableRow
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
      <TableCell>
        {row.day_of_the_week
          .map((day) => {
            return day.week_day;
          })
          .join(" - ")}
      </TableCell>
      <TableCell>{row.time}</TableCell>
      <TableCell>{row.current_teacher_name}</TableCell>
      <TableCell>
        {row.exists_students}/{row.max_student_count}
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <Stack
          spacing={2}
          direction={{
            xl: "row",
            lg: "column",
            md: "column",
            sm: "column",
            xs: "column",
          }}
          flexWrap="wrap"
          width={300}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={createBtnCallback}
          >
            Отметить
          </Button>
          <Button color="success" variant="contained" onClick={editBtnCallback}>
            <EditIcon sx={{ color: "#fff" }} />
          </Button>
          <Button
            onClick={rowCallback}
            sx={{ color: "#fff" }}
            color="success"
            variant="contained"
          >
            Журнал
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default Row;
