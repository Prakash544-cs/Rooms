import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";
import HotelList from "./components/HotelList";
import BookingForm from "./components/BookingForm";
import ManageBookings from "./components/ManageBookings";
import UpdateBookingForm from "./components/UpdateBookingForm";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/styles.scss";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className='header'>
      <h1 className='logo'>Hotel Booking</h1>
      <div className='nav-buttons'>
      <button className='button' onClick={() => navigate("/hotels")}>List of Hotels</button>
        <button className='button' onClick={() => navigate("/book")}>Book a Room</button>
        <button className='button' onClick={() => navigate("/my-bookings")}>My Bookings</button>
      </div>
    </header>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className='home-page'>
      <h2>Welcome to Hotel Booking</h2>
      <p>Find the best hotels manage booking with ease</p>
    </div>
  )
}
const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/book" element={<BookingForm/>} />
        <Route path="/update-booking/:id" element={<UpdateBookingFormWrapper />} />
        <Route path="/my-bookings" element={<ManageBookings />} />
      </Routes>
      </ErrorBoundary>
    </Router>
  );
};

const UpdateBookingFormWrapper: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); 
  if (!id) {
    return <p>Error: Invalid Booking ID</p>;
  }
  return <UpdateBookingForm bookingId={parseInt(id, 10)} onClose={() => window.history.back()} />;
};
export default App;
