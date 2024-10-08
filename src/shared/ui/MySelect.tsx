import { ICommonForm } from "@/shared/types"
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import React from "react"
interface IMenuItem {
  value: string | number
  text: string
}
interface ISelect {
  labelName?: string
  name: string
  onChange: any
  onBlur: (e: React.FocusEvent<any>) => void
  error?: boolean
  errorMessage?: string
  value?: any
  placeholder?: string
  defaultValue: string | number | string[] | number[]
  items: IMenuItem[]
  disabled?: boolean
  showNothing?: boolean
  multiple?: boolean
}
const MySelect: React.FC<ISelect> = ({
  labelName,
  value,
  items,
  defaultValue,
  name,
  onChange,
  disabled = false,
  onBlur,
  error = false,
  errorMessage = "",
  showNothing = true,
  multiple = false,
}) => {
  return (
    <FormControl sx={{ width: "100%", marginTop: "16px" }}>
      <Typography sx={{ mb: "7px" }}>{labelName}</Typography>
      <Select
        error={error}
        value={value}
        disabled={disabled}
        name={name}
        displayEmpty
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={defaultValue}
        multiple={multiple}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          },
        }}
        size="small"
      >
        {showNothing ? (
          <MenuItem value={0} disabled>
            ---
          </MenuItem>
        ) : null}

        {items.map((selectObj, index) => (
          <MenuItem key={index} value={selectObj.value}>
            {selectObj.text}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

export default MySelect
