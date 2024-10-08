import {
  FormControl,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  FormHelperText,
  InputLabel,
  Checkbox,
  ListItemText,
} from "@mui/material";

interface Props {
  value: any;
  handleChangeValue: (event: SelectChangeEvent<string>) => void;
  menuItems: { value: string | number; text: string }[];
  width?: string | number;
  handleBlur?: (event: any) => void;
  name?: string;
  displayEmpty?: boolean;
  isTransparent?: boolean;
  inputLabel?: string;
  error?: boolean;
  elevation?: number;
  errorMessage?: string;
}
const MultipleSelect = ({
  value,
  handleChangeValue,
  menuItems,
  handleBlur,
  isTransparent = false,
  inputLabel = "",
  displayEmpty = true,
  width = "100%",
  name = "",
  elevation = 1,
  error = false,
  errorMessage = "",
}: Props) => {
  return (
    <Paper
      elevation={elevation}
      sx={{
        border: "none",
        display: "flex",
        alignItems: "center",
        width: width,
        marginY: "10px",
        background: isTransparent ? "none" : "",
        p: 0,
      }}
    >
      <FormControl size="small" sx={{ width: "100%" }}>
        <InputLabel id="select">{inputLabel}</InputLabel>
        <Select
          id="select"
          name={name}
          label={inputLabel}
          displayEmpty={displayEmpty}
          sx={{ border: 0 }}
          value={value}
          multiple
          error={error}
          onBlur={handleBlur}
          onChange={handleChangeValue}
          renderValue={(selected: any) => {
            return menuItems
              .filter((item) => {
                return selected.includes(item.value);
              })
              .map((item) => item.text)
              .join(", ");
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
              },
            },
          }}
        >
          {menuItems.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              <Checkbox checked={value.indexOf(item.value as never) > -1} />
              <ListItemText primary={item.text} />
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText error={true}>{errorMessage}</FormHelperText>}
      </FormControl>
    </Paper>
  );
};

export default MultipleSelect;
