import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container } from "@mui/material";
import type { AppDispatch, RootState } from "../store";
import { fetchAnnouncements } from "../store/slices/announcementSlice";
import { fetchQuizzes } from "../store/slices/quizSlice";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import AnnouncementList from "../components/dashboard/AnnouncementList";
import DueItemsList from "../components/dashboard/DueItemsList";
import ExamsBanner from "../components/dashboard/ExamsBanner";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { announcements, loading: announcementsLoading } = useSelector(
    (state: RootState) => state.announcements
  );
  const { quizzes, loading: quizzesLoading } = useSelector(
    (state: RootState) => state.quizzes
  );

  useEffect(() => {
    dispatch(fetchAnnouncements());
    dispatch(fetchQuizzes());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        {/* Header */}
        <Header />

        {/* Content */}
        <Container
          maxWidth={false}
          sx={{
            mt: 1, // Add margin top to account for fixed header
            mb: 4,
            px: { xs: 2, sm: 3 },
            pt: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* Exams Banner */}
            <ExamsBanner />

            {/* Content Area */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
              }}
            >
              {/* Announcements */}
              <Box sx={{ flex: { md: 3 }, width: { xs: "100%", md: "auto" } }}>
                <AnnouncementList
                  announcements={announcements}
                  loading={announcementsLoading}
                />
              </Box>

              {/* What's Due */}
              <Box sx={{ flex: { md: 2 }, width: { xs: "100%", md: "auto" } }}>
                <DueItemsList quizzes={quizzes} loading={quizzesLoading} />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
