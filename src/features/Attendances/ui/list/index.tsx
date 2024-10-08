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
  Typography,
  Stack,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import GroupRow from "./ui/row";
import listService from "./listService";
import { tokensDark } from "@/app/providers/ThemeProvider";
import FullScreenModal from "@/shared/ui/FullScreenModal";
import { StatusResponse } from "@/shared/enums";
import AddAttendance from "../create";
import GroupAttendanceList from "../groupAttendances";
import { toastError } from "@/shared/libs";
import EditAttendance from "../edit";

const AttendanceList = () => {
  const {
    headerLinks,
    create,
    handleChangeCreateAttendance,
    dateState,
    activeGroup,
    groups,
    handleChangeActiveGroup,
    handleChangePage,
    submitAttendance,
    page,
    groupAttendanceList,
    editAttendance,
    handleChangeGroupAttendanceList,
    handleChangeEditAttendance,
    time,
    timeChangeHandler,
    timeList,
  } = listService();
  return (
    <Box>
      <FullScreenModal open={create} handleClose={handleChangeCreateAttendance}>
        <AddAttendance
          selectedGroup={activeGroup}
          submitAttendance={submitAttendance}
        />
      </FullScreenModal>
      <FullScreenModal
        open={groupAttendanceList}
        handleClose={handleChangeGroupAttendanceList}
      >
        <GroupAttendanceList group={activeGroup} />
      </FullScreenModal>
      <FullScreenModal
        open={editAttendance}
        handleClose={handleChangeEditAttendance}
      >
        <EditAttendance group={activeGroup} />
      </FullScreenModal>
      <TableHeader
        showCreateButton={false}
        title="Посещения"
        buttonText="Отметить"
        subtitle="Для групп,у которых сегодня уроки"
      />
      <Stack direction="row" alignItems="center" gap={3} mb={5}>
        <Typography fontWeight={700} width={200} mb={"20px"}>
          {dateState.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}{" "}
          {dateState.toLocaleString("ru-RU", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </Typography>
        <Stack direction="column" gap={2}>
          <InputLabel
            sx={{ fontSize: "18px", color: "#fff", cursor: "pointer" }}
            id="demo-select-small-label"
          >
            Выберите время
          </InputLabel>
          <Select
            sx={{ width: "200px", height: "35px", color: "#fff" }}
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={time}
            onChange={timeChangeHandler}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            <MenuItem value="Текущее время">Текущее время</MenuItem>
            {timeList?.data.map((item) => (
              <MenuItem sx={{ color: "#ffff" }} key={item.id} value={item.id}>
                {item.time}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>
      <HOCList
        isError={groups.status === StatusResponse.ERROR}
        isLoading={groups.status === StatusResponse.LOADING}
        isSuccess={groups.status === StatusResponse.SUCCESS}
        length={groups.data.length}
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
              {groups.data.map((row, index) => (
                <GroupRow
                  key={index}
                  row={row}
                  createBtnCallback={() => {
                    if (row.can_create_attendance) {
                      handleChangeActiveGroup(row);
                      handleChangeCreateAttendance();
                    } else {
                      toastError(
                        "У этой группы уже добавлено посещение за этот день"
                      );
                    }
                  }}
                  editBtnCallback={() => {
                    handleChangeActiveGroup(row);
                    handleChangeEditAttendance();
                  }}
                  rowCallback={() => {
                    handleChangeActiveGroup(row);
                    handleChangeGroupAttendanceList();
                  }}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination
          handleChangePage={handleChangePage}
          defaultPage={page}
          totalCount={groups.amount}
          limit={groups.limit}
          pagesCount={groups.pagesCount}
          currentPage={page}
        />
      </HOCList>
    </Box>
  );
};

export default AttendanceList;
