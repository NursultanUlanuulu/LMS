import { TableHeader, HOCList } from "@/widgets";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
} from "@mui/material";
import { tokensDark } from "@/app/providers/ThemeProvider";
import { StatusResponse } from "@/shared/enums";
import { Group } from "@/features/Groups/type";
import { editAttendanceService } from "./editAttendanceService";
import StudentRow from "./ui/row";

const EditAttendance = ({ group }: { group: Group }) => {
  const {
    attendancesList,
    getStudentsStatus,
    headerLinks,
    students,
    attendanceData,
    handleChangeAttendanceData,
    saveAttendanceData,
    editAttendanceStatus,
  } = editAttendanceService({
    selectedGroup: group,
  });

  return (
    <Box>
      <TableHeader
        showCreateButton={false}
        title={`Редактирование посещения группы за сегодня`}
        subtitle={`Название группы: ${group.name}`}
      />
      <HOCList
        isError={getStudentsStatus === StatusResponse.ERROR}
        isLoading={getStudentsStatus === StatusResponse.LOADING}
        isSuccess={getStudentsStatus === StatusResponse.SUCCESS}
        length={attendancesList.data.length}
        noLengthMessage="Отмеченных посещений за сегодня нет"
      >
        <TableContainer
          sx={{ background: tokensDark.primary[500] }}
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow>
                {headerLinks.map((link) => {
                  return <TableCell>{link}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => (
                <StudentRow
                  checked={
                    attendanceData.find((at) => at.student === student.id)
                      ?.attend
                  }
                  index={index}
                  row={student}
                  onChange={handleChangeAttendanceData}
                  inputValue={
                    attendanceData.find((at) => at.student === student.id)
                      ?.reason_for_absence
                  }
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          sx={{
            background: tokensDark.greenAccent[500],
            display: "block",
            m: "50px auto 0",
            width: "30%",
          }}
          variant="contained"
          onClick={saveAttendanceData}
          disabled={editAttendanceStatus === StatusResponse.LOADING}
        >
          Сохранить
        </Button>
      </HOCList>
    </Box>
  );
};

export default EditAttendance;
