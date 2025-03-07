import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/bookingForm.scss";

interface Hotel {
  id: number;
  name: string;
  location: string;
}

interface Booking {
  hotelId: number;
  userId: number;
  checkIn: string;
  checkOut: string;
  rooms: number;
}

const BookingForm: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [booking, setBooking] = useState<Booking>({
    hotelId: 0,  
    userId: 1,   
    checkIn: "",
    checkOut: "",
    rooms: 1,
  });

  const [message, setMessage] = useState("");


  useEffect(() => {
    axios.get("http://localhost:5000/api/hotels")
      .then((response) => {
        setHotels(response.data);
        if (response.data.length > 0) {
          setBooking((prev) => ({ ...prev, hotelId: response.data[0].id })); 
        }
      })
      .catch((error) => console.error("Error fetching hotels:", error));
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post("http://localhost:5000/api/bookings", booking)
      .then(() => {
        setMessage("Booking successful!");

        setBooking({
          hotelId: hotels.length > 0 ? hotels[0].id : 0,
          userId: 1,
          checkIn: "",
          checkOut: "",
          rooms: 1,
        });
      })
      .catch((error) => {
        setMessage("Failed to book. Please try again.");
        console.error("Booking error:", error);
      });
  };

  return (
    <div className="booking-form-container">
      <h2>Book a Hotel Room</h2>
      {message && <p className="message">{message}</p>}
      
      <form onSubmit={handleSubmit}>
        
        <label>Select Hotel:</label>
        <select
          value={booking.hotelId}
          onChange={(e) => setBooking({ ...booking, hotelId: parseInt(e.target.value) })}
          required
        >
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.name} ({hotel.location})
            </option>
          ))}
        </select>

        <label>Check-in Date:</label>
        <input
          type="date"
          value={booking.checkIn}
          onChange={(e) => setBooking({ ...booking, checkIn: e.target.value })}
          required
        />

        <label>Check-out Date:</label>
        <input
          type="date"
          value={booking.checkOut}
          onChange={(e) => setBooking({ ...booking, checkOut: e.target.value })}
          required
        />

        <label>Number of Rooms:</label>
        <input
          type="number"
          value={booking.rooms}
          min="1"
          onChange={(e) => setBooking({ ...booking, rooms: parseInt(e.target.value) })}
          required
        />

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
