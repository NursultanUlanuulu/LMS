import { tokensDark } from "@/app/providers/ThemeProvider"
import { Header } from "@/widgets"
import { Box, Paper, Stack, Typography } from "@mui/material"
import detailsService from "./detailsService"

const StudentInfo = () => {
  const { links, onChangeTab, InnerModule, tab, student, isGetStudentLoading } =
    detailsService()
  return (
    <Box>
      <Header
        title={
          isGetStudentLoading ? "Загружаем студента..." : student.full_name
        }
        color={student.blacklist ? "red" : undefined}
      />
      <Paper
        sx={{
          padding: "20px 20px",
          background: "none",
          "@media(max-width:768px)": {
            padding: "20px 10px",
          },
        }}
      >
        <Stack direction="row" spacing={2} mb="20px">
          {links.map(link => {
            return (
              <Typography
                key={link.text}
                sx={{
                  cursor: "pointer",
                  fontWeight: 600,
                  borderBottom:
                    tab === link.value
                      ? `1px solid ${tokensDark.greenAccent[500]}`
                      : "0px",
                  "@media(max-width:768px)": {
                    fontSize: "14px",
                  },
                }}
                onClick={() => onChangeTab(link.value)}
              >
                {link.text}
              </Typography>
            )
          })}
        </Stack>
        <InnerModule />
      </Paper>
    </Box>
  )
}

export default StudentInfo
