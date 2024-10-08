import { TableHeader, HOCList, CustomPagination } from "@/widgets"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material"
import { groupAttendancesListService } from "./groupAttendancesService"
import { tokensDark } from "@/app/providers/ThemeProvider"
import { StatusResponse } from "@/shared/enums"
import { Group } from "@/features/Groups/type"

const GroupAttendanceList = ({ group }: { group: Group }) => {
  const {
    attendancesList,
    getStudentsStatus,
    handleChangePage,
    page,
    students,
    sortedData,
  } = groupAttendancesListService({ selectedGroup: group })
  return (
    <Box>
      <TableHeader
        showCreateButton={false}
        title={`Посещения группы `}
        subtitle={`Название группы: ${group.name}`}
      />
      <HOCList
        isError={getStudentsStatus === StatusResponse.ERROR}
        isLoading={getStudentsStatus === StatusResponse.LOADING}
        isSuccess={getStudentsStatus === StatusResponse.SUCCESS}
        length={sortedData.length}
        noLengthMessage="Отмеченных посещений нет"
      >
        <TableContainer
          sx={{ background: tokensDark.primary[500] }}
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ФИО студента</TableCell>
                <TableCell>Пробник ли</TableCell>
                {sortedData.map(entry => (
                  <TableCell key={entry.id}>
                    {new Date(entry.date).toLocaleDateString()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map(student => (
                <TableRow key={student.name}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.trial ? "Да" : "Нет"}</TableCell>
                  {sortedData.map(entry  => {
                    const studentEntry = entry.students.find(
                      s => s.student_name === student.name
                    )
                    let attendanceStatus: string | null = "-"

                    if (studentEntry !== undefined) {
                      if (studentEntry.attend === true) {
                        attendanceStatus = "Присутствовал"
                      } else if (studentEntry.status) {
                        attendanceStatus = studentEntry.status
                      } else {
                        attendanceStatus = studentEntry.reason_for_absence
                      }
                    }
                    return (
                      <TableCell key={`${student}-${entry.id}`}>
                        {attendanceStatus}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination
          handleChangePage={handleChangePage}
          defaultPage={page}
          totalCount={attendancesList.amount}
          limit={attendancesList.limit}
          pagesCount={attendancesList.pagesCount}
          currentPage={page}
        />
      </HOCList>
    </Box>
  )
}

export default GroupAttendanceList
