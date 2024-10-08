import {
  Box,
  Stack,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  TableCell,
} from "@mui/material"
import { tokensDark } from "@/app/providers/ThemeProvider"
import FullScreenModal from "@/shared/ui/FullScreenModal"
import SignUp from "./SignUpForCourse"
import AddToPending from "./AddToPending"
import CommonModal from "@/shared/ui/CommonModal"
import PromptModal from "@/widgets/PropmptModal"
import Attendance from "./Attendance"
import { ChangePriceModal, HOCList } from "@/widgets"
import { StudentGroupRow } from "../../ui"
import { StatusResponse } from "@/shared/enums"
import StudentAttendanceList from "@/features/Attendances/ui/studentAttendances"
import { coursesService } from "./coursesService"
import { useEffect, useState } from "react"
import { BooksInformation, Group } from "@/features/Groups/type"
import axios from "axios"
import { StudentAttendancesInGroup } from "@/features/Attendances/type"
import { selectAddStudentToGroupStatus } from "@/features/Students/store/selector"
import { StudentGroup } from "../../ui/studentGroupRow"
import { reloadPage } from "@/shared/funcs/funcs"

function Courses() {
  const {
    activeGroup,
    btnStyles,
    getGroupsStatus,
    handleChangeActiveGroup,
    handleChangeModals,
    headerLinks,
    id,
    modals,
    setActiveRow,
    student,
    studentGroups,
    deleteStudent,
    takeMoneyForBook,
    changeStudGroupPrice,
  } = coursesService()

  const [row, setRow] = useState<BooksInformation | null>()
  return (
    <Box mt={"30px"}>
      <FullScreenModal
        open={modals.signUpForCourse}
        handleClose={() => {
          handleChangeModals("signUpForCourse")
        }}
      >
        <SignUp text="Записать в группу" />
      </FullScreenModal>
      <CommonModal
        handleClose={() => {
          handleChangeModals("changePrice")
        }}
        open={modals.changePrice}
      >
        <ChangePriceModal
          activeGroup={activeGroup}
          title="Новая цена обучения"
          callback={(sum, tarif_type) => {
            changeStudGroupPrice(sum, tarif_type)
            handleChangeModals("changePrice")
          }}
        />
      </CommonModal>
      <FullScreenModal
        open={modals.signUpForLesson}
        handleClose={() => {
          handleChangeModals("signUpForLesson")
        }}
      >
        <SignUp text="Записать на пробный урок" />
      </FullScreenModal>
      <FullScreenModal
        open={modals.addToPending}
        handleClose={() => {
          handleChangeModals("addToPending")
        }}
      >
        <AddToPending />
      </FullScreenModal>

      <FullScreenModal
        open={modals.studentAttendanceWithoutDate}
        handleClose={() => {
          handleChangeModals("studentAttendanceWithoutDate")
        }}
      >
        <StudentAttendanceList group={activeGroup} student={student} />
      </FullScreenModal>
      <CommonModal
        open={modals.studentAttendanceWithDate}
        handleClose={() => {
          handleChangeModals("studentAttendanceWithDate")
        }}
      >
        <Attendance />
      </CommonModal>
      <PromptModal
        agreeCallback={takeMoneyForBook}
        handleClose={() => {
          handleChangeModals("takeMoneyForBook")
          reloadPage()
        }}
        open={modals.takeMoneyForBook}
        text={`Вы уверены в том чтобы снять 
        ${row && row.book_price}
         за ${row && row.book_name}?`}
      />
      <PromptModal
        agreeCallback={deleteStudent}
        handleClose={() => {
          handleChangeModals("deleteStudent")
        }}
        open={modals.deleteStudent}
        text="Вы уверены что хотите отписать студента с группы?"
      />
      <Stack
        spacing={2}
        direction="row"
        mt="16px"
        flexWrap={"wrap"}
        rowGap="15px"
        mb="30px"
      >
        <Button
          variant="contained"
          color="primary"
          sx={btnStyles}
          onClick={() => {
            handleChangeModals("signUpForCourse")
          }}
        >
          Подписать на курс
        </Button>
        <Button
          sx={btnStyles}
          variant="contained"
          onClick={() => {
            handleChangeModals("signUpForLesson")
          }}
        >
          Записать на пробный урок
        </Button>
        <Button
          sx={btnStyles}
          color="primary"
          variant="contained"
          onClick={() => {
            handleChangeModals("addToPending")
          }}
        >
          Добавить в ожидание
        </Button>
        <Button
          sx={btnStyles}
          color="primary"
          variant="contained"
          onClick={() => {
            handleChangeModals("studentAttendanceWithDate")
          }}
        >
          Посещаемость
        </Button>
      </Stack>
      <HOCList
        isError={getGroupsStatus === StatusResponse.ERROR}
        isLoading={getGroupsStatus === StatusResponse.LOADING}
        isSuccess={getGroupsStatus === StatusResponse.SUCCESS}
        length={studentGroups.data.length}
        noLengthMessage="Групп нет"
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
                      "&:last-of-type": {
                        textAlign: "center",
                      },
                    }}
                  >
                    {tableHeader}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {studentGroups.data.map((row, index) => (
                <StudentGroupRow
                  row={row}
                  key={index}
                  handleChangeModals={handleChangeModals}
                  studentId={id || ""}
                  setActiveGroup={setActiveRow}
                  setRow={setRow}
                  callback={() => {
                    handleChangeActiveGroup(row)
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

export default Courses
