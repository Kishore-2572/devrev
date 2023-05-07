const Bookingmodel = require('../models/Bookingmodel');
const Flightmodel = require('../models/Flightmodel');
const { isAuth } = require('../util');
const userRouter = require('express').Router();

userRouter.get('/', async (req, res) => {
  try {
    const flights = await Flightmodel.find({});
    res.status(200).send(flights);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

userRouter.post('/search', async (req, res) => {
  try {
    const date = req.body.date;
    const time = req.body.time;
    const fromCity = req.body.fromCity;
    const toCity = req.body.toCity;
    var availableflights = await Flightmodel.find({
      $and: [{ fromCity: fromCity, toCity: toCity }],
    });
    if (date) {
      availableflights = availableflights.filter(
        (flight) => flight['dateOfJourney'] == date
      );
    }
    if (time) {
      availableflights = availableflights.filter(
        (flight) => flight['departureTime'] >= time
      );
    }
    res.status(200).send(availableflights);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

userRouter.post('/bookticket', isAuth, async (req, res) => {
  try {
    const userId = req.body.userId;
    const flightId = req.body.flightId;
    const flight = await Flightmodel.findOne({
      _id: flightId,
    });
    if (flight['seatsBooked'] == 60) {
      res.status(404).send({ message: 'No available seats' });
    } else {
      const book = await Bookingmodel.findOne({
        userId: userId,
        flightId: flightId,
      });
      if (!book) {
        flight['seatsBooked'] = flight['seatsBooked'] + 1;
        const updatedFlight = await flight.save();
        const booking = new Bookingmodel({
          userId: userId,
          flightId: flightId,
        });
        await booking.save();
        res.status(200).send({ message: 'seats booked' });
      } else {
        res.status(200).send({ message: 'Tickets has been Already booked' });
      }
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

userRouter.post('/mybookings', isAuth, async (req, res) => {
  try {
    const userId = req.body.userId;
    const bookings = await Bookingmodel.find({ userId: userId });
    const flightIds = [];
    bookings.forEach((booking) => flightIds.push(booking['flightId']));
    const flights = await Flightmodel.find({ _id: { $in: flightIds } });
    res.status(200).send(flights);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = userRouter;
