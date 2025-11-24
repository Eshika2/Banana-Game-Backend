import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from './routers/userRouter.js';

let app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(
    ()=>{
        console.log('Connected to Database');
    }
).catch(
    ()=>{
        console.log('Connection to Database failed');
    }
)

app.use(bodyParser.json());
app.use(cors());


app.use('/api/user', userRouter);


app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
});