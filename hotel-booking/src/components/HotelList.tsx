import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import "../styles/hotelList.scss";


interface Hotel {
  id: number;
  name: string;
  location: string;
  rooms ?: number;
}

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [location, setLocation] = useState("");

  // const [error, setError] = useState(false);

  // if (error) {
  //   throw new Error("Test error in HotelList component!");
  // }

  useEffect(() => {
    axios.get("http://localhost:5000/api/hotels")
      .then((response) => {
        setHotels(response.data)
        console.log("Fetched Hotels:", response.data);
        setFilteredHotels(response.data); 
       })
      .catch(error => console.error("Error fetching hotels:", error));
  }, []);

  
  const handleFilter = () => {
    if (location.trim() === "") {
         axios.get("http://localhost:5000/api/hotels")
        .then((response) => {
          setFilteredHotels(response.data);
        })
        .catch(error => console.error("Error fetching hotels:", error));
    } else {
           axios.get(`http://localhost:5000/api/hotels?location=${location}`)
        .then((response) => {
          setFilteredHotels(response.data);
        })
        .catch(error => console.error("Error fetching hotels:", error));
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  
    if (e.target.value.trim() === "") {
        axios.get("http://localhost:5000/api/hotels")
        .then((response) => {
        
          setFilteredHotels(response.data);
        })
        .catch(error => console.error("Error fetching hotels:", error));
    }
  };
  

  return (
    <div className="hotel-list-container">
      <h2 className="hotel-list-title">Available Hotels</h2>
      {/* <button onClick={() => setError(true)}>Simulate Error</button> */}
      <div className="hotel-filter">
        <input type="text" placeholder="Filter by location..." value={location}
            onChange={handleInputChange} className="hotel-input" />
       <button onClick={handleFilter} className="hotel-button">Search</button>
      </div>
      
      <div className="hotel-list">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <h3>{hotel.name}</h3>
              <p><strong>Location:</strong> {hotel.location}</p>
              <p><strong>Room Available:</strong> {hotel.rooms}</p>
              <Link to={`/book`}>
              <button className="book-now-button">Book Now</button>
              </Link>
              </div>
          ))
        ): (
          <p className="no-hotels">No hotels Available</p>
        )}
      </div>
    </div>
  );
};

export default HotelList;
