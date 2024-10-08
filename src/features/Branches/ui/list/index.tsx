import {
  HOCList,
  SearchWidget,
  SelectFilterWidget,
  TableHeader,
} from "@/widgets"
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
import FullScreenModal from "@/shared/ui/FullScreenModal"
import CreateBranch from "../create"
import BranchInfo from "../info"
import { StatusResponse } from "@/shared/enums"

const BranchesList = () => {
  const {
    headerLinks,
    modal,
    branches,
    activeBranch,
    getBranchesStatus,
    handleModal,
    handleChangeActiveBranch,
  } = listService()
  return (
    <Box>
      <FullScreenModal
        open={modal.create}
        handleClose={() => handleModal("create")}
      >
        <CreateBranch />
      </FullScreenModal>
      <FullScreenModal
        open={modal.info}
        handleClose={() => handleModal("info")}
      >
        <BranchInfo branch={activeBranch} />
      </FullScreenModal>
      <TableHeader
        title="Филиалы"
        addHandler={() => {
          handleModal("create")
        }}
        showCreateButton
        buttonText="Добавить филиал"
      />

      <HOCList
        isError={getBranchesStatus === StatusResponse.ERROR}
        isLoading={getBranchesStatus === StatusResponse.LOADING}
        isSuccess={getBranchesStatus === StatusResponse.SUCCESS}
        length={branches.length}
        noLengthMessage="Филиалов нет"
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
              {branches.map((row, index) => (
                <Row
                  key={index}
                  row={row}
                  callback={() => {
                    handleChangeActiveBranch(row)
                    handleModal("info")
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

export default BranchesList
