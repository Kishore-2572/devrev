import React from 'react';

const FlightCard = ({
  data,
  isAdmin,
  handleDelete,
  isUser,
  handleBookNow,
  bookingsView,
}) => {
  return (
    <div className="flight-card">
      <div className="fc-header">
        <h3>{data['flightName']}</h3>
        <h3>{data['flightNumber']}</h3>
      </div>
      <div className="fc-city">
        <div className="fc-fc">
          {' '}
          <h5>
            {data['fromCity'].charAt(0).toUpperCase() +
              data['fromCity'].slice(1)}
          </h5>
          <p>{data['departureTime']} </p>
        </div>
        <div className="jh">
          <p> {data['journeyHours']} </p>
          <hr />
        </div>
        <div className="fc-tc">
          {' '}
          <h5>
            {data['toCity'].charAt(0).toUpperCase() + data['toCity'].slice(1)}
          </h5>
          <p>{data['arrivalTime']} </p>{' '}
        </div>
      </div>
      <div className="fc-date">
        <h5>Date : {data['dateOfJourney']}</h5>

        <h5> Fare : $ {data['price']} </h5>
        <div>
          <h5>Available Seats : </h5>
          <p>{60 - data['seatsBooked']}</p>
        </div>
        {isAdmin && (
          <button onClick={() => handleDelete(data['_id'])}>Delete</button>
        )}
        {isUser && !bookingsView && (
          <button
            className={60 - data['seatsBooked'] == 0 ? 'disabled' : ''}
            onClick={() => handleBookNow(data['_id'])}
          >
            {' '}
            Book Now{' '}
          </button>
        )}
      </div>
    </div>
  );
};

export default FlightCard;
