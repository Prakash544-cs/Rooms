import { LowSync } from 'lowdb';
import { JSONFileSync } from "lowdb/node";

type Booking = {
  id: number;
  hotelId: string;
  userId: number;
  checkIn: string;
  checkOut: string;
  rooms: number;
};

type Database = {
  bookings: Booking[];
};

const defaultData: Database = { bookings: [] };


const adapter = new JSONFileSync<Database>("db.json");
const db = new LowSync(adapter, defaultData);


db.read();
db.data ||= defaultData; 
db.write();


export default db;
