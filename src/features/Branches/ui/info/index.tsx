import { useAppDispatch } from "@/app/store";
import FullScreenModal from "@/shared/ui/FullScreenModal";
import PromptModal from "@/widgets/PropmptModal";
import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { deleteBranch } from "../../store/actions";
import { Branch } from "../../type";
import EditBranch from "../edit";

const BranchInfo = ({ branch }: { branch: Branch }) => {
  const [modal, setModal] = useState({
    edit: false,
    delete: false,
  });

  const dispatch = useAppDispatch();

  const handleDeleteBranch = () => {
    dispatch(deleteBranch(branch.id ?? 0));
  };

  return (
    <Box>
      <FullScreenModal
        open={modal.edit}
        handleClose={() => setModal({ ...modal, edit: false })}
      >
        <EditBranch branch={branch} />
      </FullScreenModal>
      <PromptModal
        handleClose={() => {
          setModal({ ...modal, delete: false });
        }}
        open={modal.delete}
        text={"Вы действительно хотите удалить данный филиал"}
        agreeCallback={() => {
          handleDeleteBranch();
          setModal({ ...modal, delete: false });
        }}
      />
      <table className="info_table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>{branch.id}</td>
          </tr>
          <tr>
            <td>Название</td>
            <td>{branch.name}</td>
          </tr>
          <tr>
            <td>Адрес</td>
            <td>{branch.address}</td>
          </tr>
        </tbody>
      </table>
      <Stack spacing={2} direction="row" mt="16px">
        <Button
          color="success"
          variant="contained"
          onClick={() => setModal({ ...modal, edit: true })}
        >
          Редактировать
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={() => setModal({ ...modal, delete: true })}
        >
          Удалить
        </Button>
      </Stack>
    </Box>
  );
};

export default BranchInfo;
