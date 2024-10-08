import { AuthRouter } from "@/features/Auth"
import { BooksRoute } from "@/features/Books"
import { GroupsRoute } from "@/features/Groups"
import { TeachersRoute } from "@/features/Teachers"
import { ErrorPage, Layout } from "@/widgets"
import { useRoutes } from "react-router"
import { StudentsRoutes } from "@/features/Students"
import { AttendanceRoute } from "@/features/Attendances"
import { MainRoute } from "@/features/Main"
import { BranchesRoute } from "@/features/Branches"
import { ManagersRoute } from "@/features/Managers"
import { SubjectRoute } from "@/features/Subjects"
import { PromoterRoute } from "@/features/Promoters"
import { DayOfWeekRoute } from "@/features/DayOfWeek"
import { TimeRoute } from "@/features/Time"
import VisitReportsList from "@/features/VisitHistory/ui/list"
import VisitReportsRoute from "@/features/VisitHistory/route"

const MyRoutes = () => {
  const myRouter = useRoutes([
    AuthRouter,
    {
      path: "",
      element: <Layout />,
      children: [
        MainRoute,
        StudentsRoutes,
        BooksRoute,
        TeachersRoute,
        GroupsRoute,
        AttendanceRoute,
        BranchesRoute,
        ManagersRoute,
        SubjectRoute,
        PromoterRoute,
        DayOfWeekRoute,
        TimeRoute,
        VisitReportsRoute
      ],
    },
    { path: "*", element: <ErrorPage type={404} /> },
  ])
  return myRouter
}
export default MyRoutes
