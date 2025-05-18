import { Box, Button, Container, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

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
            Welcome to
          </Typography>

          <ColigoText>Coligo</ColigoText>

          <Button
            variant="contained"
            size="large"
            onClick={() => {}}
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
            Login
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
        &copy; {new Date().getFullYear()} Coligo. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Home;
