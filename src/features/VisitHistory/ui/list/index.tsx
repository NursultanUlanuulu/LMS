import React from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { historyService } from "./listService";
import { CustomPagination, HOCList } from "@/widgets";
import { StatusResponse } from "@/shared/enums";
import StudentRows from "../row/row";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // Choose a theme that you prefer
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/l10n/ru";

const VisitReportsList: React.FC = () => {
  const {
    selectedTime,
    handleTimeChange,
    attendancesList,
    page,
    handleChangePage,
    sortedData,
    getStudentsStatus,
    students,
    resetHandler,
    searchHandler,
    searchChangeHandler,
    search,
    resetSearchHandler,
  } = historyService();
  return (
    <Box>
      <Stack mb={3}>
        <Stack direction="row" gap={5} flexWrap="wrap">
          <Grid item xl={2} lg={3} md={4} sm={6} xs={6}>
            <Typography sx={{ fontSize: "18px" }}>
              Поиск по назаниям групп
            </Typography>
            <Paper
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                margin: "10px 0px ",
                background: "#141b2d",
                borderRadius: "10px",
                border: "2px solid #4cceac",
              }}
            >
              <IconButton onClick={searchHandler}>
                <SearchIcon />
              </IconButton>
              <InputBase
                name="search"
                value={search}
                autoComplete="off"
                onKeyUp={(event) => {
                  if (event.key === "Enter") searchHandler();
                }}
                onChange={searchChangeHandler}
                sx={{ ml: 1, flex: 1, color: "#fffff" }}
                placeholder="Название группы"
              />
              <IconButton onClick={resetSearchHandler}>
                <ClearIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Stack direction="column" spacing={1}>
            <Typography sx={{ fontSize: "18px", color: "#fff" }}>
              Выберите дату и время
            </Typography>
            <StyledDatePicker
              id="timeInputId"
              placeholder="гггг-мм-дд.чч:мм"
              value={selectedTime}
              onChange={handleTimeChange}
              options={{
                enableTime: true,
                dateFormat: "d F Y H:i",
                defaultDate: selectedTime,
                time_24hr: true,
                locale: "ru",
              }}
            />
          </Stack>
          <Stack>
            <Button
              sx={{ color: "#ffff" }}
              onClick={resetHandler}
              color="success"
              variant="contained"
            >
              Очистить
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <HOCList
        isError={getStudentsStatus === StatusResponse.ERROR}
        isLoading={getStudentsStatus === StatusResponse.LOADING}
        isSuccess={getStudentsStatus === StatusResponse.SUCCESS}
        length={sortedData.length}
        noLengthMessage="Отмеченных посещений нет"
      >
        {attendancesList.data.map((group) => {
          return (
            <StudentRows
              key={group.id}
              group={group}
              sortedData={sortedData}
              students={students}
            />
          );
        })}

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
  );
};

const StyledDatePicker = styled(Flatpickr)`
  background-color: inherit;
  padding: 11px;
  border-radius: 10px;
  border: 2px solid rgb(76, 206, 172);
  color: #b7ebde;
  width: 210px;
  mask-type: alpha;
  font-size: 14px;
`;

export default VisitReportsList;
