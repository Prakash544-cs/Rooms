import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import HotelList from "./HotelList";

jest.mock("axios"); // Mock axios globally

describe("HotelList Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    console.log = jest.fn((message) => process.stdout.write(message + "\n")); // Force logs
  });
  
  it("fetches and displays hotels", async () => {
    const mockHotels = [
      { id: 1, name: "Hotel Paradise", location: "New York", rooms: 5 },
      { id: 2, name: "Ocean View", location: "California", rooms: 10 }
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockHotels });

    render(<HotelList />);
    console.log("Waiting for UI update...");
    expect(axios.get).toHaveBeenCalledWith("http://localhost:5000/api/hotels");

     expect(await screen.findByText("Hotel Paradise")).toBeInTheDocument();
    // console.log("Checking for Hotel Paradise...");
    // expect(await screen.findByText("Ocean View")).toBeInTheDocument();
    // console.log("Checking for Ocean View...");
  });
});
