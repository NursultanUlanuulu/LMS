import {
  CustomPagination,
  HOCList,
  SelectFilterWidget,
  TableHeader,
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
import Row from "./row"
import listService from "./listService"
import { tokensDark } from "@/app/providers/ThemeProvider"
import FullScreenModal from "@/shared/ui/FullScreenModal"
import Create from "../create"

const GroupsList = () => {
  const {
    headerLinks,
    onCloseCreateModal,
    onOpenCreateModal,
    createModal,
    filter,
    handleChangeFilter,
    navigate,
    resetFilter,
    listState,
    isError,
    isLoading,
    isSuccess,
    page,
    handleChangePage,
    subjects,
    daysOfWeek,
    teachers,
    times,
  } = listService()
  return (
    <Box>
      <FullScreenModal open={createModal} handleClose={onCloseCreateModal}>
        <Create onClose={onCloseCreateModal} />
      </FullScreenModal>
      <TableHeader
        title="Группы"
        addHandler={() => {
          onOpenCreateModal()
        }}
        showCreateButton
        buttonText="Добавить группу"
      />
      <Grid container spacing={2} alignItems="center" mb="10px">
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
          <Typography>Архивация</Typography>
          <SelectFilterWidget
            isAllExist={true}
            width="auto"
            name="archived"
            value={filter.archived}
            handleChangeValue={handleChangeFilter}
            menuItems={[
              { text: "Архивированные", value: "true" },
              { text: "Неархивированные", value: "false" },
            ]}
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
          <Typography>Выберите преподавателя</Typography>
          <SelectFilterWidget
            isAllExist={true}
            width="auto"
            name="current_teacher"
            value={filter.current_teacher}
            handleChangeValue={handleChangeFilter}
            menuItems={teachers}
          />
        </Grid>

        {/* status */}
        <Grid item xl={2} lg={3} md={4} sm={6} xs={6}>
          <Typography>Статус группы</Typography>
          <SelectFilterWidget
            isAllExist={true}
            width="auto"
            name="group_status"
            value={filter.group_status}
            handleChangeValue={handleChangeFilter}
            menuItems={[
              {
                value: "2",
                text: "Полные группы",
              },
              {
                value: "1",
                text: "Свободные группы",
              },
              {
                value: "3",
                text: "Переполненные группы",
              },
            ]}
          />
        </Grid>
        <Grid item xl={2} lg={3} md={4} sm={6} xs={6}>
          <Button
            onClick={resetFilter}
            sx={{
              mt: "18px",
              background: tokensDark.greenAccent[500],
              "&:hover": {
                background: tokensDark.greenAccent[900],
              },
            }}
            variant="contained"
            color="primary"
          >
            Очистить
          </Button>
        </Grid>
      </Grid>
      <HOCList
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        length={listState.data.length}
        noLengthMessage={"Нет групп"}
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
              {listState.data.map((row, index) => (
                <Row
                  key={index}
                  row={row}
                  callback={() => navigate("/groups/detail/" + row.id)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination
          handleChangePage={handleChangePage}
          defaultPage={page}
          totalCount={listState.amount}
          limit={listState.limit}
          pagesCount={listState.pagesCount}
          currentPage={page}
        />
      </HOCList>
    </Box>
  )
}

export default GroupsList
