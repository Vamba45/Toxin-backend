const express = require('express');
const userRouter = require('./routes/user.router');
const authRouter = require('./routes/authRouter');
const PORT = 5050;
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRouter);
app.use('/registration', authRouter);

app.listen(PORT, () => console.log(`server started at port: ${PORT}`));