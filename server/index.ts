require('dotenv').config();

import express, { Application, Request, Response } from 'express';
const app: Application = express();


app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>You are testing this server!</h1>')

});

const port = process.env.PORT || 5000;


const server = app.listen(port, () => console.log(`Server is listening on port ${port}...`));