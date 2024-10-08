import { useAppDispatch, useAppSelector } from "@/app/store"
import { StatusResponse } from "@/shared/enums"
import FullScreenModal from "@/shared/ui/FullScreenModal"
import { Box, Button, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { deleteSubject } from "../../store/actions"
import { Subject } from "../../type"
import EditManager from "../edit"

const ManagerInfo = ({ data }: { data: Subject }) => {
  const dispatch = useAppDispatch()
  const [modal, setModal] = useState({
    edit: false,
  })
  const deleteItem = () => {
    dispatch(deleteSubject(data.id))
  }

  return (
    <Box>
      <FullScreenModal
        open={modal.edit}
        handleClose={() => setModal({ ...modal, edit: false })}
      >
        <EditManager data={data} />
      </FullScreenModal>
      <table className="info_table">
        <tbody>
          <tr>
            <td>Название</td>
            <td>{data.predmet}</td>
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
        <Button color="error" variant="contained" onClick={deleteItem}>
          Удалить
        </Button>
      </Stack>
    </Box>
  )
}

export default ManagerInfo
