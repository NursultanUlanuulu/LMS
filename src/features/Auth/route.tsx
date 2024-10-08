import { Outlet } from "react-router"
import { Login } from "./ui/pages"

const Route = {
  path: "auth",
  element: <Outlet />,
  children: [
    {
      path: "",
      element: <Login />,
    },
  ],
}

export default Route
