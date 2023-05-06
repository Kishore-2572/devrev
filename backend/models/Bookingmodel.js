const mongoose = require('mongoose');

const Bookingmodel = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bookings', Bookingmodel);
