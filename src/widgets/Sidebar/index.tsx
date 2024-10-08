import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Color,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRightOutlined } from "@mui/icons-material";
import FlexBetween from "@/shared/ui/FlexBetween";
import { tokensDark } from "@/app/providers/ThemeProvider";
import { sidebarLinks } from "@/shared/data";
import { Roles } from "@/shared/enums";
import { useAppSelector } from "@/app/store";
import { selectUserProfile } from "@/features/Auth/store/selectors";

interface SidebarProp {
  drawerWidth: number;
  isSidebarOpen: boolean;
  setIsSidebarOpen: any;
  isNonMobile: boolean;
  loading: boolean;
}
const Sidebar: React.FC<SidebarProp> = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  loading,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState<string[]>([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const activeColor = "#fff";
  const { user: getProfileInfo } = useAppSelector(selectUserProfile);
  const userRole = getProfileInfo.user_type;
  document.body.addEventListener("click", () => {
    if (!isNonMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  });
  const isValidRole = (validedRoles: Roles[]): boolean => {
    return validedRoles.includes(userRole);
  };
  useEffect(() => {
    if (pathname.length === 1) {
      setActive([pathname]);
    } else {
      setActive(pathname.split("/"));
    }
  }, [pathname]);
  return (
    <Box component="nav" onClick={(e) => e.stopPropagation()}>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: (theme.palette.secondary as unknown as Color)[200],
              backgroundColor: tokensDark.primary[500],
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "1px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 1rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography
                    sx={{
                      color: tokensDark.greenAccent[500],
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    variant="h4"
                    fontWeight="bold"
                    onClick={() => navigate("/")}
                  >
                    LMS
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {loading
                ? Array(5)
                    .fill(4)
                    .map((_, index) => {
                      return (
                        <Box key={index}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                            sx={{
                              height: "48px",
                              pl: "15px",
                            }}
                          >
                            <Skeleton
                              variant="circular"
                              width={28}
                              height={28}
                            />
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={130}
                            />
                          </Stack>
                          <Divider />
                        </Box>
                      );
                    })
                : sidebarLinks.map(({ text, href, ...link }) => {
                    if (!link.icon) {
                      return (
                        <Typography
                          key={text}
                          sx={{ m: "2.25rem 0 1rem 3rem" }}
                        >
                          {text}
                        </Typography>
                      );
                    } else if (!isValidRole(link.roles)) {
                      return;
                    }
                    return (
                      <ListItem
                        sx={{
                          background:
                            href === "/"
                              ? active[0] === href
                                ? tokensDark.greenAccent[500]
                                : "inherit"
                              : active.includes(href.split("/")[0])
                              ? tokensDark.greenAccent[500]
                              : "inherit",
                        }}
                        key={text}
                        disablePadding
                      >
                        <ListItemButton
                          onClick={() => {
                            navigate(href);
                            setActive([href]);
                            if (!isNonMobile) {
                              setIsSidebarOpen(false);
                            }
                          }}
                          sx={{
                            paddingX: "10px",
                            color:
                              href === "/"
                                ? active[0] === href
                                  ? activeColor
                                  : (
                                      theme.palette.grey as unknown as Color
                                    )[100]
                                : active.includes(href.split("/")[0])
                                ? activeColor
                                : (theme.palette.grey as unknown as Color)[100],
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              ml: "0.1rem",
                              minWidth: "44px",
                              color:
                                href === "/"
                                  ? active[0] === href
                                    ? activeColor
                                    : (
                                        theme.palette.grey as unknown as Color
                                      )[100]
                                  : active.includes(href.split("/")[0])
                                  ? activeColor
                                  : (
                                      theme.palette.grey as unknown as Color
                                    )[100],
                            }}
                          >
                            {<link.icon />}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                          {href === "/"
                            ? active[0] === href && (
                                <ChevronRightOutlined
                                  sx={{
                                    ml: "auto",
                                    color: activeColor,
                                  }}
                                />
                              )
                            : active.includes(href.split("/")[0]) && (
                                <ChevronRightOutlined
                                  sx={{
                                    ml: "auto",
                                    color: activeColor,
                                  }}
                                />
                              )}
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
