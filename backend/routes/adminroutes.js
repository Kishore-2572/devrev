const Flightmodel = require('../models/Flightmodel');
const Bookingmodel = require('../models/Bookingmodel');
const { isAuth } = require('../util');
const Usermodel = require('../models/Usermodel');

const adminRouter = require('express').Router();

adminRouter.get('/', async (req, res) => {
  try {
    const flights = await Flightmodel.find({});
    res.status(200).send(flights);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

adminRouter.post('/addflight', isAuth, async (req, res) => {
  try {
    const flightName = req.body.flightName;
    const flightNumber = req.body.flightNumber;
    const fromCity = req.body.fromCity;
    const toCity = req.body.toCity;
    const dateOfJourney = req.body.dateOfJourney;
    const arrivalTime = req.body.arrivalTime;
    const journeyHours = req.body.journeyHours;
    const departureTime = req.body.departureTime;
    const price = req.body.price;

    const flight = await Flightmodel.findOne({
      $and: [
        { flightNumber: flightNumber },
        { fromCity: fromCity },
        { toCity: toCity },
        { dateOfJourney: dateOfJourney },
        { departureTime: departureTime },
      ],
    });
    if (flight) {
      res.status(404).send('Already added flight');
    } else {
      const validFlight = new Flightmodel({
        flightName: flightName,
        flightNumber: flightNumber,
        fromCity: fromCity,
        toCity: toCity,
        dateOfJourney: dateOfJourney,
        departureTime: departureTime,
        arrivalTime: arrivalTime,
        journeyHours: journeyHours,
        price: price,
      });
      const newFlight = await validFlight.save();
      res.status(200).send(newFlight);
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

adminRouter.delete('/deleteflight/:flightId', isAuth, async (req, res) => {
  try {
    const flightid = req.params.flightId;

    const flight = await Flightmodel.findOne({ _id: flightid });
    if (flight) {
      await Flightmodel.deleteOne({ _id: flightid });
      res.status(200).send({ message: 'Flight removed successfully' });
    } else {
      res.status(404).send({ message: 'No such flight found' });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

adminRouter.post('/checkflight', isAuth, async (req, res) => {
  try {
    const flightNumber = req.body.flightNumber;
    const dateOfJourney = req.body.dateOfJourney;
    const departureTime = req.body.departureTime;


    const flight = await Flightmodel.findOne({
      $and: [
        { flightNumber: flightNumber },
        { dateOfJourney: dateOfJourney },
        { departureTime: departureTime },
      ],
    });
    if (flight) {
      const flightID = flight['_id'];
      const bookings = await Bookingmodel.find({ flightId: flightID });
      const userIds = [];
      bookings.forEach((booking) => userIds.push(booking['userId']));
      const users = await Usermodel.find({ _id: { $in: userIds } });
      res.status(200).send({ flightDetails: flight, userDetails: users });
    } else {
      res
        .status(404)
        .send({ message: 'No flights were found with given details' });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = adminRouter;
