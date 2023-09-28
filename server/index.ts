require('dotenv').config();
require('express-async-errors');

import express, { Application, NextFunction, Request, Response, Errback } from 'express';
const app: Application = express();

const connectDB = require('./DB/connect')
const UserRouter = require('./routes/UserRouter');
app.use(express.json());

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