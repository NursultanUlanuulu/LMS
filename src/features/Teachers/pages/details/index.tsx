import { tokensDark } from "@/app/providers/ThemeProvider";
import { Header } from "@/widgets";
import { Box, Paper, Stack, Typography } from "@mui/material";
import infoService from "./infoService";

const TeacherInfo = () => {
  const { links, onChangeTab, InnerModule, tab, teacher } = infoService();
  return (
    <Box>
      <Header title={teacher.full_name ?? ""} />
      <Paper
        sx={{
          padding: "20px 20px",
          backgroundColor: "transparent",
          "@media(max-width:768px)": {
            padding: "20px 10px",
          },
        }}
      >
        <Stack direction="row" spacing={2} mb="20px">
          {links.map((link) => {
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
            );
          })}
        </Stack>
        <InnerModule />
      </Paper>
    </Box>
  );
};

export default TeacherInfo;
