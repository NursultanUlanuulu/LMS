import { tokensDark } from "@/app/providers/ThemeProvider";
import { Group } from "@/features/Groups/type";
import { TableHeader } from "@/widgets";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  colors,
  withTheme,
} from "@mui/material";
import React from "react";
import { GroupStudentsAttendances, StudentType } from "../../types";

const StudentRows = ({
  group,
  students,
  sortedData,
}: {
  group: GroupStudentsAttendances;
  students: StudentType[];
  sortedData: GroupStudentsAttendances[];
}) => {
  return (
    <Box sx={{ marginTop: "30px" }}>
      <TableHeader
        showCreateButton={false}
        title={``}
        subtitle={`Группа: ${
          group.group_name
          }`}
      />

      <TableContainer
        sx={{ background: tokensDark.primary[500] }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ФИО студента</TableCell>
              {/* <TableCell>Дата</TableCell> */}
              <TableCell>Пробник ли</TableCell>
              {sortedData.map((entry) => (
                <TableCell key={entry.id}>
                  {new Date(entry.date).toLocaleDateString()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.name}>
                <TableCell>{student.name}</TableCell>
                {/* <TableCell>{group.date}</TableCell> */}
                <TableCell>{student.trial ? "Да" : "Нет"}</TableCell>
                {sortedData.map((entry) => {
                  const studentEntry = entry.students.find(
                    (s) => s.student_name === student.name
                  );
                  let attendanceStatus: string | null = "-";

                  if (studentEntry !== undefined) {
                    if (studentEntry.attend === true) {
                      attendanceStatus = "Присутствовал";
                    } else if (studentEntry.status) {
                      attendanceStatus = studentEntry.status;
                    } else {
                      attendanceStatus = studentEntry.reason_for_absence;
                    }
                  }
                  return (
                    <TableCell key={`${student}-${entry.id}`}>
                      {attendanceStatus}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentRows;
