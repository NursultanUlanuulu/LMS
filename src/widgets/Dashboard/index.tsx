import { tokensDark } from "@/app/providers/ThemeProvider"
import { useAppSelector } from "@/app/store"
import { selectUserProfile } from "@/features/Auth/store/selectors"
import Blacklists from "@/features/Main/ui/pages/blacklists"
import Debtors from "@/features/Main/ui/pages/debtors"
import Pendings from "@/features/Main/ui/pages/pendings"
import Trials from "@/features/Main/ui/pages/trials"
import WithNoLessons from "@/features/Main/ui/pages/withNoLessons"
import { Roles } from "@/shared/enums"
import { Box, Button, Grid } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router"
import Header from "../Header"
import Graduated from "@/features/Main/ui/pages/graduated"

const Dashboard = () => {
  const { user } = useAppSelector(selectUserProfile)
  const navigate = useNavigate()
  const [tab, setTab] = useState(1)
  const onChangeTab = (part: number) => {
    setTab(part)
  }
  const goToPath = (path: string) => {
    navigate(path)
  }
  const navs = [
    { text: "В ожидании", value: 1 },
    { text: "Должники", value: 2 },
    { text: "Пробники", value: 3 },
    { text: "Закончили", value: 4 },
    { text: "Незаписанные", value: 6 },
    { text: "Черный список", value: 7 },
  ]
  const superadminNavs = [
    { text: "Филиалы", value: "/branches" },
    { text: "Менеджеры", value: "/managers" },
    { text: "Прмедметы", value: "/subjects" },
    { text: "Источники рекламы", value: "/promoters" },
    { text: "Дни недели", value: "/dayOfWeek" },
    { text: "Время", value: "/time" },
    { text: "Книги", value: "/books" },
  ]
  const InnerModule = () => {
    switch (tab) {
      case 1:
        return <Pendings />
      case 2:
        return <Debtors />
      case 3:
        return <Trials />
      case 4:
        return <Graduated />
      case 6:
        return <WithNoLessons />
      case 7:
        return <Blacklists />
      default:
        return <Pendings />
    }
  }

  return (
    <Box>
      <Header title={`Добро пожаловать`} subtitle={``}></Header>
      {user.user_type === Roles.Manager ? (
        <Box sx={{ mt: "20px" }}>
          <Grid container spacing={2} alignItems="center" mb="30px">
            {navs.map(nav => {
              return (
                <Grid key={nav.text} item xl={2} lg={3} md={3} sm={4} xs={6}>
                  <Button
                    onClick={() => onChangeTab(nav.value)}
                    fullWidth
                    key={nav.text}
                    variant="contained"
                    sx={{
                      transition: "all 0.4s ease",
                      background:
                        nav.value == tab
                          ? tokensDark.greenAccent[900]
                          : tokensDark.greenAccent[500],
                      "&:hover": {
                        background: tokensDark.greenAccent[900],
                      },
                    }}
                  >
                    {nav.text}
                  </Button>
                </Grid>
              )
            })}
          </Grid>
          <InnerModule />
        </Box>
      ) : null}
      {user.user_type === Roles.SuperAdmin ? (
        <Box sx={{ mt: "20px" }}>
          <Grid container spacing={2} alignItems="center" mb="30px">
            {superadminNavs.map(nav => {
              return (
                <Grid key={nav.text} item xl={2} lg={3} md={3} sm={4} xs={6}>
                  <Button
                    onClick={() => goToPath(nav.value)}
                    fullWidth
                    key={nav.text}
                    variant="contained"
                    sx={{
                      transition: "all 0.4s ease",
                      background: tokensDark.greenAccent[500],
                      "&:hover": {
                        background: tokensDark.greenAccent[900],
                      },
                    }}
                  >
                    {nav.text}
                  </Button>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      ) : null}
    </Box>
  )
}

export default Dashboard
