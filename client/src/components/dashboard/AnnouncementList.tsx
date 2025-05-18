import { useTranslation } from "react-i18next";
import { Box, Typography, Paper, Link, Avatar, Skeleton } from "@mui/material";

interface Announcement {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    role: string;
    subject: string;
  };
  createdAt: string;
  updatedAt: string;
  category?: string;
}

interface AnnouncementListProps {
  announcements: Announcement[];
  loading: boolean;
}

// Sample data to match the image exactly
const sampleAnnouncements: Announcement[] = [
  {
    _id: "3",
    title: "Morning Announcement",
    content:
      "Goooooooooood morning, Warriors! That get-ready-for-the-day call is heard each morning by 850 students at Goodwyn Junior High School in Tawamov, Egypt...",
    author: {
      _id: "a3",
      name: "School management",
      role: "admin",
      subject: "Management",
    },
    createdAt: "2023-05-12T08:00:00Z",
    updatedAt: "2023-05-12T08:00:00Z",
    category: "S",
  },
  {
    _id: "4",
    title: "Field Trip",
    content:
      "Helloppp. Can't wait our upcoming trip on the next weekend. The trip will be to Dreampark and Pyramids! To book your seat please contact your class teacher.",
    author: {
      _id: "a4",
      name: "Events Manager",
      role: "admin",
      subject: "Events",
    },
    createdAt: "2023-05-11T14:45:00Z",
    updatedAt: "2023-05-11T14:45:00Z",
    category: "E",
  },
  {
    _id: "2",
    title: "Unit 2 Quiz",
    content:
      "Hello my students, I want to announce that the next quiz will be within 3 days and will cover the whole unit 2: Add and subtract numbers. Study hard! Good luck!",
    author: {
      _id: "a2",
      name: "Mrs.Salma Ahmed",
      role: "teacher",
      subject: "Physics 02",
    },
    createdAt: "2023-05-14T09:15:00Z",
    updatedAt: "2023-05-14T09:15:00Z",
    category: "M",
  },
  {
    _id: "1",
    title: "Exam Preparation",
    content:
      "Hi my friends! I just want you ready to our exams and focus on remaining assignments to gain more grades, good luck my warriors! 😊",
    author: {
      _id: "a1",
      name: "Mr.Ahmed Mostafa",
      role: "teacher",
      subject: "Math 101",
    },
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-15T10:30:00Z",
    category: "M",
  },
];

const AnnouncementList: React.FC<AnnouncementListProps> = ({ loading }) => {
  const { t } = useTranslation();

  // Use sample data to match the image exactly
  const displayAnnouncements = sampleAnnouncements;

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
            <Box key={index} sx={{ mb: 3, display: "flex", gap: 2 }}>
              <Skeleton variant="circular" width={60} height={60} />
              <Box sx={{ flexGrow: 1 }}>
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="30%" />
              </Box>
            </Box>
          ))
        : // Announcements list
          displayAnnouncements.map((announcement) => (
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
                {announcement.category}
              </Avatar>

              <Box sx={{ width: "30%", borderRight: "1px solid #e0e0e0" }}>
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

              <Box sx={{ flexGrow: 1, pl: 2 }}>
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
