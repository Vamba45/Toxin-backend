const express = require('express');
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/user.router');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRouter);
app.use('/', authRouter);

app.listen(PORT, () => console.log(`server started at port: ${PORT}`));