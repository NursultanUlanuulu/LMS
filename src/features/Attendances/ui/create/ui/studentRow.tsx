import { Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import { tokensDark } from "@/app/providers/ThemeProvider";
import { useState, useMemo } from "react";
import { MyInput, MySelect } from "@/shared/ui";
import { useNavigate } from "react-router";

const StudentRow = ({
  row,
  index,
  onChange,
  inputValue,
}: {
  row: {
    student_id: number;
    student_name: string;
    is_active: boolean;
    admit: boolean;
    student_balance: number;
    pourochno: boolean;
    lesson_unlock_price: number;
  };
  index: number;
  onChange: (e: any, studentId: number) => void;
  inputValue?: string | null;
}) => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const chechStudentStatus = useMemo(() => {
    if (row.admit && row.is_active) {
      return "Активен";
    } else if (!row.is_active) {
      return "Отписан";
    } else {
      return "Не хватает денег";
    }
  }, [row]);
  return (
    <TableRow>
      <TableCell
        onClick={() => {
          navigate(`/students/details/${row.student_id}`);
        }}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        {row.student_name}
      </TableCell>
      <TableCell>{row.student_balance.toFixed()}</TableCell>
      <TableCell>{row.pourochno ? "Поурочно" : "Оптом"}</TableCell>
      <TableCell>
        {chechStudentStatus === "Не хватает денег" && row.admit === false
          ? row.lesson_unlock_price.toFixed()
          : 0}
      </TableCell>
      <TableCell>
        {chechStudentStatus === "Активен" ? (
          <Checkbox
            onChange={(e) => {
              setChecked(!checked);
              onChange(e, row.student_id);
            }}
            value={checked}
            name="attend"
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 20 },
              color: tokensDark.greenAccent[500],
              "&.Mui-checked": {
                color: tokensDark.greenAccent[500],
              },
            }}
          />
        ) : (
          <Typography component={"p"}>{chechStudentStatus}</Typography>
        )}
      </TableCell>

      <TableCell>
        {chechStudentStatus === "Активен" && !checked ? (
          <MyInput
            name="reason_for_absence"
            onChange={(e: any) => {
              onChange(e, row.student_id);
            }}
            value={inputValue}
            onBlur={(e: any) => {
              onChange(e, row.student_id);
            }}
          />
        ) : (
          <Typography component={"p"}>
            {chechStudentStatus === "Активен" && "Присутствовал"}
          </Typography>
        )}
      </TableCell>
    </TableRow>
  );
};

export default StudentRow;
