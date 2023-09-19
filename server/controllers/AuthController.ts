import { Response, Request } from "express";
const UserModel = require('../models/UserModel')


const login = async (req: Request, res: Response) => {
    const { name, password } = req.body
    if (!name || !password) {
        return res.status(400).send("please provide required fields!")
    }

    const user = await UserModel.findOne({ name });

    if (!user) { return res.send("There is no user with such username!") }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) { return res.send("Invalid password!") }

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
        return res.status(404).send("please provide required fields!");
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