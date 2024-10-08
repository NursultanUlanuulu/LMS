import {
  CustomPagination,
  Header,
  HOCList,
  MultipleSelect,
  SearchWidget,
  SelectFilterWidget,
} from "@/widgets"
import { Box, Button, Grid, Typography } from "@mui/material"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import Row from "./ui/row"
import listService from "./model/service"
import { tokensDark } from "@/app/providers/ThemeProvider"
import { StatusResponse } from "@/shared/enums"

const Pendings = () => {
  const {
    headerLinks,
    list,
    filter,
    handleChangeFilter,
    resetFilter,
    handleSearchClick,
    daysOfWeek,
    times,
    subjects,
    handleChangePage,
  } = listService()
  return (
    <Box>
      <Header title="Незаписанные" />
      <Grid container spacing={2} alignItems="center">
        <Grid item xl={2} lg={3} md={4} sm={6} xs={6}>
          <Typography>Поиск</Typography>
          <SearchWidget
            handleSearchClick={handleSearchClick}
            search={filter.search || ""}
            handleSearch={handleChangeFilter}
            placeholder="Поиск студента"
          />
        </Grid>
        <Grid item xl={2} lg={3} md={4} sm={6} xs={6}>
          <Typography>Выберите предмет</Typography>
          <SelectFilterWidget
            isAllExist={true}
            width="auto"
            name="subject"
            value={filter.subject}
            handleChangeValue={handleChangeFilter}
            menuItems={subjects}
          />
        </Grid>
        <Grid item xl={2} lg={3} md={4} sm={6} xs={6}>
          <Typography>Выберите дни</Typography>
          <SelectFilterWidget
            isAllExist={true}
            width="auto"
            name="day_of_the_week"
            value={filter.day_of_the_week}
            handleChangeValue={handleChangeFilter}
            menuItems={daysOfWeek}
          />
        </Grid>
        <Grid item xl={2} lg={3} md={4} sm={6} xs={6}>
          <Typography>Выберите время</Typography>
          <SelectFilterWidget
            isAllExist={true}
            width="auto"
            name="time"
            value={filter.time}
            handleChangeValue={handleChangeFilter}
            menuItems={times}
          />
        </Grid>
        <Grid item xl={2} lg={3} md={4} sm={6} xs={6}>
          <Button
            sx={{
              mt: "20px",
              background: tokensDark.greenAccent[500],
              "&:hover": {
                background: tokensDark.greenAccent[900],
              },
            }}
            onClick={resetFilter}
            variant="contained"
            color="primary"
          >
            Очистить
          </Button>
        </Grid>
      </Grid>
      <HOCList
        isError={list.status === StatusResponse.ERROR}
        isLoading={list.status === StatusResponse.LOADING}
        isSuccess={list.status === StatusResponse.SUCCESS}
        length={list.data.length}
        noLengthMessage="Студентов нет"
      >
        <TableContainer
          sx={{ background: tokensDark.primary[500], mt: "20px" }}
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
              {list.data.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination
          handleChangePage={handleChangePage}
          defaultPage={filter.page}
          totalCount={list.amount}
          limit={list.limit}
          pagesCount={list.pagesCount}
          currentPage={filter.page}
        />
      </HOCList>
    </Box>
  )
}

export default Pendings
