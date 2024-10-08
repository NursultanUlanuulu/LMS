import { tokensDark } from "@/app/providers/ThemeProvider"
import { useAppDispatch, useAppSelector } from "@/app/store"
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { getGroupStudents } from "@/features/Groups/store/actions"
import { HOCList, CustomPagination, SelectFilterWidget } from "@/widgets"
import {
  selectGetStudentsStatus,
  selectStudents,
} from "@/features/Groups/store/selector"
import { StatusResponse } from "@/shared/enums"
import { NavLink } from "react-router-dom"
import { getAge, getAgeYears } from "@/shared/libs"
import { api } from "@/features/Groups/api"

interface StudentListWithFilter {
  id: number
  full_name: string
  date_birth: string
  phone: string
  branch: string
  balance: number
  black_list: boolean
}
const activeStudents = () => {
  const [page, setPage] = useState<number>(1)
  const [list, setList] = useState<StudentListWithFilter[]>([])

  const dispatch = useAppDispatch()
  const { id } = useParams()
  const studentsList = useAppSelector(selectStudents)
  const getStudentsStatus = useAppSelector(selectGetStudentsStatus)
  const [filter, setFilter] = useState({ type: "" })

  const handleChangePage = (
    _: React.ChangeEvent<HTMLInputElement>,
    page: number
  ) => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const handleChangeFilter = (event: any) => {
    setFilter({ ...filter, [event.target.name]: event.target.value })
  }
  const fetchList = async (type: string) => {
    const token = window.localStorage.getItem("token") || ""
    if (type === "trials") {
      const { data } = await api.getStudentsTrials(token, {
        group: Number(id),
      })
      setList(data)
    } else if (type === "graduted") {
      const { data } = await api.getStudentsGraduate(token, {
        group: Number(id),
      })
      setList(data)
    } else if (type === "unsubscribed") {
      const { data } = await api.getStudentsUnsubscribed(token, {
        group: Number(id),
      })
      setList(data)
    }
  }
  useEffect(() => {
    dispatch(
      getGroupStudents({
        group: Number(id),
        page,
      })
    )
    if (filter.type) {
      console.log(filter.type)
      fetchList(filter.type)
    }
  }, [page, filter.type])

  const headerLinks = ["ФИО", "Номер", " Баланс", "Возраст"]
  return (
    <div>
      <Grid container>
        <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
          <Box>
            <Typography>Тип студента</Typography>
            <SelectFilterWidget
              isAllExist={false}
              width="auto"
              name="type"
              value={filter.type}
              handleChangeValue={handleChangeFilter}
              menuItems={[
                {
                  value: "",
                  text: "Активные",
                },
                {
                  value: "trials",
                  text: "Пробники",
                },
                {
                  value: "unsubscribed",
                  text: "Отписанные студенты",
                },
                {
                  value: "graduted",
                  text: "Закончившие студенты",
                },
              ]}
            />
          </Box>
        </Grid>
      </Grid>
      {filter.type == "" ? (
        <HOCList
          isError={getStudentsStatus === StatusResponse.ERROR}
          isLoading={getStudentsStatus === StatusResponse.LOADING}
          isSuccess={getStudentsStatus === StatusResponse.SUCCESS}
          length={studentsList.data.length}
          noLengthMessage="Студентов нет"
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
                {studentsList.data.map(row => (
                  <TableRow key={row.id}>
                    <TableCell
                      sx={{
                        "& a": {
                          color: "#fff",
                        },
                      }}
                    >
                      <NavLink to={"/students/details/" + row.id}>
                        {row.full_name}
                      </NavLink>
                    </TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.balance} сом</TableCell>

                    <TableCell>{getAgeYears(row.date_birth)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <CustomPagination
            handleChangePage={handleChangePage}
            defaultPage={page}
            totalCount={studentsList.amount}
            limit={studentsList.limit}
            pagesCount={studentsList.pagesCount}
            currentPage={page}
          />
        </HOCList>
      ) : (
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
              {list?.length > 0
                ? list.map(row => (
                    <TableRow key={row.id}>
                      <TableCell
                        sx={{
                          "& a": {
                            color: "#fff",
                          },
                        }}
                      >
                        <NavLink to={"/students/details/" + row.id}>
                          {row.full_name}
                        </NavLink>
                      </TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.balance} сом</TableCell>

                      <TableCell>{getAgeYears(row.date_birth)}</TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

export default activeStudents
