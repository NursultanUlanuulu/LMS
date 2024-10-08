import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { StatusResponse } from "@/shared/enums";
import { useAppSelector } from "@/app/store";
import { selectUserProfile } from "@/features/Auth/store/selectors";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 768px)");
  const token: string | null = window.localStorage.getItem("token");
  const { status } = useAppSelector(selectUserProfile);

  const isLoading = status === StatusResponse.LOADING;
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    !isNonMobile ? false : true
  );

  if (!token) return <Navigate to="/auth" />;
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        loading={isLoading }
        isNonMobile={isNonMobile}
        drawerWidth={250}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1} sx={{ overflowX: "auto" }}>
        <Navbar
          loading={isLoading}
          isNonMobile={isNonMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box p="2rem 1.5rem">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
