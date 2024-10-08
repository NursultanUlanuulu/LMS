import { tokensDark } from "@/app/providers/ThemeProvider"
import { signUpPageService } from "./signUpForCourseService"
import { StatusResponse } from "@/shared/enums"
import CommonModal from "@/shared/ui/CommonModal"
import {
  Header,
  HOCList,
  SelectFilterWidget,
  CustomPagination,
} from "@/widgets"
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import AddPice from "../AddPrice"
import SignUpRow from "./row"

const headerLinks = [
  "Время",
  "Предмет",
  "Уровень",
  "Дни",
  "Кол-во студентов",
  "Преподаватель",
  "Действие",
]

const SignUp = ({ text }: { text: string }) => {
  const {
    filter,
    subjects,
    teachers,
    weekDays,
    times,
    getGroupsStatus,
    groupsList,
    page,
    tariffModal,
    handleChangePage,
    handleChangeFilter,
    handleClearFilter,
    handleChangeTariffModal,
    signUpStudent,
    addToTrial,
    setActiveGroup,
  } = signUpPageService(text)

  return (
    <Box>
      <CommonModal handleClose={handleChangeTariffModal} open={tariffModal}>
        <AddPice callback={signUpStudent} />
      </CommonModal>
      <Header title={text} />
      <Grid container spacing={2} my="16px" alignItems="center">
        <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
          <Box>
            <Typography>Предмет</Typography>
            <SelectFilterWidget
              isAllExist={false}
              width="auto"
              name="subject"
              value={filter.subject}
              inputLabel="Выберите предмет"
              handleChangeValue={handleChangeFilter}
              menuItems={subjects}
            />
          </Box>
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
          <Box>
            <Typography>Преподаватель</Typography>
            <SelectFilterWidget
              isAllExist={false}
              width="auto"
              name="teacher"
              value={filter.teacher}
              inputLabel="Выберите преподавателя"
              handleChangeValue={handleChangeFilter}
              menuItems={teachers}
            />
          </Box>
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
          <Box>
            <Typography>Выберите день</Typography>
            <SelectFilterWidget
              isAllExist={false}
              width="auto"
              inputLabel="Выберите день"
              name="days"
              multiple={false}
              value={filter.days}
              handleChangeValue={handleChangeFilter}
              menuItems={weekDays}
            />
          </Box>
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
          <Box>
            <Typography>Выберите время</Typography>
            <SelectFilterWidget
              isAllExist={false}
              width="auto"
              inputLabel="Выберите время"
              name="time"
              value={filter.time}
              handleChangeValue={handleChangeFilter}
              menuItems={times}
            />
          </Box>
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={6} xs={12} alignSelf="center">
          <Button
            sx={{
              mt: "20px",
              height: "36px",
              background: tokensDark.greenAccent[500],
              color: "#fff",
              "&:hover": {
                background: tokensDark.greenAccent[900],
              },
            }}
            fullWidth
            variant="contained"
            color="info"
            onClick={handleClearFilter}
          >
            Очистить фильтр
          </Button>
        </Grid>
      </Grid>
      <HOCList
        isError={getGroupsStatus === StatusResponse.ERROR}
        isLoading={getGroupsStatus === StatusResponse.LOADING}
        isSuccess={getGroupsStatus === StatusResponse.SUCCESS}
        length={groupsList.data.length}
        noLengthMessage="Групп нет"
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
              {groupsList.data.map(row => (
                <SignUpRow
                  key={row.id}
                  row={row}
                  text={text}
                  handleChangeTariffModal={handleChangeTariffModal}
                  addToTrial={addToTrial}
                  setActiveGroup={setActiveGroup}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination
          handleChangePage={handleChangePage}
          defaultPage={page}
          totalCount={groupsList.amount}
          limit={groupsList.limit}
          pagesCount={groupsList.pagesCount}
          currentPage={page}
        />
      </HOCList>
    </Box>
  )
}

export default SignUp
