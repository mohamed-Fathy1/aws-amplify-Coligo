import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GradingIcon from "@mui/icons-material/Grading";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CampaignIcon from "@mui/icons-material/Campaign";

// Sidebar width
const drawerWidth = 230;

// Sidebar menu items
const menuItems = [
  {
    text: "dashboard",
    icon: <HomeIcon />,
    path: "/dashboard",
  },
  {
    text: "schedule",
    icon: <CalendarMonthIcon />,
    path: "/schedule",
  },
  {
    text: "courses",
    icon: <MenuBookIcon />,
    path: "/courses",
  },
  {
    text: "gradebook",
    icon: <GradingIcon />,
    path: "/gradebook",
  },
  {
    text: "performance",
    icon: <AssessmentIcon />,
    path: "/performance",
  },
  {
    text: "announcement",
    icon: <CampaignIcon />,
    path: "/announcements",
  },
];

const Sidebar = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (path: string) => {
      return;
      navigate(path);
    },
    [navigate]
  );

  // Style for gradient text
  const gradientTextStyle = {
    background: "linear-gradient(90deg, #00577E 0%, #00CCC6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "none",
          zIndex: theme.zIndex.drawer,
          background:
            "linear-gradient(180deg,rgb(6, 82, 107) 0%,rgb(17, 130, 159) 100%)",
        },
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 64,
          color: "white",
          p: 2,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: "bold", letterSpacing: 1 }}
        >
          Coligo
        </Typography>
      </Box>

      {/* Menu Items */}
      <Box
        sx={{
          height: "100%",
        }}
      >
        <List sx={{ p: 0, mt: 2 }}>
          {menuItems.map((item) => {
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    py: 1.5,
                    pl: 3,
                    color: "white",
                    bgcolor: "transparent",
                    "&:hover": {
                      bgcolor: "white",
                      color: "#00577E",
                      "& .MuiListItemIcon-root": gradientTextStyle,
                      "& .MuiTypography-root": gradientTextStyle,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "inherit",
                      minWidth: 40,
                      opacity: 0.9,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={t(`sidebar.${item.text}`)}
                    sx={{ color: "inherit" }}
                    primaryTypographyProps={{
                      fontWeight: "medium",
                      fontSize: "0.95rem",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
