import { Outlet } from "react-router-dom"
import { ROUTES } from "@/shared/data"
import { List } from "./ui/"
import { Roles } from "@/shared/enums"
import AuthGuard from "@/app/providers/PermissionProvider"
import Info from "./ui/info"
import EditGroup from "./ui/edit"

const GroupsRoute = {
  path: ROUTES.groups,
  element: (
    <AuthGuard roles={[Roles.Manager]}>
      <Outlet />
    </AuthGuard>
  ),
  children: [
    {
      path: ":id",
      element: <List />,
    },
    {
      path: "detail/:id",
      element: <Info />,
    },
    {
      path: "edit/:id",
      element: <EditGroup />,
    },
  ],
}

export default GroupsRoute
