import {
  CustomPagination,
  Header,
  HOCList,
  SelectFilterWidget,
} from "@/widgets";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Stack,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Row from "./ui/row";
import listService from "./model/service";
import { tokensDark } from "@/app/providers/ThemeProvider";
import { StatusResponse } from "@/shared/enums";
import { MyInput } from "@/shared/ui";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const Trials = () => {
  const {
    headerLinks,
    list,
    handleChangePage,
    page,
    filter,
    subjects,
    handleChangeFilter,
    handleSearchClick,
    handleSearchChange,
    search,
    resetSearchIcon,
    time,
    timeChangeHandler,
    timeList,
    resetHandler,
  } = listService();
  return (
    <Box>
      <Header title="Пробники" />
      <Grid container spacing={2} alignItems="center">
        <Grid item xl={2} lg={3} md={4} sm={6} xs={6}>
          <Typography>Поиск</Typography>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              margin: "10px 0px ",
              background: "#141b2d",
              border: "0.5px solid #535a69",
              ":hover": {
                border: "0.5px solid #fff",
              },
            }}
          >
            <IconButton onClick={handleSearchClick}>
              <SearchIcon />
            </IconButton>
            <InputBase
              name="search"
              value={search}
              autoComplete="off"
              onKeyUp={(event) => {
                if (event.key === "Enter") handleSearchClick();
              }}
              onChange={handleSearchChange}
              sx={{ ml: 1, flex: 1, color: "#fffff" }}
              placeholder="Ф.И.О"
            />
            <IconButton onClick={resetSearchIcon}>
              <ClearIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xl={2} lg={3} md={4} sm={6} xs={6}>
          <Typography>Выберите предмет</Typography>
          <SelectFilterWidget
            isTransparent={true}
            isAllExist={true}
            width="auto"
            name="group__subject"
            value={filter.group__subject}
            handleChangeValue={handleChangeFilter}
            menuItems={subjects}
          />
        </Grid>
        <Grid item xl={2} lg={3} md={4} sm={6} xs={6}>
          <Typography>Выберите время</Typography>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              margin: "10px 0px ",
              background: "#141b2d",
            }}
          >
            <Select
              sx={{
                width: "200px",
                height: "35px",
                color: "#fff",
              }}
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
              <MenuItem value="Выберите время">Выберите время</MenuItem>
              {timeList?.data.map((item) => (
                <MenuItem sx={{ color: "#ffff" }} key={item.id} value={item.id}>
                  {item.time}
                </MenuItem>
              ))}
            </Select>
          </Paper>
        </Grid>
        <Grid item xl={2} lg={3} md={4} sm={6} xs={6}>
          <Stack sx={{ height: "80px", gap: "11px" }}>
            <Typography>Дата пробного занятия</Typography>
            <MyInput
              type="date"
              name="lesson_date"
              labelName=""
              value={filter.lesson_date}
              onChange={handleChangeFilter}
              onBlur={() => {}}
            />
          </Stack>
        </Grid>
        <Grid item xl={2} lg={3} md={4} sm={6} xs={6}>
          <Button
            sx={{ color: "#ffff", marginTop: "20px" }}
            onClick={resetHandler}
            color="success"
            variant="contained"
          >
            Очистить
          </Button>
        </Grid>
      </Grid>
      <HOCList
        isLoading={list.status === StatusResponse.LOADING}
        isError={list.status === StatusResponse.ERROR}
        isSuccess={list.status === StatusResponse.SUCCESS}
        length={list.data.length}
        noLengthMessage={"Нет пробников"}
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
              {list.data?.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination
          handleChangePage={handleChangePage}
          defaultPage={page}
          totalCount={list.amount}
          limit={list.limit}
          pagesCount={list.pagesCount}
          currentPage={page}
        />
      </HOCList>
    </Box>
  );
};

export default Trials;
