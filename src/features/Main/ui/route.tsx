import { Dashboard } from "@/widgets";
import { Outlet } from "react-router-dom";

const MainRoute = {
  path: "",
  element: <Outlet />,
  children: [
    {
      path: "",
      element: <Dashboard />,
    },
  ],
};

export default MainRoute;
