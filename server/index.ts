require('dotenv').config();
require('express-async-errors');

import express, { Application, NextFunction, Request, Response, Errback } from 'express';
import { Server } from 'socket.io';
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



try {
    connectDB(process.env.MONGO_URI)
} catch (error) {
    console.log(error)
}

const server = app.listen(port, () =>
    console.log(`Server is listening on port ${port}...`)
);

const io = new Server(server, {
    cors: {
        origin: "*"
    },
    pingTimeout: 60000
});

io.on("connection", (socket) => {
    console.log("connection is established...");

    socket.on("setup", (user) => {
        socket.join(user._id);
        socket.emit("connected");
        console.log("user " + user._id + " connected...")
    });

    socket.on("join chat", (room) => {
        socket.join(room)
        console.log("room " + room + " joined...")
    });

    socket.on("new message", (newMessageStatus) => {
        let chat = newMessageStatus.data.chat;
        if (!chat.users) {
            return console.log("chat.users not defiened!")
        }

        chat.users.forEach((user: { _id: string | string[]; }) => {
            if (user._id == newMessageStatus.data.sender._id) return;
            socket.in(user._id).emit("message received")
        })
    })

})
