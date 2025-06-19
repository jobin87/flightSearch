import { Request, Response } from "express";
import flightModel from "../models/flight";

export const addFlights = async (req: Request, res: Response): Promise<void> => {
  try {
    const {flightName,
  flightNumber,
  departureCity,
  arrivalCity,
  departureDate ,
  arrivalDate ,
  departureTime,
  arrivalTime,
  price,} = req.body;

    // Check for missing fields
    if (!flightName || !flightNumber || !departureCity || !arrivalCity || !departureDate || !arrivalDate || !departureTime || !arrivalTime || !price) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // ✅ Check if an flight already exists for the same flightnumber
  const existingFlight = await flightModel.findOne({ flightNumber });


    if (existingFlight) {
      res.status(409).json({ message: "This flight with the same number is already added. Please choose another time." });
      return;
    }

    // ✅ Create and save the new flight
    const createNewFlight = new flightModel({
      flightName,
      flightNumber,
      departureCity,
      arrivalCity,
      departureDate,
      arrivalDate,
      departureTime,
      arrivalTime,
      price,
    });

    console.log("New flight object:", createNewFlight);

    await createNewFlight.save();


    res.status(201).json({
      message: "flight added successfully",
      data: createNewFlight,
      success: true
    });
  } catch (error: any) {
    console.error("Flight adding error:", error);
    res.status(500).json({ message: "Internal server error while adding flight" });
  }
};

export const getAllFlights = async (req: Request, res: Response): Promise<void> => {
  try {
    const flights = await flightModel.find(); // Fetch all flight documents
    res.status(200).json({
      message: "Fetched all flights successfully",
      data: flights,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching flights:", error);
    res.status(500).json({ message: "Internal server error while fetching flights" });
  }
};


