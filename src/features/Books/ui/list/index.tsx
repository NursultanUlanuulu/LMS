import { HOCList, Header, SelectFilterWidget, TableHeader } from "@/widgets"
import { Box, Grid } from "@mui/material"
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
import EditBook from "../edit"

import FullScreenModal from "@/shared/ui/FullScreenModal"
import CreateBook from "../create"
import { StatusResponse } from "@/shared/enums"
import PromptModal from "@/widgets/PropmptModal"
import CommonModal from "@/shared/ui/CommonModal"
import AddPrice from "@/features/Students/pages/Details/components/courses/AddPrice"

const BookList = () => {
  const {
    headerLinks,
    filter,
    activeBook,
    books,
    modals,
    subjectsList,
    getBooksStatus,
    handleDeleteBook,
    handleChangeActiveBook,
    handleChangeModals,
    handleChangeFilter,
    onAddAmount,
  } = listService()

  return (
    <Box>
      <FullScreenModal
        open={modals.create}
        handleClose={() => {
          handleChangeModals("create")
        }}
      >
        <CreateBook />
      </FullScreenModal>

      <FullScreenModal
        open={modals.edit}
        handleClose={() => {
          handleChangeModals("edit")
        }}
      >
        <EditBook book={activeBook} />
      </FullScreenModal>
      <PromptModal
        open={modals.delete}
        agreeCallback={() => {
          handleDeleteBook()
          handleChangeModals("delete")
        }}
        handleClose={() => {
          handleChangeModals("delete")
        }}
        text="Вы действительно хотите удалить данную книгу?"
      />
      <CommonModal
        open={modals.addAmount}
        handleClose={() => {
          handleChangeModals("addAmount")
        }}
      >
        <AddPrice
          label="Укажите количество"
          title="Добавить количество книги"
          callback={amount => {
            onAddAmount(amount)
            handleChangeModals("addAmount")
          }}
        />
      </CommonModal>
      <TableHeader
        title="Книги"
        addHandler={() => {
          handleChangeModals("create")
        }}
        showCreateButton
        buttonText="Добавить книгу"
      />
      <Grid container spacing={2}>
        <Grid item xl={4} lg={4} md={5} sm={8} xs={12}>
          <SelectFilterWidget
            width="auto"
            name="filter"
            value={filter}
            handleChangeValue={handleChangeFilter}
            isAllExist={false}
            menuItems={subjectsList}
          />
        </Grid>
      </Grid>

      <HOCList
        isError={getBooksStatus === StatusResponse.ERROR}
        isLoading={getBooksStatus === StatusResponse.LOADING}
        isSuccess={getBooksStatus === StatusResponse.SUCCESS}
        length={books.length}
        noLengthMessage="Книг нет"
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
                      fontSize: "18px",
                    }}
                  >
                    {tableHeader}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((row, index) => (
                <Row
                  key={index}
                  row={row}
                  editCallback={() => {
                    handleChangeActiveBook(row)
                    handleChangeModals("edit")
                  }}
                  deleteCallback={() => {
                    handleChangeActiveBook(row)
                    handleChangeModals("delete")
                  }}
                  addAmountCallback={() => {
                    handleChangeActiveBook(row)
                    handleChangeModals("addAmount")
                  }}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </HOCList>
    </Box>
  )
}

export default BookList
