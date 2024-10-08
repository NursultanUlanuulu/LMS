import { Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import { tokensDark } from "@/app/providers/ThemeProvider";
import { useState, useEffect } from "react";
import { MyInput } from "@/shared/ui";

const StudentRow = ({
  checked,
  row,
  index,
  onChange,
  inputValue,
}: {
  row: {
    id: number;
    name: string;
    status: string;
    attend: boolean;
    reason_for_absence: string | null;
  };
  checked?: boolean;
  index: number;
  onChange: (e: any, studentId: number) => void;
  inputValue?: string | null;
}) => {
  const [isChecked, setIsChecked] = useState<boolean | undefined>(false);
  useEffect(() => {
    if (checked === undefined) {
      setIsChecked(row.attend);
    } else {
      setIsChecked(checked);
    }
  }, [checked]);
  return (
    <TableRow key={index}>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell>
        {row.status === "Активен" ? (
          <Checkbox
            onChange={(e) => {
              onChange(e, row.id);
            }}
            checked={isChecked}
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
          <Typography component={"p"}>{row.status}</Typography>
        )}
      </TableCell>

      <TableCell>
        {row.status === "Активен" && !checked ? (
          <MyInput
            name="reason_for_absence"
            onChange={(e: any) => {
              onChange(e, row.id);
            }}
            value={inputValue}
            onBlur={(e: any) => {
              onChange(e, row.id);
            }}
          />
        ) : (
          <Typography component={"p"}>{row.status}</Typography>
        )}
      </TableCell>
    </TableRow>
  );
};

export default StudentRow;
