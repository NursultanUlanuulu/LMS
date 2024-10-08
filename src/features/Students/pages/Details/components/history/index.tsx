import { tokensDark } from "@/app/providers/ThemeProvider";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { getGroupList } from "@/features/Groups/store/actions";
import { selectGroups } from "@/features/Groups/store/selector";
import { getSubjectsList } from "@/features/Subjects/store/actions";
import { selectSubjects } from "@/features/Subjects/store/selector";
import groups from "@/features/Teachers/pages/details/components/groups";
import { getListHistoryTeacher } from "@/features/Teachers/store/actions";
import { selectListHistoryTeachers } from "@/features/Teachers/store/selector";
import { StatusResponse } from "@/shared/enums";
import {
  CustomPagination,
  HOCList,
  SearchWidget,
  SelectFilterWidget,
} from "@/widgets";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const History = ({ id }: { id: number }) => {
  const [filter, setFilter] = useState({ subject: "", group: "" });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const { status, ...list } = useAppSelector(selectListHistoryTeachers);
  const isLoading = status === StatusResponse.LOADING;
  const isError = status === StatusResponse.ERROR;
  const isSuccess = status === StatusResponse.SUCCESS;
  const groups = useAppSelector(selectGroups).data.map((group) => {
    return {
      text: group.name,
      value: group.id,
    };
  });
  const subjects = useAppSelector(selectSubjects).data.map((group) => {
    return {
      text: group.predmet,
      value: group.id,
    };
  });
  const handleChangePage = (
    event: React.ChangeEvent<HTMLInputElement>,
    page: number
  ) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleSearchClick = () => {
    setPage(1);
    dispatch(
      getListHistoryTeacher({
        page,
        user: id,
        search,
      })
    );
  };
  const handleChangeFilter = (event: any) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };
  const headerLinks = ["Дата операции", "Автор", "Описание",];

  useEffect(() => {
    dispatch(
      getListHistoryTeacher({
        page,
        user: id,
        search,
        subject: filter.subject,
        group: filter.group,
      })
    );
  }, [page, filter]);
  useEffect(() => {
    dispatch(
      getGroupList({
        page: 1,
        filter: { student: id.toString(), archived: "false" },
        per_page: 200,
      })
    );
    dispatch(getSubjectsList());
  }, []);
  const splitText = (text: string, first: number) => {
    const result = text.split(/\s+/).filter((word) => word === "на");
    const parts = text.split(result[0]);

    if (result.length > 0 && result[0] === "на") {
      return first === 1 ? parts[0] : parts[1];
    }

    return first === 0 && result[0] !== "на" ? "" : parts[0];
  };
  return (
    <Box>
      <Grid container spacing={2} my="16px" alignItems="center">
        {/* <Grid item xl={3} lg={3} md={6} sm={6} xs={12} spacing={1}>
          <Box>
            <Typography>Предмет</Typography>
            <SelectFilterWidget
              isAllExist={false}
              width="auto"
              name="subject"
              value={filter.subject}
              handleChangeValue={handleChangeFilter}
              menuItems={subjects}
            />
          </Box>
        </Grid>
        <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
          <Box>
            <Typography>Группа</Typography>
            <SelectFilterWidget
              isAllExist={false}
              width="auto"
              name="group"
              value={filter.group}
              handleChangeValue={handleChangeFilter}
              menuItems={groups}
            />
          </Box>
        </Grid> */}
        <Grid item xl={3} lg={3} md={6} sm={6} xs={12} alignSelf="flex-end">
          <SearchWidget
            handleSearchClick={handleSearchClick}
            search={search}
            handleSearch={handleSearch}
            placeholder="Поиск"
          />
        </Grid>
      </Grid>
      <HOCList
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        length={list.amount}
        noLengthMessage={"Истории нет"}
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
              {list.data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(row.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>{row.manager}</TableCell>
                  <TableCell>{`${splitText(row.description, 1)} ${splitText(row.description, 0) && ` на: ${splitText(row.description, 0)}`}`}</TableCell>
                </TableRow>
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

export default History;
