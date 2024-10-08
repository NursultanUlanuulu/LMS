import { Outlet } from "react-router-dom"
import { ROUTES } from "@/shared/data"
import { Roles } from "@/shared/enums"
import AuthGuard from "@/app/providers/PermissionProvider"
import { List } from "./ui"

const VisitReportsRoute = {
  path: ROUTES.history,
  element: (
    <AuthGuard roles={[Roles.Manager]}>
      <Outlet />
    </AuthGuard>
  ),
  children: [
    {
      path: "",
      element: <List />,
    },
  ],
}

export default VisitReportsRoute