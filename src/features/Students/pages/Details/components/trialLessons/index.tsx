import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  Grid,
} from "@mui/material"
import { tokensDark } from "@/app/providers/ThemeProvider"
import { HOCList, CustomPagination } from "@/widgets"
import { StatusResponse } from "@/shared/enums"
import trialLessonsService from "./trialLessonsService"

function TrialLessons({ id }: { id: number }) {
  const {
    handleChangePage,
    headerLinks,
    page,
    getTrialLessonsStatus,
    trialLessonsList,
    navigate,
  } = trialLessonsService(id)
  return (
    <Box>
      <HOCList
        isLoading={getTrialLessonsStatus === StatusResponse.LOADING}
        isError={getTrialLessonsStatus === StatusResponse.ERROR}
        isSuccess={getTrialLessonsStatus === StatusResponse.SUCCESS}
        length={trialLessonsList.data.length}
        noLengthMessage={"У студента нет пробных уроков"}
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
              {trialLessonsList.data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.group_subject}</TableCell>
                  <TableCell
                    onClick={() => {
                      navigate("/groups/detail/" + row.group)
                    }}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    {row.group_name}
                  </TableCell>
                  <TableCell>{row.group_time}</TableCell>
                  <TableCell>
                    {row.day_of_the_week.map(w => w.week_day).join(",")}
                  </TableCell>
                  <TableCell>
                    {new Date(row.lesson_date).toLocaleDateString()}
                  </TableCell>

                  <TableCell>{row.is_participated ? "Да" : "Нет"}</TableCell>
                  <TableCell>{row.is_active ? "Нет" : "Да"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination
          handleChangePage={handleChangePage}
          defaultPage={page}
          totalCount={trialLessonsList.amount}
          limit={trialLessonsList.limit}
          pagesCount={trialLessonsList.pagesCount}
          currentPage={page}
        />
      </HOCList>
    </Box>
  )
}

export default TrialLessons
