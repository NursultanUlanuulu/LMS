import { IconButton, InputBase, Paper } from "@mui/material";
import { ChangeEvent, FC } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  search?: string;
  handleSearch?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSearchClick: () => void;
  placeholder?: string;
}
const SearchWidget: FC<Props> = ({
  search,
  handleSearch,
  handleSearchClick,
  placeholder = "Найти по ИНН",
}) => {
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        margin: "10px 0px ",
        border: "1px solid #525252",
      }}
    >
      <InputBase
        name="search"
        value={search}
        onKeyUp={(event) => {
          if (event.key === "Enter") handleSearchClick();
        }}
        onChange={handleSearch}
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
      />
      <IconButton onClick={handleSearchClick}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchWidget;
