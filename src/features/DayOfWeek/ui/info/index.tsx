import { useAppDispatch, useAppSelector } from "@/app/store"
import FullScreenModal from "@/shared/ui/FullScreenModal"
import { Box, Button, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { deleteDayOfWeek } from "../../store/actions"
import { DayOfWeek } from "../../type"
import EditManager from "../edit"

const ManagerInfo = ({ data }: { data: DayOfWeek }) => {
  const dispatch = useAppDispatch()
  const [modal, setModal] = useState({
    edit: false,
  })
  const deleteItem = () => {
    dispatch(deleteDayOfWeek(data.id))
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
            <td>{data.week_day}</td>
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
