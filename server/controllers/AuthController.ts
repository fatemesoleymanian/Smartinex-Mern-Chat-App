import { Response, Request } from "express";
const UserModel = require('../models/UserModel')
const { BadRequestError, UnauthorizedError } = require("../error")

const login = async (req: Request, res: Response) => {
    const { name, password } = req.body
    if (!name || !password) {
        throw new BadRequestError("Please provide username and password!")
    }

    const user = await UserModel.findOne({ name });

    if (!user) { throw new UnauthorizedError("There is no user with such username!") }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) { throw new UnauthorizedError("Invalid password!") }

    const token = user.createJWT();

    res.status(200).json({
        user: {
            name: user.getName(),
            email: user.getEmail(),
            _id: user._id
        },
        token
    })


}

const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        throw new BadRequestError("Please provide required fields!")
    }
    const user = await UserModel.create({ ...req.body })

    const token = user.createJWT();

    res.status(201).json({
        user: {
            name: user.getName(),
            email: user.getEmail(),
            _id: user._id
        },
        token
    })

}

module.exports = {
    login,
    signup
}