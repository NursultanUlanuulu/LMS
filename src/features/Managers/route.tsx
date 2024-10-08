import { Outlet } from "react-router-dom"
import { ROUTES } from "@/shared/data"
import { List } from "./ui"
import { Roles } from "@/shared/enums"
import AuthGuard from "@/app/providers/PermissionProvider"

const ManagersRoute = {
  path: ROUTES.managers,
  element: (
    <AuthGuard roles={[Roles.SuperAdmin]}>
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

export default ManagersRoute
