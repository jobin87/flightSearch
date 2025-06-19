import express from 'express';
import { addFlights, getAllFlights } from '../controllers/flightController';

const FlightRoutes = express.Router();


  
FlightRoutes.post('/registration',addFlights);
FlightRoutes.get('/getAllFlights',getAllFlights);


export default FlightRoutes;
