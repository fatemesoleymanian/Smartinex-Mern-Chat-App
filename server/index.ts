require('dotenv').config();
require('express-async-errors');

import express, { Application, NextFunction, Request, Response, Errback } from 'express';
const app: Application = express();

const connectDB = require('./DB/connect')
const UserRouter = require('./routes/UserRouter');
const ChatRouter = require('./routes/ChatRouter');
const MessageRouter = require('./routes/MessageRouter');

app.use(express.json());

const cors = require('cors')



app.use(cors({
    origin: "*"
})); // Use this after the variable declaration

const errorHandling = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).json({
        msg: err.message,
        success: false,
    });
};


app.get('/', (req: Request, res: Response) => {
    res.send('<h1>You are testing this server!</h1>')

});

app.use('/api/user', UserRouter);
app.use('/api/chat', ChatRouter);
app.use('/api/message', MessageRouter)


app.use(errorHandling)

const port = process.env.PORT || 5000;

const start = async () => {

    try {

        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error)
    }
}


start();