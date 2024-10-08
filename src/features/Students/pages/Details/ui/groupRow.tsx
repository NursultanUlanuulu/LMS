import { Group } from "@/features/Groups/type";
import { TableCell, TableRow, Button } from "@mui/material";

const GroupRow = ({
  row,
  text,
  callback,
}: {
  row: Group;
  text: string;
  callback: () => void;
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
      <TableCell>{row.time}</TableCell>
      <TableCell>{row.subject}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>
        {row.day_of_the_week.map((day) => {
          return <span>{day.week_day} </span>;
        })}
      </TableCell>
      <TableCell>
        {row.exists_students}/{row.max_student_count}
      </TableCell>
      <TableCell>{row.current_teacher_name}</TableCell>
      <TableCell>
        <Button color="primary" variant="contained" onClick={callback}>
          {text}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default GroupRow;
