const express = require('express');
const PORT = 5000;
const cors = require('cors');
const authRouter = require('./routes/authRouter');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/api', userRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => console.log(`server started at port: ${PORT}`));