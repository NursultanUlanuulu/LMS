import { TableCell } from "@mui/material";
import { StudentAttendancesInGroup } from "@/features/Attendances/type";

// enum Reasons {
//   Overslept,
//   Sick,
//   Messed_up_the_time,
//   Forgot,
//   Don_t_know,
// }

// type Reason = keyof typeof Reasons

// const nonAttendanceStatus: { [K in Reason]: string } = {
//   Overslept: "Проспал",
//   Sick: "Заболел",
//   Messed_up_the_time: "Перепутал время",
//   Forgot: "Забыл",
//   Don_t_know: "Не знаю",
// }

const StudentAttendanceRow = ({ row }: { row: StudentAttendancesInGroup }) => {
  return (
    <TableCell>
      {row.attend ? "Присутствовал" : row.status ?? row.reason_for_absence}
    </TableCell>
  );
};

export default StudentAttendanceRow;
