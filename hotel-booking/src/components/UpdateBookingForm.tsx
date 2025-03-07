import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/updateBookingForm.scss";

interface Hotel {
  id: number;
  name: string;
  location: string;
}

interface Booking {
  id: number;
  hotelId: number;
  userId: number;
  checkIn: string;
  checkOut: string;
  rooms: number;
}

interface UpdateBookingFormProps {
  bookingId: number;
  onClose: () => void;
}

const UpdateBookingForm: React.FC<UpdateBookingFormProps> = ({ bookingId, onClose }) => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/bookings/${bookingId}`)
      .then((response) => {
        setBooking(response.data);
      })
      .catch(() => setError("Failed to fetch booking details."));

    axios
      .get("http://localhost:5000/api/hotels")
      .then((response) => {
        setHotels(response.data);
      })
      .catch(() => setError("Failed to fetch hotels."));
      setLoading(false);
  }, [bookingId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) return;

    try {
      await axios.put(`http://localhost:5000/api/bookings/${bookingId}`, {
        hotelId: booking.hotelId,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        rooms: booking.rooms,
      });
      alert("Booking updated successfully!");
      navigate("/my-bookings");
    } catch (err) {
      setError("Failed to update booking. Please try again.");
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!booking) return <p>Booking not found.</p>;

  return (
    <div className="update-booking-form">
      <h2>Update Booking</h2>
      <form onSubmit={handleUpdate}>
        
         <label>Select Hotel:</label>

        <select
        value={booking.hotelId}
        onChange={(e) => setBooking({ ...booking, hotelId: parseInt(e.target.value) })}
        required>
        {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
            {hotel.name} ({hotel.location})
            </option>
        ))}

        </select>
        <label>Check-in Date:</label>
        <input type="date" value={booking.checkIn} onChange={(e) => setBooking({ ...booking, checkIn: e.target.value })} required />

        <label>Check-out Date:</label>
        <input type="date" value={booking.checkOut} onChange={(e) => setBooking({ ...booking, checkOut: e.target.value })} required />

        <label>Number of Rooms:</label>
        <input type="number" value={booking.rooms} onChange={(e) => setBooking({ ...booking, rooms: parseInt(e.target.value) })} min="1" required />

        <button type="submit">Update Booking</button>
        <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
      </form>
    </div>
  );
};

export default UpdateBookingForm;
