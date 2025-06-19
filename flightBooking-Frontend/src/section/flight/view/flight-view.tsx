import { Box } from "@mui/material"
import { FlightFirstPage } from "../flight-first-page"
import { FlightSecondPage } from "../flight-second-page"
import { FlightThirdPage } from "../flight-third-page"

export const FlightPageView=()=>{
    return(
        <Box sx={{width:"100%"}}>
            <FlightFirstPage/>
            <FlightSecondPage/>
            <FlightThirdPage/>


        </Box>
    )
}