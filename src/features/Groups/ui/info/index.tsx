import { tokensDark } from "@/app/providers/ThemeProvider";
import { Header } from "@/widgets";
import { Box, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import infoService from "./infoService";
import { StudentGroupRow } from "@/features/Students/pages/Details/ui";

const Info = () => {
  const { links, onChangeTab, InnerModule, tab, name, isLoading, headerLinks } =
    infoService();
  if (isLoading) {
    return (
      <Box>
        <Skeleton height={50} variant="text" sx={{ width: "300px" }} />
        <Paper sx={{ p: "15px", background: "inherit" }}>
          <Stack direction="row" spacing={2} mb="20px">
            {Array(3)
              .fill(5)
              .map((_, index) => {
                return (
                  <Skeleton
                    key={index}
                    variant="text"
                    sx={{ width: "100px" }}
                  />
                );
              })}
          </Stack>
          {/* <table className="info_table">
            <tbody>
              {Array(7)
                .fill(5)
                .map((_, index) => {
                  return (
                    <tr>
                      <td>
                        <Skeleton variant="text" sx={{ width: "100px" }} />
                      </td>
                      <td>
                        <Skeleton variant="text" sx={{ width: "180px" }} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table> */}
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
                      "&:last-of-type": {
                        textAlign: "center",
                      },
                    }}
                  >
                    {tableHeader}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {studentGroups.data.map((row, index) => (
                <StudentGroupRow
                  row={row}
                  key={index}
                  handleChangeModals={handleChangeModals}
                  studentId={id || ""}
                  setActiveGroup={setActiveRow}
                  setRow={setRow}
                  callback={() => {
                    handleChangeActiveGroup(row)
                  }}
                />
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>

        </Paper>
      </Box>
    );
  }
  return (
    <Box>
      <Header title={name} />
      <Paper
        sx={{
          padding: "20px 20px",
          background: "transparent",
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

export default Info;
