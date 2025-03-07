import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/manageBookings.scss";

interface Booking {
  id: number;
  hotelId: number;
  userId: number;
  checkIn: string;
  checkOut: string;
  rooms: number;
}

interface Hotel {
  id: number;
  name: string;
  location: string;
}

const ManageBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all bookings
    axios
      .get("http://localhost:5000/api/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch(() => setError("Failed to fetch bookings"));

    // Fetch all hotels to match hotelId with hotel name
    axios
      .get("http://localhost:5000/api/hotels")
      .then((response) => {
        setHotels(response.data);
      })
      .catch(() => setError("Failed to fetch hotels"));

    setLoading(false);
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert("Failed to delete booking.");
    }
  };

  // Function to get hotel name from hotelId
  const getHotelName = (hotelId: number) => {
    const hotel = hotels.find((h) => h.id === hotelId);
    return hotel ? hotel.name : "Unknown Hotel";
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="manage-bookings-container">
      <h2>My Bookings</h2>

      {bookings.length > 0 ? (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <li key={booking.id} className="booking-card">
              <p><strong>Hotel:</strong> {getHotelName(booking.hotelId)}</p>
              <p><strong>Check-in:</strong> {booking.checkIn}</p>
              <p><strong>Check-out:</strong> {booking.checkOut}</p>
              <p><strong>Rooms:</strong> {booking.rooms}</p>

              <Link to={`/update-booking/${booking.id}`}>
                <button className="edit-button">Edit</button>
              </Link>
              <button className="delete-button" onClick={() => handleDelete(booking.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default ManageBookings;
