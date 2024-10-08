import { Outlet } from "react-router-dom"
import { ROUTES } from "@/shared/data"
import { List } from "./ui/"
import AuthGuard from "@/app/providers/PermissionProvider"
import { Roles } from "@/shared/enums"

const BooksRoute = {
  path: ROUTES.books,
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

export default BooksRoute
