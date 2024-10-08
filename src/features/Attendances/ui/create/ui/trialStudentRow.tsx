import { Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import { tokensDark } from "@/app/providers/ThemeProvider";
import { useState, useMemo } from "react";
import { MyInput } from "@/shared/ui";
import { useNavigate } from "react-router";

const TrialStudentRow = ({
  row,
  index,
  onChange,
  inputValue,
}: {
  row: {
    student: number;
    student_name: string;
  };
  index: number;
  onChange: (e: any, studentId: number) => void;
  inputValue?: string | null;
}) => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  return (
    <TableRow>
      <TableCell
        onClick={() => {
          navigate(`/students/details/${row.student}`);
        }}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        {row.student_name}
      </TableCell>
      <TableCell>Пробник</TableCell>
      <TableCell></TableCell>

      <TableCell>
        <Checkbox
          onChange={(e) => {
            setChecked(!checked);
            onChange(e, row.student);
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
      </TableCell>
      <TableCell>
        {checked ? null : (
          <MyInput
            name="reason_for_absence"
            onChange={(e: any) => {
              onChange(e, row.student);
            }}
            value={inputValue}
            onBlur={(e: any) => {
              onChange(e, row.student);
            }}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default TrialStudentRow;
