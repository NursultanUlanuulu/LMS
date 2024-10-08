import { TableHeader, HOCList, CustomPagination } from "@/widgets";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { tokensDark } from "@/app/providers/ThemeProvider";
import { StatusResponse } from "@/shared/enums";
import { Group } from "@/features/Groups/type";
import { Student } from "@/features/Students/types";
import { studentAttendancesService } from "./studentAttendancesService";
import StudentAttendanceRow from "./ui/studentAttendanceRow";

const StudentAttendanceList = ({
  group,
  student,
  end_date,
  start_date,
}: {
  group: Group;
  student: Student;
  start_date?: string;
  end_date?: string;
}) => {
  const {
    getStudentsAttendancesStatus,
    handleChangePage,
    page,
    sortedAttendancesByDate,
    studentAttendancesList,
  } = studentAttendancesService({
    selectedGroup: group,
    student,
    start_date,
    end_date,
  });
  return (
    <Box>
      <TableHeader
        showCreateButton={false}
        title={`Посещаемость студента в группе ${group.name}`}
        subtitle={`Студент: ${student.full_name}`}
      />
      <HOCList
        isError={getStudentsAttendancesStatus === StatusResponse.ERROR}
        isLoading={getStudentsAttendancesStatus === StatusResponse.LOADING}
        isSuccess={getStudentsAttendancesStatus === StatusResponse.SUCCESS}
        length={studentAttendancesList.data.length}
        noLengthMessage="У студента нет отмеченных посещений"
      >
        <TableContainer
          sx={{ background: tokensDark.primary[500] }}
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow>
                {sortedAttendancesByDate.map((row, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    {new Date(row.date).toLocaleDateString()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAttendancesByDate.map((row) => (
                <StudentAttendanceRow row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination
          handleChangePage={handleChangePage}
          defaultPage={page}
          totalCount={studentAttendancesList.amount}
          limit={studentAttendancesList.limit}
          pagesCount={studentAttendancesList.pagesCount}
          currentPage={page}
        />
      </HOCList>
    </Box>
  );
};

export default StudentAttendanceList;
