import { useTranslation } from "react-i18next";
import { Box, Typography, Button, Paper } from "@mui/material";

const ExamsBanner = () => {
  const { t } = useTranslation();

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "60%" } }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: "bold",
              mb: 1,
              fontSize: { xs: "1.75rem", md: "2.25rem" },
              position: "relative",
              display: "inline-block",
              background:
                "linear-gradient(90deg, rgb(7, 90, 164) 0%, rgb(28, 162, 192) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              width: "fit-content",
            }}
          >
            {t("dashboard.exams_time")}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 1, maxWidth: "90%" }}
          >
            {t("dashboard.exams_description")}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, fontStyle: "italic" }}
          >
            {t("dashboard.quote")}
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              fontWeight: "bold",
              boxShadow: "none",
              background: "linear-gradient(90deg, #00CCC6 0%, #4DFFF9 100%)",
              fontSize: "1.2rem",
              "&:hover": {
                background: "linear-gradient(90deg, #00B5B0 0%, #3AEBE5 100%)",
                boxShadow: "0px 4px 8px rgba(0, 204, 198, 0.3)",
              },
            }}
          >
            {t("dashboard.view_exams_tips")}
          </Button>
        </Box>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            justifyContent: "center",
            mt: { xs: 3, md: 0 },
            width: { xs: "100%", md: "40%" },
          }}
        >
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <img
              src="/images/exam-illustration.svg"
              alt="Exam preparation"
              style={{ maxWidth: "300px" }}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ExamsBanner;
