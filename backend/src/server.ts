import express,{Request, Response, NextFunction } from "express";
import cors from "cors";
import hotelRoutes from "./routes/hotelRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error("Route Not Found") as any;
    error.status = 404;
    next(error);
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
