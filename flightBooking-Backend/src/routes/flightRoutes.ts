import express from 'express';
import { addFlights } from '../controllers/flightController';

const FlightRoutes = express.Router();


  
FlightRoutes.post('/registration',addFlights);

export default FlightRoutes;
