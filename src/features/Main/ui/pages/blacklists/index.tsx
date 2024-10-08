import { CustomPagination, Header, HOCList, SearchWidget } from "@/widgets"
import { Box, Grid, Typography } from "@mui/material"
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
    search,
    handleSearch,
    handleSearchClick,
    page,
    handleChangePage,
  } = listService()
  return (
    <Box>
      <Header title="Черный список" />
      <Grid container spacing={2} alignItems="center">
        <Grid item xl={2} lg={3} md={4} sm={6} xs={6}>
          <Typography>Поиск</Typography>
          <SearchWidget
            handleSearchClick={handleSearchClick}
            search={search}
            handleSearch={handleSearch}
            placeholder="Поиск студента"
          />
        </Grid>
      </Grid>
      <HOCList
        isLoading={list.status === StatusResponse.LOADING}
        isError={list.status === StatusResponse.ERROR}
        isSuccess={list.status === StatusResponse.SUCCESS}
        length={list.data.length}
        noLengthMessage={"Нет студентов"}
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
          defaultPage={page}
          totalCount={list.amount}
          limit={list.limit}
          pagesCount={list.pagesCount}
          currentPage={page}
        />
      </HOCList>
    </Box>
  )
}

export default Pendings
