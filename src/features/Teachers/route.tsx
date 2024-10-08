import { Outlet } from "react-router-dom";
import { ROUTES } from "@/shared/data";
import List from "./pages/list";
import Details from "./pages/details";
import AuthGuard from "@/app/providers/PermissionProvider";
import { Roles } from "@/shared/enums";

const TeachersRoute = {
  path: ROUTES.teachers,
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
      path: "details/:id",
      element: <Details />,
    },
  ],
};

export default TeachersRoute;
