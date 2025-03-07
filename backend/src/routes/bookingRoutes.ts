import express, {  Request, Response, NextFunction}  from "express";
import db from "../db.js"

const router = express.Router();


router.get("/:id", (req: Request, res: Response, next: NextFunction):void => {
 try {
  const id = parseInt(req.params.id);
  const booking = db.data.bookings.find((b) => b.id === id);
  if (!booking) {
    const error = new Error("Booking not found") as any;
    error.status = 404;
    throw error;
     }
  res.json(booking);
 } catch(error){
  next(error);
 }
});



router.put("/:id", (req: Request, res: Response, next:NextFunction):void => {
  try {
  const id = parseInt(req.params.id);
  const {hotelId , checkIn, checkOut, rooms } = req.body;

  if (!hotelId ||!checkIn || !checkOut || !rooms) {
    const error = new Error("All fields are required for update") as any;
    error.status = 400;
    throw error;
  }

  const bookingIndex = db.data.bookings.findIndex((b) => b.id === id);
  if (bookingIndex === -1) {
    const error = new Error("Booking not found") as any;
    error.status = 400;
    throw error;
  }

  db.data.bookings[bookingIndex] = {
    ...db.data.bookings[bookingIndex],
    hotelId,
    checkIn,
    checkOut,
    rooms,
  };

  db.write();
  res.json({ message: "Booking updated successfully", booking: db.data.bookings[bookingIndex] });
} catch(err) {
 next(err)
}
})


router.post("/", (req: Request, res: Response, next:NextFunction): void => {
  try {
  const { hotelId, userId, checkIn, checkOut, rooms } = req.body;
  if (!hotelId) {
    const error = new Error("Hotel ID is required") as any;
    error.status = 404;
    throw error;
}

const newBooking = {
    id: db.data.bookings.length + 1, 
    hotelId,
    userId,
    checkIn,
    checkOut,
    rooms,
};

db.data.bookings.push(newBooking);
db.write(); 

res.status(201).json(newBooking);
  } catch(err){
    next(err);
  }
});

router.get("/", (req: Request, res: Response, next:NextFunction) => {
 
  try{
    if(!db.data.bookings || db.data.bookings.length === 0){
      const error = new Error("No booing available") as any;
      error.status = 404;
      throw error;
    }
    res.json(db.data.bookings);
  }catch (err){
    next(err);
  }
});



router.delete("/:id", (req: Request, res: Response, next:NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if(isNaN(id)){
      const error = new Error("Invalid booking ID") as any;
      error.status = 400;
      throw error;
    }

    const bookingIndex = db.data.bookings.findIndex((b) => b.id === id);
    if(bookingIndex === -1){
      const error = new Error("Booking not found") as any;
    }

    db.data.bookings = db.data.bookings.filter((b) => b.id !== id);
    db.write();
    res.json({ message: "Booking deleted successfully" });
    
  } catch(err){
    next(err);
  }
});

export default router;
