import { useAppDispatch, useAppSelector } from "@/app/store"
import CommonModal from "@/shared/ui/CommonModal"
import FullScreenModal from "@/shared/ui/FullScreenModal"
import { HOCList, PromptWithCommentModal } from "@/widgets"
import { Box, Stack, Button, SxProps, Theme } from "@mui/material"
import { useState } from "react"
import EditStudentProfile from "./Edit"
import TransferPayment from "./TransferPayment"
import {
  addCommentStudent,
  addStudentToBlacklist,
} from "@/features/Students/store/actions"
import {
  selectAddCommentStatus,
  selectGetStudentDetailStatus,
  selectStudent,
} from "@/features/Students/store/selector"
import { StatusResponse } from "@/shared/enums"
import AddDebtor from "./AddDebtor"
import { getAge, toastError } from "@/shared/libs"
import { useNavigate } from "react-router"

type ModalType =
  | "edit"
  | "addToBlacklist"
  | "transferPayment"
  | "removeFromBlacklist"
  | "comment"
  | "addDebtor"

const btnStyles: SxProps<Theme> = {
  "@media(max-width:600px)": {
    fontSize: "12px",
    width: "100%",
    marginLeft: "0 !important",
  },
  "@media(min-width:600px) and (max-width:900px)": {
    fontSize: "14px",
    width: "100%",
    marginLeft: "0 !important",
  },
}

const Info = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const student = useAppSelector(selectStudent)
  const getStudentStatus = useAppSelector(selectGetStudentDetailStatus)
  const isCommenting =
    useAppSelector(selectAddCommentStatus) === StatusResponse.LOADING
  const [modals, setModals] = useState<{ [key: string]: boolean }>({
    edit: false,
    addToBlacklist: false,
    transferPayment: false,
    removeFromBlacklist: false,
    comment: false,
    addDebtor: false,
  })
  const handleChangeModals = (modal: ModalType) => {
    setModals({ ...modals, [modal]: !modals[modal] })
  }
  return (
    <Box>
      <FullScreenModal
        open={modals.edit}
        handleClose={() => {
          handleChangeModals("edit")
        }}
      >
        <EditStudentProfile student={student} />
      </FullScreenModal>
      <PromptWithCommentModal
        shouldCloseModalAfterAction={false}
        agreeCallback={(text?: string) => {
          if (text !== "") {
            dispatch(
              addStudentToBlacklist({
                comment: text ?? "",
                studentId: student.id,
                blacklist: true,
              })
            )
            handleChangeModals("addToBlacklist")
          } else {
            toastError("Заполните комментарий")
          }
        }}
        handleClose={() => {
          handleChangeModals("addToBlacklist")
        }}
        open={modals.addToBlacklist}
        text={"Вы уверены добавить студента в черный список?"}
      />
      <PromptWithCommentModal
        defaultComment={student?.comment || ""}
        agreeCallback={(text?: string) => {
          handleChangeModals("comment")
          dispatch(
            addCommentStudent({
              comment: text ?? "",
              studentId: student.id,
            })
          )
        }}
        handleClose={() => {
          handleChangeModals("comment")
        }}
        open={modals.comment}
        text={"Добавить комментарий"}
      />
      <PromptWithCommentModal
        agreeCallback={(text?: string) => {
          handleChangeModals("removeFromBlacklist")
          dispatch(
            addStudentToBlacklist({
              comment: text ?? "",
              studentId: student.id,
              blacklist: false,
            })
          )
        }}
        handleClose={() => {
          handleChangeModals("removeFromBlacklist")
        }}
        open={modals.removeFromBlacklist}
        text={"Вы уверены удалить студента из черного списка?"}
      />

      <CommonModal
        open={modals.transferPayment}
        handleClose={() => {
          handleChangeModals("transferPayment")
        }}
      >
        <TransferPayment student={student} />
      </CommonModal>
      <CommonModal
        open={modals.addDebtor}
        handleClose={() => {
          handleChangeModals("addDebtor")
        }}
      >
        <AddDebtor
          studentId={student.id}
          onCloseModal={() => handleChangeModals("addDebtor")}
        />
      </CommonModal>
      <HOCList
        isError={getStudentStatus === StatusResponse.ERROR}
        isSuccess={getStudentStatus === StatusResponse.SUCCESS}
        isLoading={getStudentStatus === StatusResponse.LOADING}
        length={Object.keys(student).length}
        noLengthMessage="Такого студента нет"
      >
        <table className="info_table">
          <tbody>
            <tr>
              <td>ФИО</td>
              <td>{student.full_name}</td>
            </tr>
            <tr>
              <td>Дата рождения</td>
              <td>{new Date(student.date_birth).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>Возраст</td>
              <td>{getAge(student.date_birth)}</td>
            </tr>
            <tr>
              <td>Номер телефона</td>
              <td>{student.phone}</td>
            </tr>
            <tr>
              <td>Доп номера</td>
              <td>
                {student.phone_numbers?.map(phone => {
                  return `${phone.phone} `
                })}
              </td>
            </tr>
            <tr>
              <td>Откуда узнал</td>
              <td>{student.promoter}</td>
            </tr>
            <tr>
              <td>Баланс</td>
              <td>{student.balance} сом</td>
            </tr>
            {student.debt_amount ? (
              <tr>
                <td>Долг</td>
                <td>-{student.debt_amount} сом</td>
              </tr>
            ) : null}
            <tr>
              <td>Комментарий</td>
              <td>{student.comment}</td>
            </tr>
          </tbody>
        </table>
        <Stack
          spacing={2}
          direction="row"
          mt="16px"
          flexWrap={"wrap"}
          alignItems="center"
          rowGap={"15px"}
        >
          {!student.blacklist ? (
            <Button
              variant="contained"
              color="error"
              sx={btnStyles}
              onClick={() => {
                handleChangeModals("addToBlacklist")
              }}
            >
              Добавить в черный список
            </Button>
          ) : (
            <Button
              color="info"
              sx={btnStyles}
              variant="contained"
              onClick={() => {
                handleChangeModals("removeFromBlacklist")
              }}
            >
              Убрать из черного списка
            </Button>
          )}

          {Number(student.balance) > 0 ? (
            <Button
              variant="contained"
              sx={btnStyles}
              onClick={() => {
                handleChangeModals("transferPayment")
              }}
            >
              Перевести оплату на счет другого студента
            </Button>
          ) : null}
          {Number(student.balance) <= 0 ? (
            <Button
              variant="contained"
              sx={btnStyles}
              onClick={() => {
                handleChangeModals("addDebtor")
              }}
            >
              Дать в долг
            </Button>
          ) : null}
          <Button
            color="success"
            sx={btnStyles}
            variant="contained"
            onClick={() => {
              handleChangeModals("edit")
            }}
          >
            Редактировать в профиль
          </Button>

          <Button
            color="primary"
            sx={btnStyles}
            variant="contained"
            onClick={() => {
              handleChangeModals("comment")
            }}
            disabled={isCommenting}
          >
            Добавить комментарий
          </Button>
        </Stack>
      </HOCList>
    </Box>
  )
}

export default Info
