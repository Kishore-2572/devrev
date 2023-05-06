const mongoose = require('mongoose');

const FlightSchema = mongoose.Schema(
  {
    flightName: { type: String, required: true },
    flightNumber: { type: String, required: true },
    fromCity: { type: String, required: true },
    toCity: { type: String, required: true },
    dateOfJourney: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    departureTime: { type: String, required: true },
    journeyHours: { type: String, required: true },
    price: { type: String, required: true },
    seatsBooked: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Flights', FlightSchema);
