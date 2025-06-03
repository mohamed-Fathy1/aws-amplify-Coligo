import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Badge,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, alpha } from "@mui/material/styles";
import type { RootState, AppDispatch } from "../../store";
import { useState } from "react";
import { logout } from "../../store/slices/authSlice";

// Custom styled search component
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: alpha(theme.palette.text.primary, 0.6),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

// Gradient icons
const GradientIconStyle = {
  fill: "url(#gradientColor)",
};

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .catch((error: unknown) => {
        console.error("Logout failed:", error);
      });
    handleMenuClose();
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "white",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar sx={{ minHeight: "64px !important" }}>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={onToggleSidebar}
            edge="start"
            sx={{ mr: 2 }}
            data-testid="toggle-sidebar"
            name="toggle"
          >
            <MenuIcon style={GradientIconStyle} />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component="h2"
          color="text.primary"
          sx={{
            flexGrow: 1,
            fontWeight: 500,
            fontSize: "1.6rem",
            display: { xs: "none", sm: "block" },
          }}
        >
          {t("dashboard.welcome", { name: user?.name || "Talia" })}
        </Typography>

        <Search
          sx={{
            border: "1px solid rgb(139, 139, 139)",
            borderRadius: 5,
            display: { xs: isMobile ? "none" : "block", sm: "block" },
          }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: { xs: "auto", sm: "0" },
          }}
        >
          {/* SVG Gradient Definition */}
          <svg width="0" height="0">
            <linearGradient
              id="gradientColor"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#007F99" />
              <stop offset="100%" stopColor="#00A1B5" />
            </linearGradient>
          </svg>

          <IconButton
            size="large"
            aria-label="show new notifications"
            color="inherit"
            sx={{
              "& .MuiBadge-badge": {
                border: "2px solid #fff",
              },
            }}
          >
            <Badge badgeContent={1} color="primary">
              <NotificationsIcon sx={GradientIconStyle} />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            aria-label="show new messages"
            color="inherit"
            sx={{
              mx: 1,
              "& .MuiBadge-badge": {
                border: "2px solid #fff",
              },
            }}
          >
            <Badge badgeContent={1} color="primary">
              <EmailIcon sx={GradientIconStyle} />
            </Badge>
          </IconButton>

          <IconButton
            onClick={handleMenuOpen}
            size="small"
            sx={{ ml: 0.5 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              alt={user?.name || "Talia"}
              src="/avatar.png"
              sx={{ width: 36, height: 36 }}
            />
          </IconButton>

          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                mt: 1.5,
                "& .MuiMenuItem-root": {
                  px: 2.5,
                  py: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleLogout}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
              {t("common.logout", "Logout")}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
