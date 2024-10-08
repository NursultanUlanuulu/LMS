import { Outlet } from "react-router-dom";
import { ROUTES } from "@/shared/data";
import { StudentsPage, StudentInfo } from "./pages";
import AuthGuard from "@/app/providers/PermissionProvider";
import { Roles } from "@/shared/enums";

const StudentsRoute = {
  path: ROUTES.students,
  element: (
    <AuthGuard roles={[Roles.Manager]}>
      <Outlet />
    </AuthGuard>
  ),
  children: [
    {
      path: ":id",
      element: <StudentsPage />,
    },
    {
      path: "details/:id",
      element: <StudentInfo />,
    },
  ],
};

export default StudentsRoute;
