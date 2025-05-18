import { Box, Button, Container, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { login } from "../store/slices/authSlice";
import type { AppDispatch, RootState } from "../store";

// Create a subtle animation for the Coligo text
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Styled component for the playful, large font for Coligo text
const ColigoText = styled(Typography)(({ theme }) => ({
  fontSize: "5rem",
  fontWeight: 700,
  color: "#fff",
  textShadow: "3px 3px 6px rgba(0,0,0,0.2)",
  fontFamily: "'Poppins', sans-serif",
  letterSpacing: "2px",
  marginBottom: theme.spacing(5),
  animation: `${float} 6s ease-in-out infinite`,
  background: "rgba(255,255,255,0.1)",
  padding: "0.5rem 1.5rem",
  borderRadius: "16px",
  backdropFilter: "blur(5px)",
}));

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Handle login button click
  const handleLogin = async () => {
    await dispatch(login());
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background:
          "linear-gradient(90deg, rgba(0, 87, 126, 1) 0%, rgba(0, 205, 198, 1) 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              fontWeight: 300,
              letterSpacing: "1px",
            }}
          >
            {t("app.title")}
          </Typography>

          <ColigoText>Coligo</ColigoText>

          <Button
            size="large"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              minWidth: 200,
              py: 1.5,
              px: 4,
              fontWeight: 600,
              borderRadius: 2,
              fontSize: "1.1rem",
              backgroundColor: "white",
              color: "#00577E",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
            }}
          >
            {loading ? "Logging in..." : t("auth.login")}
          </Button>
        </Box>
      </Container>

      <Typography
        variant="body2"
        sx={{
          color: "rgba(255, 255, 255, 0.7)",
          position: "absolute",
          bottom: "20px",
        }}
      >
        {t("app.copyright", { year: new Date().getFullYear() })}
      </Typography>
    </Box>
  );
}

export default Home;
