const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const core = require('cors');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminroutes');

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT || 3000, () =>
      console.log(`DB connected & Server started`)
    );
  })
  .catch((e) => console.log(e));

app.use(express.json());
app.use(core());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
