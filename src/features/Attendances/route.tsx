import { Outlet } from "react-router-dom"
import { ROUTES } from "@/shared/data"
import AttendanceList from "./ui/list"
import AuthGuard from "@/app/providers/PermissionProvider"
import { Roles } from "@/shared/enums"

const AttendanceRoute = {
  path: ROUTES.attendances,
  element: (
    <AuthGuard roles={[Roles.Manager]}>
      <Outlet />
    </AuthGuard>
  ),
  children: [
    {
      path: "",
      element: <AttendanceList />,
    },
  ],
}

export default AttendanceRoute
