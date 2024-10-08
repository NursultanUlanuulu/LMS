import { useAppDispatch } from "@/app/store"
import {
  archiveGroup,
  changeTeacher,
  editGroup,
} from "@/features/Groups/store/actions"
import { Group } from "@/features/Groups/type"
import PromptModal from "@/widgets/PropmptModal"
import { Box, Stack, Button } from "@mui/material"
import { useState } from "react"
import ChangeTeacher from "./ChangeTeacher"
import { getFormatedDate } from "@/shared/libs"

const Info = ({ data }: { data: Group }) => {
  const [modal, setModal] = useState({
    edit: false,
    archive: false,
    removeFromArchive: false,
  })
  const dispatch = useAppDispatch()

  return (
    <Box>
      <PromptModal
        open={modal.archive}
        text="Вы уверены архивирать группу?"
        agreeCallback={() => {
          dispatch(
            archiveGroup({ archived: true, groupId: data.id, is_active: false })
          )
          setModal({ ...modal, archive: false })
        }}
        handleClose={() => {
          setModal({ ...modal, archive: false })
        }}
      />

      <PromptModal
        open={modal.removeFromArchive}
        text="Вы уверены разархивировать группу?"
        agreeCallback={() => {
          dispatch(
            archiveGroup({ archived: false, groupId: data.id, is_active: true })
          )
          setModal({ ...modal, removeFromArchive: false })
        }}
        handleClose={() => {
          setModal({ ...modal, removeFromArchive: false })
        }}
      />

      <ChangeTeacher
        oldTeacher={data.current_teacher_name || ""}
        open={modal.edit}
        agreeCallback={(id: number) => {
          dispatch(changeTeacher({ id: data.id, teacherId: id }))
          setModal({ ...modal, edit: false })
        }}
        handleClose={() => {
          setModal({ ...modal, edit: false })
        }}
      />
      <table className="info_table">
        <tbody>
          <tr>
            <td>Курс</td>
            <td>{data.name}</td>
          </tr>
          <tr>
            <td>Преподаватель</td>
            <td>{data.current_teacher_name}</td>
          </tr>
          <tr>
            <td>Время урока</td>
            <td>{data.time}</td>
          </tr>
          <tr>
            <td>Дни</td>
            <td>
              {data.day_of_the_week
                ?.map(day => {
                  return day.week_day
                })
                .join(" - ")}
            </td>
          </tr>
          <tr>
            <td>Кол-во студентов</td>
            <td>
              {data.exists_students || 0}/{data.max_student_count}
            </td>
          </tr>
          <tr>
            <td>Кол-во уроков</td>
            <td>{data.number_of_lessons}</td>
          </tr>
          <tr>
            <td>Стоимость одного поурочного занятия</td>
            <td>{data.pourochno_price || 0} сом</td>
          </tr>
          <tr>
            <td>Начало обучения группы</td>
            <td>
              {new Date(data.start_of_classes).toLocaleDateString() || "-"}
            </td>
          </tr>

          <tr>
            <td>Книга</td>
            <td>{data.book_name}</td>
          </tr>
          <tr>
            <td>Активность</td>
            <td>{data.is_active ? "Да" : "Нет"}</td>
          </tr>
          <tr>
            <td>Комментарии</td>
            <td>{data.comment}</td>
          </tr>
          <tr>
            <td>Описание группы</td>
            <td>{data.description}</td>
          </tr>
        </tbody>
      </table>
      <Stack spacing={2} direction="row" mt="16px">
        <Button
          variant="contained"
          color="error"
          onClick={() => setModal({ ...modal, archive: true })}
          disabled={data.archived}
        >
          Архивировать группу
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setModal({ ...modal, removeFromArchive: true })}
          disabled={!data.archived}
        >
          Разархивировать группу
        </Button>
        <Button
          onClick={() => setModal({ ...modal, edit: true })}
          color="success"
          variant="contained"
        >
          Поменять учителя группы
        </Button>
      </Stack>
    </Box>
  )
}

export default Info
