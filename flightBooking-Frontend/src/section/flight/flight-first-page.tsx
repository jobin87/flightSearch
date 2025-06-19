import { Box, List, Typography } from "@mui/material";

export const FlightFirstPage = () => {
  const items = [
    "My Booking",
    "Tour And Attraction",
    "KWD/ARABIC",
    "Login/Signup",
  ];
  return (
    <Box id="parentbox" sx={{ width: "100%", height: "100%", m: 0 }}>
      <Box
        id="in-fbox"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            ml: {
              xs: 0,
              md: 2,
            },
          }}
        >
          <Box
            component="img"
            src="/logos/flightlogo.svg"
            alt="Logo"
            sx={{ height: 80 }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            fontSize: { xs: 12, md: 16 },
            gap: {
              xs: 1,
              md: 2,
            },
            mr:3
          }}
        >
          {items.map((text, index) => (
            <Box key={text} display="flex" alignItems="center">
              {/* ✅ Dot before all items except the last one */}
              {index !== items.length && (
                <Box
                  sx={{
                    mr: 1,
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    backgroundColor: "primary.main",
                    alignSelf: "center",
                  }}
                />
              )}

              <Typography variant="body2" sx={{ fontSize: { xs: 12, md: 14 } }}>
                {text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
