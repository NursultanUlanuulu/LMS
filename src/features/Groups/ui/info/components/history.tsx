import { tokensDark } from "@/app/providers/ThemeProvider";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { getGroupHistory } from "@/features/Groups/store/actions";
import {
  selectGetHistoryGroupStatus,
  selectHistoryGroup,
} from "@/features/Groups/store/selector";
import { StatusResponse } from "@/shared/enums";
import { getFormatedDate } from "@/shared/libs";
import { CustomPagination, HOCList, SearchWidget } from "@/widgets";
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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const History = () => {
  const [search, setSearch] = useState<string>("");
  const [text, setText] = useState({
    first: "",
    second: "",
  });
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectHistoryGroup);
  const status = useAppSelector(selectGetHistoryGroupStatus);
  const headerLinks = ["Дата", "Автор" , "Описание",];
  const isLoading = status === StatusResponse.LOADING;
  const isError = status === StatusResponse.ERROR;
  const isSuccess = status === StatusResponse.SUCCESS;
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleSearchClick = () => {
    dispatch(getGroupHistory({ search, page, group: id as unknown as number }));
  };
  const handleChangePage = (
    _: React.ChangeEvent<HTMLInputElement>,
    page: number
  ) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    dispatch(getGroupHistory({ search, page, group: id as unknown as number }));
  }, [page]);

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
        <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
          <SearchWidget
            handleSearchClick={handleSearchClick}
            search={search}
            handleSearch={handleSearch}
            placeholder="Поиск"
          />
        </Grid>
      </Grid>
      <HOCList
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
        length={list.data.length}
        noLengthMessage="Истории нет"
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
                  <TableCell>{getFormatedDate(row.created_at)}</TableCell>
                  <TableCell>{row.user}</TableCell>
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
