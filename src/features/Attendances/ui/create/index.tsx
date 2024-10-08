import { Group } from "@/features/Groups/type";
import { StatusResponse } from "@/shared/enums";
import {
  Box,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Table,
  TableContainer,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Header } from "@/widgets";
import StudentRow from "./ui/studentRow";
import TrialStudentRow from "./ui/trialStudentRow";
import { tokensDark } from "@/app/providers/ThemeProvider";
import { Attendance } from "@/features/Attendances/type";
import { createAttendanceService } from "./createAttendanceService";
import { HOCList } from "@/widgets";
import { MySelect } from "@/shared/ui";

const AddAttendance = ({
  selectedGroup,
  submitAttendance,
}: {
  selectedGroup: Group;
  submitAttendance: (
    data: Omit<Attendance, "group"> & { teacher_who_conducted: number }
  ) => void;
}) => {
  const {
    handleChangeAttendanceData,
    onAddBtnClick,
    handleChangeTeacher,
    teacher,
    teachers,
    headerLinks,
    getJournalStatus,
    journal,
    students,
    attendanceData,
    checkStudentsLength,
    checkTrailStudentsLength,
  } = createAttendanceService({ selectedGroup, submitAttendance });

  return (
    <>
      <Box>
        <Header title="Отметить группу" />
        <Grid container spacing={2} mb={2}>
          <Grid item xl={4} lg={4} md={5} sm={8} xs={12}>
            <MySelect
              defaultValue={teacher}
              items={teachers}
              name="teacher"
              onBlur={handleChangeTeacher}
              onChange={handleChangeTeacher}
              value={teacher}
              labelName="Выбрать замену"
            />
          </Grid>
        </Grid>
        <HOCList
          isError={getJournalStatus === StatusResponse.ERROR}
          isLoading={getJournalStatus === StatusResponse.LOADING}
          isSuccess={getJournalStatus === StatusResponse.SUCCESS}
          length={checkStudentsLength}
          noLengthMessage="В группе нет студентов"
        >
          <TableContainer
            sx={{ background: tokensDark.primary[500] }}
            component={Paper}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {headerLinks.map((tableHeader: string) => (
                    <TableCell
                      key={tableHeader}
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: 700,
                      }}
                    >
                      {tableHeader}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {journal.students &&
                  students.map((student, index) => {
                    return (
                      <StudentRow
                        key={index}
                        row={student}
                        index={index}
                        inputValue={
                          attendanceData.find(
                            (at) => at.student === student.student_id
                          )?.reason_for_absence
                        }
                        onChange={handleChangeAttendanceData}
                      />
                    );
                  })}
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
            onClick={onAddBtnClick}
            disabled={attendanceData.length === 0}
          >
            Сохранить
          </Button>
        </HOCList>
      </Box>
      <HOCList
        isError={getJournalStatus === StatusResponse.ERROR}
        isLoading={getJournalStatus === StatusResponse.LOADING}
        isSuccess={getJournalStatus === StatusResponse.SUCCESS}
        length={checkTrailStudentsLength}
        noLengthMessage="В группе нет пробников"
      >
        <TableContainer
          sx={{ background: tokensDark.primary[500] }}
          component={Paper}
        >
          <Stack>
            <Typography
              sx={{ fontSize: "20px", marginTop: "50px" }}
              component="p"
            >
              Студенты пробники
            </Typography>
          </Stack>
          <Table>
            <TableHead>
              <TableRow>
                {headerLinks.map((tableHeader: string) => (
                  <TableCell
                    key={tableHeader}
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    {tableHeader}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {journal.trial_students &&
                journal.trial_students.map((student, index) => {
                  return (
                    <TrialStudentRow
                      key={index}
                      row={student}
                      index={index}
                      inputValue={
                        attendanceData.find(
                          (at) => at.student === student.student
                        )?.reason_for_absence
                      }
                      onChange={handleChangeAttendanceData}
                    />
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </HOCList>
    </>
  );
};

export default AddAttendance;
