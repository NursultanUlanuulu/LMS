import { ICommonForm } from "@/shared/types";
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  Typography,
} from "@mui/material";

interface IInputProps extends ICommonForm {
  type?: string;
}
const MyInput = ({
  labelName = "",
  placeholder = "",
  type = "text",
  name,
  value = "",
  onChange,
  onBlur,
  error = false,
  errorMessage = "",
  defaultValue = "",
}: IInputProps) => {
  return (
    <FormControl sx={{ width: "100%" }}>
      {labelName.length > 0 ? (
        <Typography sx={{ mb: "7px" }}>{labelName}</Typography>
      ) : null}

      <OutlinedInput
        error={error}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={value?.toString()}
        placeholder={placeholder}
        type={type}
        size="small"
        defaultValue={defaultValue}
      />
      {error && <FormHelperText error={true}>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default MyInput;
