import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FlightCard from '../components/FlightCard';

const Home = () => {
  const [fromCity, setfromCity] = useState('');
  const [toCity, settoCity] = useState('');
  const [dateOfFlight, setdateOfFlight] = useState('');
  const [departureTime, setdepartureTime] = useState('');
  const [flights, setFlights] = useState([]);
  const [checkBookings, setCheckBookings] = useState(false);
  const [searchFlights, setsearchFlights] = useState(false);

  useEffect(() => {
    const getUser = () => {
      if (!localStorage.getItem('user')) {
        window.location.href = '/auth';
      }
    };

    getUser();
  }, [flights]);

  const getFlights = async () => {
    try {
      const response = await axios.get(
        'https://wild-cod-visor.cyclic.app/api/user/'
      );
      const { data } = response;
      setFlights(data);
    } catch (e) {
      const { response } = e;
      const { data } = response;
      if (data) {
        alert(data['message']);
      } else {
        alert('Something went wrong');
      }
    }
  };

  const handleSearchFlight = async (e) => {
    e.preventDefault();
    try {
      const [year, month, date] = dateOfFlight.split('-');
      const dateOfJourney = date + '/' + month + '/' + year;
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post(
        'https://wild-cod-visor.cyclic.app/api/user/search',
        {
          fromCity: fromCity,
          toCity: toCity,
          date: dateOfJourney,
          time: departureTime,
        },
        {
          headers: { authorization: `Bearer ${user['token']}` },
        }
      );
      setsearchFlights(true);
      setCheckBookings(false);
      const { data } = response;
      setFlights(data);
    } catch (e) {
      const { response } = e;
      const { data } = response;
      if (data) {
        alert(data['message']);
      } else {
        alert('Something went wrong');
      }
    }
  };

  const handleMyBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post(
        'https://wild-cod-visor.cyclic.app/api/user/mybookings',
        {
          userId: user['_id'],
        },
        {
          headers: { authorization: `Bearer ${user['token']}` },
        }
      );
      const { data } = response;
      console.log(data);
      setFlights(data);
      setCheckBookings(true);
      setsearchFlights(false);
    } catch (e) {
      const { response } = e;
      const { data } = response;
      if (data) {
        alert(data['message']);
      } else {
        alert('Something went wrong');
      }
    }
  };

  const handleBookNow = async (flightId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post(
        'https://wild-cod-visor.cyclic.app/api/user/bookticket',
        {
          userId: user['_id'],
          flightId: flightId,
        },
        {
          headers: { authorization: `Bearer ${user['token']}` },
        }
      );
      const { data } = response;
      alert(data['message']);
      handleReset();
    } catch (e) {
      const { response } = e;
      const { data } = response;
      if (data) {
        alert(data['message']);
      } else {
        alert('Something went wrong');
      }
    }
  };

  const handleReset = async () => {
    setsearchFlights(false);
    setCheckBookings(false);
    setfromCity('');
    settoCity('');
    setdateOfFlight('');
    setdepartureTime('');
    getFlights();
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/auth';
  };

  return (
    <div className="user-home">
      <div className="uh-left">
        <h1>Search for flights</h1>
        <form onSubmit={handleSearchFlight} className="add-flight">
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="fromCity">From City</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="fromCity"
                    id="fromCity"
                    required
                    value={fromCity}
                    onChange={(e) => setfromCity(e.target.value.toLowerCase())}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="toCity">To City</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="toCity"
                    id="toCity"
                    required
                    value={toCity}
                    onChange={(e) => settoCity(e.target.value.toLowerCase())}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="sdateOfJourney">Date of Journey</label>
                </td>
                <td>
                  <input
                    type="date"
                    name="dateOfJourney"
                    id="sdateOfJourney"
                    required
                    value={dateOfFlight}
                    onChange={(e) => setdateOfFlight(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="departureTime">Departure Time</label>
                </td>
                <td>
                  <input
                    type="time"
                    name="departureTime"
                    id="sdepartureTime"
                    required
                    value={departureTime}
                    onChange={(e) => setdepartureTime(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Search</button>
        </form>
        <div className="uh-btns">
          <button onClick={handleReset}>All Flights</button>
          <button onClick={handleMyBookings}>My Bookings</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="uh-right">
        {flights.length == 0 ? (
          <div>
            {checkBookings ? (
              <h1>No Recent Bookings</h1>
            ) : (
              <div>
                {searchFlights ? (
                  <h1> No Available Flights</h1>
                ) : (
                  <h1>Click all flights to view all available flligts</h1>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            {flights.map((e, idx) => {
              return (
                <FlightCard
                  key={idx}
                  data={e}
                  isUser
                  bookingsView={checkBookings}
                  handleBookNow={handleBookNow}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
