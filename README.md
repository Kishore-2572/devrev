# Flight Booking Api

## Tech Stacks
  MERN (MongoDB, Express, React, NodeJS)

### To run this
```
cd backend 
npm install
node server.js

cd frontend
npm install
npm start
```

Frontend is hosted in [onrender](https://render.com/)  - [Frontend Link](https://devrev.onrender.com/)

Backend is hosted in [cyclic.sh](https://app.cyclic.sh/#/)  - [Backend Link](https://wild-cod-visor.cyclic.app/)

## Endpoint for Backend

(Auth) - Refers to only accessed by authenticated users

- ### /api/user
    * GET('/') - To get all flights details
    * POST('/search') - To get flights based on the search using fromCity, toCity,  date and time
    * POST('/bookticket') - To book the ticket for user (Auth)
    * POST('/mybookings') - To view all booking made by that user (Auth)
- ### /api/admin
    * GET('/') - To get all flights details
    * POST('/addflight') - To add new Flight in DB (Auth)
    * DELETE('/:flightId') - To remove flight from the DB (Auth) (NOTE : flightId here is dynamic)
    * POST('/search') - To search flights based on the fields such as flight number, date of Journey and time (Auth)
- ### /api/auth
    * POST('/signup') - To SignUp the new user
    * POST('/login') - To login a existing user
    * POST('/adminlogin') - To login a admin

While Authenticating **Jsonwebtoken(JWT)** is used and it is used to verify a valid authenticated user while api request

## Frontend

For frontend basic UI has been used as it focus majorly on backend

### User
  * [Authentication Page](https://devrev.onrender.com/auth) - contains both SignUp and SignIn Form
  * [Home Page](https://devrev.onrender.com/) - A form for searching flights and buttons for checking all available flights, to see history of bookings and logout. A list of flights based on user action
### Admin
  * [AdminLogin Page](https://devrev.onrender.com/adminlogin) - To authenticate the admin, a simple login form
  * [AdminHome Page](https://devrev.onrender.com/admin) - A form for adding new flights to DB, A form for checking users bookings who booked a particular flight and a button for reset action. A list of flights and flights bookings list based on admin action


