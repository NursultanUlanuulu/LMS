import { useEffect, ReactNode } from "react"
import EmptyListPaper from "./EmptyListPaper"
import ErrorMessage from "./ErrorMessage"
import { tokensDark } from "@/app/providers/ThemeProvider"
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Skeleton,
} from "@mui/material"

const HOCList = ({
  children,
  isLoading,
  isError,
  isSuccess,
  length,
  noLengthMessage,
  createLink,
  createText,
  loader = <TableLoader />,
}: {
  children: ReactNode
  isLoading?: boolean
  isError?: boolean
  isSuccess: boolean
  length: number
  noLengthMessage: string
  createLink?: string
  createText?: string
  loader?: React.ReactElement
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])
  if (isLoading) return <TableLoader />
  else if (isError) return <ErrorMessage />
  else if (isSuccess && length < 1)
    return (
      <EmptyListPaper
        createLink={createLink}
        createText={createText}
        title={noLengthMessage}
      />
    )
  return <>{children}</>
}
const TableLoader = () => {
  return (
    <TableContainer
      sx={{ background: tokensDark.primary[500] }}
      component={Paper}
    >
      <Table>
        <TableHead>
          {...Array(3)
            .fill(5)
            .map((_, index) => (
              <TableRow>
                {...Array(3)
                  .fill(5)
                  .map((_, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: 700,
                      }}
                    >
                      <Skeleton variant="text" width={100} />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableHead>
      </Table>
    </TableContainer>
  )
}
export default HOCList
