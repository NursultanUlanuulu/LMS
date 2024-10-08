import { Group } from "@/features/Groups/type"
import {
  TableRow,
  TableCell,
  Stack,
  Typography,
  OutlinedInput,
  Button,
} from "@mui/material"
import { useState } from "react"
import { NavLink } from "react-router-dom"

const SignUpRow = ({
  row,
  text,
  handleChangeTariffModal,
  addToTrial,
  setActiveGroup,
}: {
  row: Group
  text: string
  handleChangeTariffModal: () => void
  addToTrial: (row: Group, trialDate: string) => void
  setActiveGroup: (row: Group) => void
}) => {
  const [trialDate, setTrialDate] = useState("")
  return (
    <TableRow
      sx={{
        cursor: "pointer",
        transition: "all 0.4s ease",
        "&:hover": {
          opacity: 0.7,
        },
      }}
    >
      <TableCell>{row.time}</TableCell>
      <TableCell>{row.subject}</TableCell>
      <TableCell
        sx={{
          "& a": {
            color: "#fff",
          },
        }}
      >
        <NavLink to={"/groups/detail/" + row.id.toString()}>{row.name}</NavLink>
      </TableCell>
      <TableCell>
        {row.day_of_the_week.map(day => {
          return <span>{day.week_day} </span>
        })}
      </TableCell>
      <TableCell>
        {row.exists_students}/{row.max_student_count}
      </TableCell>
      <TableCell>{row.current_teacher_name}</TableCell>
      <TableCell>
        {text === "Записать на пробный урок" ? (
          <Stack spacing={1}>
            <Typography>Дата пробного занятия</Typography>
            <OutlinedInput
              size="small"
              value={trialDate}
              type="date"
              onChange={e => {
                setTrialDate(e.target.value)
              }}
            />
            <Button
              variant="contained"
              onClick={e => {
                addToTrial(row, trialDate)
              }}
            >
              Записать на пробный урок
            </Button>
          </Stack>
        ) : null}
        {text === "Записать в группу" ? (
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setActiveGroup(row)
              handleChangeTariffModal()
            }}
          >
            {text}
          </Button>
        ) : null}
      </TableCell>
    </TableRow>
  )
}

export default SignUpRow
