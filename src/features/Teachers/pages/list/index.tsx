import {
  CustomPagination,
  HOCList,
  SearchWidget,
  SelectFilterWidget,
  TableHeader,
} from "@/widgets"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Grid,
  Button,
} from "@mui/material"
import Row from "./row"
import listService from "./listService"
import { tokensDark } from "@/app/providers/ThemeProvider"
import FullScreenModal from "@/shared/ui/FullScreenModal"
import { Create } from "@/features/Teachers/ui"
import { useNavigate } from "react-router"

const TeacherList = () => {
  const {
    headerLinks,
    listState,
    onCloseCreateModal,
    onOpenCreateModal,
    createModal,
    filter,
    handleChangeFilter,
    handleSearch,
    handleSearchClick,
    isError,
    isLoading,
    isSuccess,
    handleChangePage,
    page,
    resetFilter,
  } = listService()

  const navigate = useNavigate()
  return (
    <Box>
      <FullScreenModal open={createModal} handleClose={onCloseCreateModal}>
        <Create onClose={onCloseCreateModal} />
      </FullScreenModal>
      <TableHeader
        title="Преподаватели"
        addHandler={() => {
          onOpenCreateModal()
        }}
        showCreateButton
        buttonText="Добавить преподавателя"
      />
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xl={4} lg={4} md={5} sm={8} xs={12}>
          <SelectFilterWidget
            isAllExist={false}
            width="auto"
            name="status"
            value={filter.status}
            handleChangeValue={handleChangeFilter}
            menuItems={[
              {
                value: "true",
                text: "Активные преподаватели",
              },
              {
                value: "false",
                text: "Неактивные преподаватели",
              },
            ]}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={5} sm={8} xs={12}>
          <SearchWidget
            handleSearchClick={handleSearchClick}
            search={filter.search}
            handleSearch={handleSearch}
            placeholder="Поиск преподавателя"
          />
        </Grid>
        <Grid item xl={2} lg={3} md={4} sm={6} xs={6}>
          <Button
            sx={{
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
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        length={listState.data.length}
        noLengthMessage={"Нет преподавателей"}
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
                  callback={() => {
                    navigate(`/teachers/details/${row.id}`)
                  }}
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

export default TeacherList
