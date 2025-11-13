import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import userRouter from './routers/userRouter.js';

let app = express();

mongoose.connect("mongodb+srv://Eshika:1234@cluster0.hnmmeom.mongodb.net/?appName=Cluster0").then(
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


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});