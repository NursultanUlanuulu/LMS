import {
  SearchWidget,
  SelectFilterWidget,
  TableHeader,
  HOCList,
  CustomPagination,
} from "@/widgets";
import { Box, Grid } from "@mui/material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Row } from "./ui";
import { studentsPageService } from "./studentsPageService";
import { tokensDark } from "@/app/providers/ThemeProvider";
import FullScreenModal from "@/shared/ui/FullScreenModal";
import { CreateStudent } from "./components";
import { StatusResponse } from "@/shared/enums";

const StudentsPage = () => {
  const {
    tableHeaderLinks,
    studentsList,
    onCloseCreateModal,
    onOpenCreateModal,
    createModal,
    search,
    handleSearch,
    handleSearchClick,
    openDetailsPage,
    getStudentsStatus,
    handleChangePage,
    page,
  } = studentsPageService();
  return (
    <Box>
      <FullScreenModal open={createModal} handleClose={onCloseCreateModal}>
        <CreateStudent />
      </FullScreenModal>
      <TableHeader
        title="Студенты"
        addHandler={() => {
          onOpenCreateModal();
        }}
        showCreateButton
        buttonText="Добавить студента"
      />
      <Grid container spacing={2}>
        <Grid item xl={4} lg={4} md={5} sm={8} xs={12}>
          <SearchWidget
            handleSearchClick={handleSearchClick}
            search={search}
            handleSearch={handleSearch}
            placeholder="Поиск студента по ФИО, номеру "
          />
        </Grid>
      </Grid>

      <HOCList
        isError={getStudentsStatus === StatusResponse.ERROR}
        isLoading={getStudentsStatus === StatusResponse.LOADING}
        isSuccess={getStudentsStatus === StatusResponse.SUCCESS}
        length={studentsList.data.length}
        noLengthMessage="Студентов нет"
      >
        <TableContainer
          sx={{ background: tokensDark.primary[500] }}
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow>
                {tableHeaderLinks.map((tableHeader: string) => (
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
              {studentsList.data.map((row, index) => (
                <Row
                  key={index}
                  data={row}
                  callback={() => openDetailsPage(row.id ?? 0)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination
          handleChangePage={handleChangePage}
          defaultPage={page}
          totalCount={studentsList.amount}
          limit={studentsList.limit}
          pagesCount={studentsList.pagesCount}
          currentPage={page}
        />
      </HOCList>
    </Box>
  );
};

export default StudentsPage;
