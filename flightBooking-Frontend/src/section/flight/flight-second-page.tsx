import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useState } from "react";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { cities } from "src/mockdata/_map/cities";
import { countries } from "src/mockdata/_map/countries";
import { useNavigate } from "react-router";
import { useAppDispatch } from "src/store";
import { setSearchParams } from "src/store/flight/flightReducer";

export const FlightSecondPage = () => {
  const [directOnly, setDirectOnly] = useState(false);
  const [travelClass, setTravelClass] = useState("1 Traveller, Economy");
  const today = new Date().toISOString().split("T")[0];
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);

  const cityOptions = cities.map(c => c.city);
  const countryOptions = countries.map(c => c.name);
const combinedOptions = [...cityOptions, ...countryOptions]; // countries: string[]
const navigate = useNavigate();
const dispatch = useAppDispatch()

const handleSearch = () => {
  dispatch(setSearchParams({ from, to }));
};


  return (
    <Box
      sx={{
        bgcolor: "#2e8bc0",
        py: 2,
        px: 3,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 0.3,
      }}
    >
      {/* Trip Type Buttons */}
      <Box sx={{ display: "flex", gap: 0.3, ml: 2 }}>
        {["One Way", "Round Trip", "Multi City"].map((type) => (
          <Button
            key={type}
            variant={type === "Round Trip" ? "contained" : "outlined"}
            onClick={() => {}}
            sx={{
              textTransform: "none",
              bgcolor: type === "Round Trip" ? "#fff" : "transparent",
              color: type === "Round Trip" ? "#2e8bc0" : "#fff",
              borderColor: "#fff",
              cursor: type === "Round Trip" ? "default" : "not-allowed",
              pointerEvents: type === "Round Trip" ? "auto" : "none",
            }}
            size="small"
          >
            {type}
          </Button>
        ))}
      </Box>

      {/* Flight Form Section */}
      <Box sx={{ p: 2, borderRadius: 1 }}>
        {/* Direct Flights Only */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "flex-end",
            position: "absolute",
            top: {
                xs:0,
                md:120
            },
            left: 950,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={directOnly}
                onChange={(e) => setDirectOnly(e.target.checked)}
              />
            }
            label={
              <Typography variant="body2" color="white">
                Direct flights only
              </Typography>
            }
          />
        </Box>

        {/* Flight Inputs */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            alignItems: "center",
          }}
        >
          {/* From */}
<Autocomplete
  options={combinedOptions}
  value={from}
  onChange={(event, newValue) => setFrom(newValue)}
  renderInput={(params) => (
    <TextField
      {...params}
      variant="outlined"
      size="small"
      placeholder="From"
      sx={{
        width: 245,
        bgcolor: "white",
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
        },
        "& fieldset": {
          borderColor: "transparent",
          borderRadius: 1,
        },
      }}
      InputProps={{
        ...params.InputProps, // 👈 must spread this
        startAdornment: (
          <>
            <InputAdornment position="start">
              <FlightTakeoffIcon fontSize="small" />
            </InputAdornment>
            {params.InputProps.startAdornment}
          </>
        ),
        endAdornment: (
          <>
            {params.InputProps.endAdornment}
            <InputAdornment position="end">
              <Button
                size="small"
                sx={{ minWidth: "auto" }}
                onClick={() => setFrom(null)}
              >
                ✖
              </Button>
            </InputAdornment>
          </>
        ),
      }}
    />
  )}
/>
 

<Autocomplete
  options={combinedOptions} // Only pass city names
  value={to}
  onChange={(event, newValue) => setTo(newValue)}
  renderInput={(params) => (
    <TextField
      {...params} // Important to spread the autocomplete props
      variant="outlined"
      size="small"
      placeholder="To"
      InputProps={{
        ...params.InputProps, // include this to make adornments work correctly
        startAdornment: (
          <InputAdornment position="start">
            <LocationOnIcon fontSize="small" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Button size="small" sx={{ minWidth: "auto" }} onClick={() => setTo(null)}>
              ✖
            </Button>
          </InputAdornment>
        ),
      }}
      sx={{
        width: 245,
        bgcolor: "white",
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
        },
        "& fieldset": {
          borderColor: "transparent",
          borderRadius: 1,
        },
      }}
    />
  )}
/>


          {/* Departure Date */}
          <TextField
            type="date"
            size="small"
            defaultValue={today}
            inputProps={{ min: today }}
            sx={{ minWidth: 120, bgcolor: "white" }}
          />

          {/* Return Date */}
          <TextField
            type="date"
            size="small"
            defaultValue={today}
            inputProps={{ min: today }}
            sx={{ minWidth: 160, bgcolor: "white" }}
          />

          {/* Travellers & Class */}
          <Select
            size="small"
            value={travelClass}
            onChange={(e) => setTravelClass(e.target.value)}
            sx={{ minWidth: 200, bgcolor: "white" }}
          >
            <MenuItem value="1 Traveller, Economy">
              1 Traveller, Economy
            </MenuItem>
            <MenuItem value="2 Travellers, Economy">
              2 Travellers, Economy
            </MenuItem>
            <MenuItem value="1 Traveller, Business">
              1 Traveller, Business
            </MenuItem>
          </Select>

          {/* Search Button */}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#e91e63",
              color: "#fff",
              textTransform: "none",
              ml: 2,
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
