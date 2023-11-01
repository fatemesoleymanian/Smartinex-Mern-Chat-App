import { NextFunction, Response, Request } from "express"
const { UnauthorizedError } = require('../error')
const jwt = require('jsonwebtoken')

interface CustomRequest extends Request {
    user: {
        userId: string,
        name: string
    }
}
type userType = {
    userId: string,
    name: string
}
const auth = (req: CustomRequest, res: Response, next: NextFunction) => {


    const authHeader = req.headers["authorization"]

    if (!authHeader || !authHeader.startsWith('Bearer')) throw new UnauthorizedError('Authentication Invalid!');

    const token = authHeader.split(' ')[1];


    try {
        const payload: userType = jwt.verify(token, process.env.JWT_SECRET);
        const user: userType = { userId: payload.userId, name: payload.name }
        req.user = user;
        next();
    } catch (error) {

        throw new UnauthorizedError('Not authorized to access this route.')
    }
}

module.exports = auth;