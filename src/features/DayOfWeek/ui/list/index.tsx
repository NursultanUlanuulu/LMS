import { HOCList, TableHeader } from "@/widgets"
import { Box } from "@mui/material"
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
import Info from "../info"

const List = () => {
  const {
    headerLinks,
    modal,
    list,
    activeManager,
    handleModal,
    handleChangeActiveManager,
    loading,
    error,
    success,
  } = listService()

  return (
    <Box>
      <FullScreenModal
        open={modal.create}
        handleClose={() => handleModal("create")}
      >
        <Create />
      </FullScreenModal>
      <FullScreenModal
        open={modal.info}
        handleClose={() => handleModal("info")}
      >
        <Info data={activeManager} />
      </FullScreenModal>
      <TableHeader
        title="День недели"
        addHandler={() => {
          handleModal("create")
        }}
        showCreateButton
        buttonText="Добавить день недели"
      />
      <HOCList
        isError={error}
        isLoading={loading}
        isSuccess={success}
        length={list.length}
        noLengthMessage="Дней недель нет"
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
              {list.map((row, index) => (
                <Row
                  key={index}
                  row={row}
                  callback={() => {
                    handleModal("info")
                    handleChangeActiveManager(row)
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

export default List
