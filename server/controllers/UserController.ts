import { Request, Response } from "express"
const UserModel = require('../models/UserModel')
const { StatusCodes } = require("http-status-codes")
interface CustomRequest extends Request {
    user: {
        userId: string,
        name: string
    }
}

const index = async (req: CustomRequest, res: Response) => {

    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ]

        } : {};

    const users = await UserModel.find(keyword)
        .find({
            _id: { $ne: req.user.userId }
        });

    res.status(StatusCodes.OK).json({ users })
}

module.exports = { index }