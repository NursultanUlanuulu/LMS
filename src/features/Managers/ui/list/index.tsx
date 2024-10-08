import {
  HOCList,
  SearchWidget,
  SelectFilterWidget,
  TableHeader,
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
import Row from "./row";
import listService from "./listService";
import { tokensDark } from "@/app/providers/ThemeProvider";
import FullScreenModal from "@/shared/ui/FullScreenModal";
import CreateManager from "../create";
import { Loading } from "@/shared/ui";
import { StatusResponse } from "@/shared/enums";
import ManagerEdit from "../edit";
import PromptModal from "@/widgets/PropmptModal";

const ManagersList = () => {
  const {
    headerLinks,
    modal,
    managers,
    activeManager,
    getManagersStatus,
    handleModal,
    handleChangeActiveManager,
    handleDeleteManager,
  } = listService();
  return (
    <Box>
      <FullScreenModal
        open={modal.create}
        handleClose={() => handleModal("create")}
      >
        <CreateManager />
      </FullScreenModal>
      <FullScreenModal
        open={modal.edit}
        handleClose={() => handleModal("edit")}
      >
        <ManagerEdit manager={activeManager} />
      </FullScreenModal>
      <PromptModal
        open={modal.delete}
        agreeCallback={handleDeleteManager}
        text="Вы действительно хотите удалить менеджера?"
        handleClose={() => handleModal("delete")}
      />
      <TableHeader
        title="Менеджеры"
        addHandler={() => {
          handleModal("create");
        }}
        showCreateButton
        buttonText="Добавить аккаунт менеджера"
      />

      <HOCList
        isError={getManagersStatus === StatusResponse.ERROR}
        isLoading={getManagersStatus === StatusResponse.LOADING}
        isSuccess={getManagersStatus === StatusResponse.SUCCESS}
        length={managers.length}
        noLengthMessage="Менеджеров нет"
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
              {managers.map((row, index) => (
                <Row
                  key={index}
                  row={row}
                  editCallback={() => {
                    handleModal("edit");
                    handleChangeActiveManager(row);
                  }}
                  deleteCallback={() => {
                    handleModal("delete");
                    handleChangeActiveManager(row);
                  }}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </HOCList>
    </Box>
  );
};

export default ManagersList;
