import express, { Request, Response }  from "express";

const router = express.Router();

const hotels = [
  { id: 1, name: "Hotel Paradise", location: "New York", rooms: 5 },
  { id: 2, name: "Ocean View", location: "California", rooms: 10 },
];

router.get("/", (req:Request, res: Response) => {
  const { location } = req.query;

  // If a location filter is provided, filter hotels
  const filteredHotels = location
    ? hotels.filter((hotel) => hotel.location.toLowerCase() === String(location).toLowerCase())
    : hotels;

  res.json(filteredHotels);
  });

export default router;
