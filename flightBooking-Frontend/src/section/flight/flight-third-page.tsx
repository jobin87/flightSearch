import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "src/store";
import { getAllFlights } from "src/store/flight/flightThunk";

export const FlightThirdPage = () => {
  const [range, setRange] = useState<number[]>([85.436, 247.61]);
    const [rangehr, setRangehr] = useState<number[]>([105, 1800]);
        const [returnrangehr, setReturnRangehr] = useState<number[]>([105, 1800]);


  const allFlights = useAppSelector((state) => state.flight.flightlist.data);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setRange(newValue as number[]);
  };

  const handleChangeTime = (event: Event, newValue: number | number[]) => {
    setRangehr(newValue as number[]);
  };
   const handleChangeReturnTime = (event: Event, newValue: number | number[]) => {
    setReturnRangehr(newValue as number[]);
  };


  const logos = [
    { src: "hahnair.png", label: "Hahn Air" },
    { src: "gulfair.png", label: "Gulf Air" },
    { src: "qatar.png", label: "Qatar Airways" },
    { src: "royaljordanian.png", label: "Royal Jordanian" },
  ];
  const stopOptions = [
    { label: "NonStop", icon: "/icons/nonstop.svg" },
    { label: "1 Stop", icon: "/icons/1stop.svg" },
    { label: "1 + Stop", icon: "/icons/multistop.svg" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 1;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = {} as any;
    dispatch(getAllFlights(params));
  }, [dispatch]);

  const { from, to } = useAppSelector((state) => state.flight);
const filteredFlights = allFlights.filter((flight: any) => {
  const matchesPrice =
    flight.price >= range[0] && flight.price <= range[1];
  const matchesFrom = !from || flight.departureCity === from;
  const matchesTo = !to || flight.arrivalCity === to;

  return matchesPrice && matchesFrom && matchesTo;
});

const getDuration = (departureDate: string, departureTime: string, arrivalDate: string, arrivalTime: string) => {
  const departure = new Date(`${departureDate}T${departureTime}`);
  const arrival = new Date(`${arrivalDate}T${arrivalTime}`);
  const diffMs = arrival.getTime() - departure.getTime(); // in milliseconds

  const diffMins = Math.floor(diffMs / 1000 / 60);
  const hours = Math.floor(diffMins / 60);
  const minutes = diffMins % 60;

  return `${hours}h ${minutes}m`;
};

// Pagination: current slice of filtered flights
const indexOfLastFlight = currentPage * flightsPerPage;
const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);


// Total Pages based on filtered flights
const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);

  return (
    <Box id="in-tbox" sx={{ m: { xs: 2, md: 4 } }}>
      {/* Airline Logos */}
      <Box
        id="flightlogo"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 6,
          px: 2,
          py: 2,
          bgcolor: "#fff",
          borderRadius: 1,
          boxShadow: 1,
          mb: 3,
        }}
      >
        {logos.map((logo) => (
          <Box
            key={logo.src}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Box
              component="img"
              src={`/logos/${logo.src}`}
              alt={logo.label}
              sx={{ height: 20, objectFit: "contain" }}
            />
            <Typography variant="caption" sx={{ fontSize: 11 }}>
              {logo.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Filter Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* Left Filter Box */}
        <Box
          id="leftbox"
          sx={{
            flex: 1,
            maxWidth: 300,
            p: 2,
            borderRadius: 2,
          }}
        >
          {/* Filter: Price */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              Price
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {`KWD ${range[0]} — KWD ${range[1]}`}
            </Typography>
            <Slider
              value={range}
              onChange={handleChange}
              valueLabelDisplay="auto"
              min={85.436}
              max={247.61}
              step={10}
              sx={{ width: "90%", mt: 3 }}
              size="small"
            />
          </Box>
          <Divider />

          {/* Filter: Fare Type */}
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} mb={1}>
              Fare Type
            </Typography>
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={
                <Typography variant="body2">Refundable with Charge</Typography>
              }
            />
          </Box>
          <Divider />

          {/* Filter: Duration */}
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              Duration
            </Typography>
            <Typography variant="caption">onward</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
                mt: 1,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                1 hr
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1 Day
              </Typography>
            </Box>
            <Slider
              value={rangehr}
              onChange={handleChangeTime}
              valueLabelDisplay="auto"
              min={105}
              max={1800}
              step={10}
              sx={{ width: "90%", mt: 1 }}
              size="small"
            />{" "}
            <Typography variant="caption">return</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
                mt: 1,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                1 hr
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1 Day
              </Typography>
            </Box>
            <Slider
              value={returnrangehr}
              onChange={handleChangeReturnTime}
              valueLabelDisplay="auto"
              min={105}
              max={1800}
              step={10}
              sx={{ width: "90%", mt: 1 }}
              size="small"
            />
          </Box>
          <Divider />

          <Box>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Stops
            </Typography>

            {["from Dubai", "from Kuwait"].map((fromText) => (
              <Box key={fromText} mb={3}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {fromText}
                </Typography>

                <Grid container spacing={2}>
                  {stopOptions.map((option) => (
                    <Grid item key={option.label}>
                      <Paper
                        elevation={2}
                        sx={{
                          p: 1.5,
                          textAlign: "center",
                          cursor: "pointer",
                          width: 50,
                          borderRadius: 1,
                        }}
                      >
                        <Box
                          component="img"
                          src={option.icon}
                          alt={option.label}
                          sx={{ width: 50, height: 30, mb: 1, mx: "auto" }}
                        />
                        <Typography variant="caption">
                          {option.label}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              Airlines
            </Typography>
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={
                <Typography variant="body2">Hahn Air Businessline</Typography>
              }
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={<Typography variant="body2">Qatar Airways</Typography>}
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={<Typography variant="body2">Emirates Airlines</Typography>}
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={<Typography variant="body2">Gulf Air Company</Typography>}
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={<Typography variant="body2">Royal Jordanian</Typography>}
            />
          </Box>
        </Box>

        {/* Right Result Box */}
        <Box id="rightbox">
  {filteredFlights.length > 0 ? (
    filteredFlights.map((flight: any) => {
      const duration = getDuration(
        flight.departureDate,
        flight.departureTime,
        flight.arrivalDate,
        flight.arrivalTime
      );

      return (
        <Box
          key={flight._id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 6,
            px: 2,
            py: 6,
            bgcolor: "#fff",
            borderRadius: 1,
            boxShadow: 1,
            mb: 3,
          }}
        >
          <strong>{flight.flightName}</strong>
          <p>{flight.departureCity} → {flight.arrivalCity}</p>
          <p>{flight.departureDate} at {flight.departureTime}</p>
          <p>Duration: {duration}</p>
          <p>Price: {flight.price} KWD</p>
        </Box>
      );
    })
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 200,
        bgcolor: "#fff",
        borderRadius: 1,
        boxShadow: 1,
        mt: 3,
      }}
    >
      <p>No flights found</p>
    </Box>
  )}

  {/* Pagination */}
  {filteredFlights.length > 0 && (
    <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
      <Button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() =>
          setCurrentPage((prev) => Math.min(prev + 1, totalPages))
        }
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Stack>
  )}
</Box>

      </Box>
    </Box>
  );
};
