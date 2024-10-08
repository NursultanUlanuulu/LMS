import { useState } from "react";
import { tokensDark } from "@/app/providers/ThemeProvider";
import { MyInput } from "@/shared/ui";
import { Header, SelectFilterWidget } from "@/widgets";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { attendanceService } from "./attendanceService";
import { Formik } from "formik";
import FullScreenModal from "@/shared/ui/FullScreenModal";
import StudentAttendanceList from "@/features/Attendances/ui/studentAttendances";

const Attendance = () => {
  const [filter, setFilter] = useState({
    group: "",
    startDate: "",
    endDate: "",
  });
  const {
    groups,
    initialValues,
    onSubmit,
    validationSchema,
    handleChangeAttendanceModal,
    attendanceModal,
    studentAttendanceFilterData,
  } = attendanceService();

  const handleFilterChange = (e: any) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  return (
    <Box>
      <Header title="Посещаемость" />
      <Box sx={{ maxWidth: "600px" }}>
        <FullScreenModal
          handleClose={handleChangeAttendanceModal}
          open={attendanceModal}
        >
          <StudentAttendanceList
            group={studentAttendanceFilterData.group}
            student={studentAttendanceFilterData.student}
            start_date={studentAttendanceFilterData.start_date}
            end_date={studentAttendanceFilterData.end_date}
          />
        </FullScreenModal>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack direction="column" spacing={2}>
                <SelectFilterWidget
                  isAllExist={false}
                  width="auto"
                  name="attendance_group"
                  value={values.attendance_group}
                  isTransparent={true}
                  elevation={0}
                  inputLabel="Укажите группу"
                  handleChangeValue={handleChange}
                  menuItems={groups}
                  errorMessage={errors.attendance_group}
                  error={
                    touched.attendance_group && Boolean(errors.attendance_group)
                  }
                />
                <MyInput
                  name="start_date"
                  value={values.start_date}
                  onChange={handleChange}
                  labelName="Укажите начальную дату"
                  type="date"
                  onBlur={handleBlur}
                  errorMessage={errors.start_date}
                  error={touched.start_date && Boolean(errors.start_date)}
                />
                <MyInput
                  name="end_date"
                  type="date"
                  value={values.end_date}
                  onChange={handleChange}
                  labelName="Укажите конечную дату"
                  onBlur={handleBlur}
                  errorMessage={errors.end_date}
                  error={touched.end_date && Boolean(errors.end_date)}
                />
                <Button
                  sx={{ background: tokensDark.greenAccent[500] }}
                  variant="contained"
                  type="submit"
                >
                  Вывести
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Attendance;
