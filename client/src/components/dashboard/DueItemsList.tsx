import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Chip,
  Skeleton,
  Link,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { Quiz } from "../../store/slices/quizSlice";

interface DueItemsListProps {
  quizzes: Quiz[];
  loading: boolean;
}

// Sample quizzes data (for mockup)
const sampleQuizzes = [
  {
    _id: "1",
    title: "Unit 2 quiz",
    course: "Physics 02",
    topic: "Unit2: Motion and Forces",
    dueDate: "2023-09-20T09:00:00Z",
    questions: [],
    totalPoints: 20,
    createdAt: "2023-09-10T12:00:00Z",
    updatedAt: "2023-09-10T12:00:00Z",
  },
  {
    _id: "2",
    title: "12-12 Assignment",
    course: "Arabic #12",
    topic: "الوحدة - العربية لغتي",
    dueDate: "2023-09-20T09:00:00Z",
    questions: [],
    totalPoints: 15,
    createdAt: "2023-09-11T11:30:00Z",
    updatedAt: "2023-09-11T11:30:00Z",
  },
];

const DueItemsList: React.FC<DueItemsListProps> = ({ quizzes, loading }) => {
  const { t } = useTranslation();

  // Use sample data for mockup if no quizzes
  const displayQuizzes = quizzes.length > 0 ? quizzes : sampleQuizzes;

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 2,
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6" fontWeight="medium">
          {t("dashboard.whats_due")}
        </Typography>
        <Link
          href="#"
          underline="none"
          sx={{ fontWeight: "medium", color: "primary.light" }}
        >
          {t("dashboard.all")}
        </Link>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {loading
        ? // Loading skeleton
          Array.from(new Array(2)).map((_, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Skeleton variant="text" width="50%" height={30} />
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="40%" />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={40}
                sx={{ mt: 2, borderRadius: 1 }}
              />
            </Box>
          ))
        : // Quizzes list
          displayQuizzes.map((quiz, index) => (
            <Box key={quiz._id} sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Chip
                  icon={<AccessTimeIcon fontSize="small" />}
                  label={formatDate(quiz.dueDate)}
                  size="small"
                  sx={{
                    bgcolor: "rgba(0, 204, 198, 0.1)",
                    color: "secondary.main",
                    fontWeight: "medium",
                    mr: 1,
                  }}
                />
              </Box>

              <Typography variant="h6" sx={{ fontSize: "1.1rem", mb: 0.5 }}>
                {index === 0
                  ? t("quiz.unit_quiz", { unit: "2" })
                  : t("assignment.assignment", { number: "12-12" })}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>{t("quiz.course")}</strong> {quiz.course}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>{t("quiz.topic")}</strong> {quiz.topic}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>{t("quiz.due")}</strong> {formatDate(quiz.dueDate)}
              </Typography>

              <Button
                variant="contained"
                color={index === 0 ? "primary" : "secondary"}
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.2,
                  fontWeight: "medium",
                  borderRadius: 1.5,
                  background:
                    index === 0
                      ? "linear-gradient(90deg, #00577E 0%, #066989 100%)"
                      : "linear-gradient(90deg, #00CCC6 0%, #4DFFF9 100%)",
                  boxShadow: "none",
                  "&:hover": {
                    background:
                      index === 0
                        ? "linear-gradient(90deg, #00415F 0%, #055F7F 100%)"
                        : "linear-gradient(90deg, #00B5B0 0%, #3AEBE5 100%)",
                    boxShadow:
                      index === 0
                        ? "0px 4px 8px rgba(0, 87, 126, 0.3)"
                        : "0px 4px 8px rgba(0, 204, 198, 0.3)",
                  },
                }}
              >
                {index === 0
                  ? t("quiz.start_quiz")
                  : t("assignment.solve_assignment")}
              </Button>
            </Box>
          ))}
    </Paper>
  );
};

export default DueItemsList;
