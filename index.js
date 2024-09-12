const express = require('express');
const userRouter = require('./routes/user.router');
require('dotenv').config();
const authRouter = require('./routes/authRouter');
const PORT = process.env.PORT || 4000;
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => console.log(`server started at port: ${PORT}`));