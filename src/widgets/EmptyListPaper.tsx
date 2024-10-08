import { Link, Paper } from "@mui/material"
import { FC } from "react"
import { useNavigate } from "react-router"
import { NavLink } from "react-router-dom"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import { tokensDark } from "@/app/providers/ThemeProvider"
interface Props {
  title: string
  createLink?: string
  createText?: string
}
const EmptyListPaper: FC<Props> = ({
  title,
  createLink = "",
  createText = "Создать запись",
}) => {
  const navigate = useNavigate()
  const onClickEvent = () => {
    navigate(0)
  }
  return (
    <Paper
      className="emptyList"
      sx={{
        margin: "40px auto 0 auto",
        maxWidth: "500px",
        minHeight: "150px",
        background: tokensDark.primary[500],
        paddingY: "20px",
      }}
    >
      <SentimentVeryDissatisfiedIcon
        sx={{ fontSize: 80, color: tokensDark.greenAccent[500] }}
      />
      <div className="emptyListTitle">{title}</div>
      {createLink ? (
        <NavLink style={{ paddingTop: "20px" }} to={createLink}>
          <Link
            underline="none"
            sx={{
              cursor: "pointer",
              fontSize: "16px",
              textAlign: "right",
              "@media(max-width:768px)": {
                fontSize: "11px",
              },
            }}
          >
            {createText}
          </Link>
        </NavLink>
      ) : null}
      <Link
        underline="none"
        sx={{
          cursor: "pointer",
          mt: "10px",
          fontSize: "13px",
          color: tokensDark.primary[100],
          textAlign: "right",
          "@media(max-width:768px)": {
            fontSize: "11px",
          },
        }}
        onClick={onClickEvent}
      >
        Перезагрузить страницу
      </Link>
    </Paper>
  )
}

export default EmptyListPaper
