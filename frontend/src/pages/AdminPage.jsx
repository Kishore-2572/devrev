import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FlightCard from '../components/FlightCard';
import UserCard from '../components/UserCard';

const AdminPage = () => {
  const [flightName, setflightName] = useState('');
  const [flightNumber, setflightNumber] = useState('');
  const [fromCity, setfromCity] = useState('');
  const [toCity, settoCity] = useState('');
  const [dateOfFlight, setdateOfFlight] = useState('');
  const [departureTime, setdepartureTime] = useState('');
  const [arrivalTime, setarrivalTime] = useState('');
  const [price, setprice] = useState('');
  const [flights, setFlights] = useState(null);
  const [sflightNumber, setSflightNumber] = useState('');
  const [sdepartureTime, setSdepartureTime] = useState('');
  const [sdateOfFlight, setSdateOfFlight] = useState('');
  const [checkBookings, setCheckBookings] = useState(false);
  const [flightDetails, setFlightDetails] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getUser = () => {
      if (!localStorage.getItem('user')) {
        window.location.href = '/adminlogin';
      }
    };
    const getFlights = async () => {
      try {
        const response = await axios.get(
          'https://wild-cod-visor.cyclic.app/api/admin/'
        );
        const { data } = response;
        setFlights(data);
        // console.log(data);
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
    getUser();
    getFlights();
  }, [flights]);

  const handleAddFlight = async (e) => {
    e.preventDefault();
    const [year, month, date] = dateOfFlight.split('-');
    const dateOfJourney = date + '/' + month + '/' + year;
    if (fromCity == toCity) {
      alert('Invalid Cities');
      return;
    }
    var time1 = new Date('1970-01-01T' + departureTime + 'Z').getTime();
    var time2 = new Date('1970-01-01T' + arrivalTime + 'Z').getTime();
    var diffSeconds = Math.abs((time2 - time1) / 1000);
    var hours = Math.floor(diffSeconds / 3600);
    var minutes = Math.floor((diffSeconds % 3600) / 60);
    const journeyHours = hours + ' hrs ' + minutes + ' minutes';
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post(
        'https://wild-cod-visor.cyclic.app/api/admin/addflight',
        {
          flightName,
          flightNumber,
          fromCity,
          toCity,
          dateOfJourney,
          departureTime,
          arrivalTime,
          journeyHours,
          price,
        },
        {
          headers: { authorization: `Bearer ${user['token']}` },
        }
      );
      alert('flight added successfully');
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
      const [year, month, date] = sdateOfFlight.split('-');
      const dateOfJourney = date + '/' + month + '/' + year;
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post(
        'https://wild-cod-visor.cyclic.app/api/admin/search',
        {
          flightNumber: sflightNumber,
          dateOfJourney,
          departureTime: sdepartureTime,
        },
        {
          headers: { authorization: `Bearer ${user['token']}` },
        }
      );
      const { data } = response;
      setFlightDetails(data['flightDetails']);
      setUsers(data['userDetails']);
      setCheckBookings(true);
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

  const handleDelete = async (flightId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.delete(
        `https://wild-cod-visor.cyclic.app/api/admin/${flightId}`,
        {
          headers: { Authorization: `Bearer ${user['token']}` },
        }
      );
      alert('Successfully Deleted');
      setFlights(null);
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
  const handleReset = () => {
    setCheckBookings(false);
    setSflightNumber('');
    setSdateOfFlight('');
    setSdepartureTime('');
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/adminlogin';
  };

  return (
    <div className="adminpage">
      <div className="ap-add-flight">
        <h1>Add Flight</h1>
        <form onSubmit={handleAddFlight} className="add-flight">
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="flightName">Flight Name</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="flightName"
                    id="flightName"
                    required
                    onChange={(e) => setflightName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="flightNumber">Flight Number</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="flightNumber"
                    id="flightNumber"
                    required
                    onChange={(e) => setflightNumber(e.target.value)}
                  />
                </td>
              </tr>
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
                    onChange={(e) => settoCity(e.target.value.toLowerCase())}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="dateOfJourney">Date of Journey</label>
                </td>
                <td>
                  <input
                    type="date"
                    name="dateOfJourney"
                    id="dateOfJourney"
                    required
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
                    id="departureTime"
                    required
                    onChange={(e) => setdepartureTime(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="arrivalTime">Arrival Time</label>
                </td>
                <td>
                  <input
                    type="time"
                    name="arrivalTime"
                    id="arrivalTime"
                    required
                    onChange={(e) => setarrivalTime(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="price">Ticket Fare $</label>
                </td>
                <td>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    required
                    onChange={(e) => setprice(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit"> Add </button>
        </form>
        <h1>View Bookings For Flight</h1>
        <form onSubmit={handleSearchFlight} className="add-flight">
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="sflightNumber">Flight Number</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="flightNumber"
                    id="sflightNumber"
                    required
                    value={sflightNumber}
                    onChange={(e) => setSflightNumber(e.target.value)}
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
                    value={sdateOfFlight}
                    onChange={(e) => setSdateOfFlight(e.target.value)}
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
                    value={sdepartureTime}
                    onChange={(e) => setSdepartureTime(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Search</button>
        </form>
        <div className="ad-btns">
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
      <div className="flight-list">
        {checkBookings ? (
          <div>
            <FlightCard data={flightDetails} />
            <h1>User Details</h1>
            {users &&
              users.map((e, idx) => {
                return <UserCard data={e} key={idx} />;
              })}
          </div>
        ) : (
          <div>
            {' '}
            {flights &&
              flights.map((e, idx) => {
                return (
                  <FlightCard
                    key={idx}
                    data={e}
                    isAdmin
                    handleDelete={handleDelete}
                  />
                );
              })}{' '}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
