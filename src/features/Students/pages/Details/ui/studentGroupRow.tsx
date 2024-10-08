import { tokensDark } from "@/app/providers/ThemeProvider"
import { BooksInformation, Group } from "@/features/Groups/type"
import { Button, TableRow, TableCell, SxProps, Theme } from "@mui/material"
import { ModalTypes } from "../components/courses/coursesService"
import { useEffect, useState } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"

const tableBtnStyles: SxProps<Theme> = {
  fontSize: "12px",
  width: "100%",
  transition: "all 0.4s ease",
  background: tokensDark.greenAccent[700],
  "&:hover": {
    background: tokensDark.greenAccent[800],
  },
  "@media(max-width:600px)": {
    fontSize: "8px",
    width: "100%",
    marginLeft: "0 !important",
  },
  "@media(min-width:600px) and (max-width:900px)": {
    fontSize: "9px",
    width: "100%",
    marginLeft: "0 !important",
  },
  "@media(min-width:900px) and (max-width:1300px)": {
    fontSize: "9px",
    width: "100%",
    marginLeft: "0 !important",
  },
  "@media(min-width:1300px) and (max-width:1536px)": {
    fontSize: "9px",
    width: "45%",
    marginLeft: "0 !important",
  },
}
export interface StudentGroup {
  id: number
  tarif_sum: number
  is_active: boolean
  created: string
  updated: string
  group: number
  student: number
  tarif_type: string
}

const Row = ({
  row,
  setRow,
  handleChangeModals,
  studentId,
  setActiveGroup,
  callback,
}: {
  handleChangeModals: (modal: ModalTypes) => void
  row: Group
  setRow: ({ }: BooksInformation) => void
  studentId: string
  callback: () => void
  setActiveGroup: React.Dispatch<
    React.SetStateAction<{ group: string; tarif: string }>
  >
}) => {

  const [studGroup, setStudGroup] = useState<StudentGroup>({} as StudentGroup)
  const fetchStudGroup = async () => {
    const token = window.localStorage.getItem("token") || ""
    const { data } = await axios.get<StudentGroup[]>(
      `http://64.227.142.153/api/user/add/to/group/?student=${studentId}&group=${row.id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    setStudGroup(data[0])
  }
  useEffect(() => {
    fetchStudGroup()
  }, [])

  return (
    <TableRow>
      <TableCell>{row.subject}</TableCell>
      <TableCell
        sx={{
          "& *": {
            color: "#fff",
          },
        }}
      >
        <NavLink to={"/groups/detail/" + row.id}>{row.name}</NavLink>
      </TableCell>
      <TableCell>{row.time}</TableCell>
      <TableCell
        sx={{
          textAlign: 'center'
        }}>
        {row.day_of_the_week.map(function (day, index) {
          return <p key={index}>{day.week_day}</p>  // Use a unique key prop
        })}

        <br />
        <Button
          variant="contained"
          color="primary"
          sx={tableBtnStyles}
          onClick={() => {
            handleChangeModals("studentAttendanceWithoutDate")
            callback()
          }}
        >
          История посещений
        </Button>

      </TableCell>
      <TableCell>{row.current_teacher_name}</TableCell>
      <TableCell>{studGroup?.tarif_type || "-"}</TableCell>
      <TableCell
        sx={{
          textAlign: 'center'
        }}>
        <p>
          {studGroup?.tarif_sum || 0} сом
        </p>
        <br />

        <Button
          variant="contained"
          color="primary"
          sx={tableBtnStyles}
          onClick={() => {
            handleChangeModals("changePrice")
            setActiveGroup({
              tarif: studGroup.id.toString(),
              group: row.id.toString(),
            })
            callback()
          }}
        >
          Поменять цену
        </Button>
      </TableCell>
      <TableCell
        sx={{
          textAlign: 'center'
        }}>
        <p>
          {row.exists_students}/{row.max_student_count}
        </p>
        <br />

        <Button
          variant="contained"
          color="primary"
          sx={tableBtnStyles}
          onClick={() => {
            handleChangeModals("deleteStudent")
            callback()
          }}
        >
          Отписать с группы
        </Button></TableCell>
      <TableCell
        sx={{
          textAlign: 'center'
        }}
      >
        {row.book_name ? (
          <>
            <p>{row.book_name} / {row.book_price}
            </p>
            <br />

            <Button
              variant="contained"
              color="primary"
              sx={tableBtnStyles}
              onClick={() => {
                handleChangeModals("takeMoneyForBook")
                setRow({
                  book_name: row.book_name,
                  book_price: row.book_price
                })
                callback()
              }}
            >
              Снять оплату
            </Button>
          </>
        )
          : "Нет"}

      </TableCell>

    </TableRow>
  )
}

export default Row
