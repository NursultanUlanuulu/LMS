import { tokensDark } from "@/app/providers/ThemeProvider"
import { useAppDispatch, useAppSelector } from "@/app/store"
import { getGroupList } from "@/features/Groups/store/actions"
import {
  selectGroups,
  selectGetGroupsStatus,
} from "@/features/Groups/store/selector"
import { Teacher } from "@/features/Teachers/type"
import { StatusResponse } from "@/shared/enums"
import { CustomPagination, HOCList } from "@/widgets"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const Groups = ({ teacher }: { teacher: Teacher }) => {
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const headerLinks = ["Время", "Предмет", "Группа", "Дни", "Кол-во студентов"]
  const list = useAppSelector(selectGroups)
  const status = useAppSelector(selectGetGroupsStatus)
  const isLoading = status === StatusResponse.LOADING
  const isError = status === StatusResponse.ERROR
  const isSuccess = status === StatusResponse.SUCCESS
  const handleChangePage = (
    event: React.ChangeEvent<HTMLInputElement>,
    page: number
  ) => {
    setPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  useEffect(() => {
    dispatch(
      getGroupList({
        page: 1,
        filter: { current_teacher: teacher.id.toString() },
      })
    )
  }, [page])
  return (
    <HOCList
      isLoading={isLoading}
      isError={isError}
      isSuccess={isSuccess}
      length={list.amount}
      noLengthMessage={"Групп нет"}
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
            {list.data.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    navigate(`/groups/detail/${row.id}`)
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell>
                  {row.day_of_the_week?.map(day => {
                    return <span>{day.week_day} </span>
                  })}
                </TableCell>
                <TableCell>{row.exists_students}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        handleChangePage={handleChangePage}
        defaultPage={page}
        totalCount={list.amount}
        limit={list.limit}
        pagesCount={list.pagesCount}
        currentPage={page}
      />
    </HOCList>
  )
}

export default Groups
