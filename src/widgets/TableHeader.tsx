import { tokensDark } from "@/app/providers/ThemeProvider";
import { Stack, Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "./Header";

interface Props {
  title: string;
  showCreateButton: boolean;
  subtitle?: string;
  addHandler?: () => void;
  buttonText?: string;
}
/**
 * Компонент для отображения шапки в таблицах
 */
const TableHeader = ({
  title,
  showCreateButton,
  subtitle = "",
  addHandler = () => {},
  buttonText = "",
}: Props) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      mb="16px"
    >
      <Grid xs={12} sm={6} md={6} lg={6} xl={6} item>
        <Header title={title} subtitle={subtitle} />
      </Grid>
      {showCreateButton ? (
        <Grid xs={12} sm={6} md={6} lg={6} xl={6} item>
          <Button
            variant="contained"
            sx={{
              background: tokensDark.greenAccent[500],
              "&:hover": {
                background: tokensDark.greenAccent[500],
              },
            }}
            onClick={addHandler}
          >
            <AddIcon />
            {buttonText}
          </Button>
        </Grid>
      ) : null}
    </Stack>
  );
};

export default TableHeader;
