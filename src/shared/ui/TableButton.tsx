import { Button } from "@mui/material"
import React from "react"

const TableButton = ({
  iconClassName,
  styles,
}: {
  iconClassName: string
  styles?: React.CSSProperties
}) => (
  <Button
    variant="contained"
    sx={{
      width: "40px",
      height: "40px",
      p: 0,
      "& i": {
        fontSize: 20,
      },
      ...styles,
    }}
  >
    <i className={iconClassName} aria-hidden="true" />
  </Button>
)
export default TableButton
