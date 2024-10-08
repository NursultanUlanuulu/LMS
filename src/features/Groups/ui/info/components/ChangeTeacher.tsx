import { tokensDark } from "@/app/providers/ThemeProvider"
import { Box, IconButton, Modal, Paper, Select } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import MenuItem from "@mui/material/MenuItem/MenuItem"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { getList } from "@/features/Teachers/store/actions"
import { selectListTeachers } from "@/features/Teachers/store/selector"
import { toastError } from "@/shared/libs"

const ChangeTeacher = ({
  open,
  handleClose,
  agreeCallback,
  oldTeacher,
}: {
  open: boolean
  handleClose: () => void
  agreeCallback: (id: number) => void
  oldTeacher: string
}) => {
  const [selectedTeacher, setSelectedTeacher] = useState(0)
  const dispatch = useAppDispatch()
  const teachers = useAppSelector(selectListTeachers)
    .data.filter(teacher => teacher.full_name !== oldTeacher)
    .map(teacher => {
      return {
        text: teacher.full_name,
        value: teacher.id,
      }
    })
  useEffect(() => {
    dispatch(getList({ page: 1, search: "", is_active: "true", per_page: 100 }))
  }, [])
  return (
    <Modal sx={{ overflowY: "scroll" }} open={open} onClose={handleClose}>
      <Box
        sx={{
          maxWidth: "500px",
          margin: "250px auto 10px auto",
          background: tokensDark.primary[500],
          padding: "20px",
          "@media(max-width:640px)": {
            maxWidth: "95%",
          },
        }}
        component={Paper}
      >
        <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
          Поменять учителя
        </Typography>
        <Select
          value={selectedTeacher}
          onChange={e => setSelectedTeacher(Number(e.target.value))}
          fullWidth
          sx={{ my: "20px" }}
        >
          {teachers.map(teacher => {
            return <MenuItem value={teacher.value}>{teacher.text}</MenuItem>
          })}
        </Select>
        <Stack direction="row" spacing={2}>
          <Button sx={{ color: "#fff" }} onClick={handleClose}>
            Отмена
          </Button>
          <Button
            sx={{ color: "#fff" }}
            onClick={() => {
              if (selectedTeacher) {
                agreeCallback(selectedTeacher)
              } else {
                toastError("Выберите нового преподавателя")
              }
            }}
          >
            Да
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default ChangeTeacher
