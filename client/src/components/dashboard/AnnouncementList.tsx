import { useTranslation } from "react-i18next";
import { Box, Typography, Paper, Link, Avatar, Skeleton } from "@mui/material";

interface Announcement {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    role?: string;
    subject?: string;
  };
  createdAt: string;
  updatedAt?: string;
  category?: string;
  course?: string;
}

interface AnnouncementListProps {
  announcements: Announcement[];
  loading: boolean;
}

const AnnouncementList: React.FC<AnnouncementListProps> = ({
  announcements,
  loading,
}) => {
  const { t } = useTranslation();

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 2,
        height: "100%",
        bgcolor: "#FFFFFF",
        boxShadow: "none",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.4 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "#333", fontSize: "28px" }}
        >
          {t("dashboard.announcements")}
        </Typography>
        <Link
          href="#"
          underline="none"
          sx={{
            fontWeight: "bold",
            color: "primary.light",
            fontSize: "1.2rem",
          }}
        >
          {t("dashboard.all")}
        </Link>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 4,
          opacity: 0.6,
          fontSize: "0.9rem",
          color: "#878787",
        }}
      >
        All class entries have updates?
      </Typography>

      {loading
        ? // Loading skeleton
          Array.from(new Array(3)).map((_, index) => (
            <Box
              key={index}
              sx={{ mb: 3, display: "flex", gap: 2 }}
              data-testid="skeleton"
            >
              <Skeleton variant="circular" width={60} height={60} />
              <Box sx={{ flexGrow: 1 }}>
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="30%" />
              </Box>
            </Box>
          ))
        : // Announcements list
          announcements.map((announcement) => (
            <Box
              key={announcement._id}
              sx={{
                mb: 4,
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: "#e0e0e0",
                  color: "#9e9e9e",
                  fontSize: "24px",
                  fontWeight: "500",
                  mr: 3,
                }}
              >
                {announcement.category || announcement.title.charAt(0)}
              </Avatar>

              <Box sx={{ flexGrow: 1, borderRight: "1px solid #e0e0e0" }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="600"
                  sx={{ fontSize: ".9rem", color: "#333", mb: 0.5 }}
                >
                  {announcement.author.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.7rem",
                    color: "#9e9e9e",
                    fontWeight: "400",
                  }}
                >
                  {announcement.title}
                </Typography>
              </Box>

              <Box sx={{ flexGrow: 2, pl: 2, maxWidth: "73%" }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#666",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    letterSpacing: "0.01em",
                  }}
                >
                  {announcement.content}
                </Typography>
              </Box>
            </Box>
          ))}
    </Paper>
  );
};

export default AnnouncementList;
