import { useSelector } from "react-redux";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import { styled, alpha } from "@mui/material/styles";
import type { RootState } from "../../store";

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

const Header = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.auth);

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
          sx={{ border: "1px solid rgb(139, 139, 139)", borderRadius: 5 }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <Box sx={{ display: "flex", alignItems: "center" }}>
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

          <Avatar
            alt={user?.name || "Talia"}
            src="/avatar.png"
            sx={{ width: 36, height: 36 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
