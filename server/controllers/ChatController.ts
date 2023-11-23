import { Response, Request } from 'express';
const ChatModel = require('../models/ChatModel')
const UserModel = require('../models/UserModel')
const MessageModel = require('../models/MessageModel')
const { StatusCodes } = require('http-status-codes');

interface CustomRequest extends Request {
    user: {
        userId: string,
        name: string
    }
}

const fetchChats = async (req: CustomRequest, res: Response) => {
    try {

        ChatModel.find({ users: { $elemMatch: { $eq: req.user.userId } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("lastMessage")
            .sort({ updatedAt: -1 })
            .then(async (results: any) => {
                results = await UserModel.populate(results, {
                    path: "lastMessage.sender",
                    select: "name email"
                });
                res.status(StatusCodes.OK).send(results);
            })
    } catch (error: any) {
        res.status(StatusCodes.BadRequest);
        throw new Error(error.message)
    }

}

const accessChat = async (req: CustomRequest, res: Response) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            msg: "User is not specified!"
        });
    }

    let isChat = ChatModel.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user.userId } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    })
        .populate("users", "-password")
        .populate("lastMessage");

    isChat = await UserModel.populate(isChat, {
        path: "lastMessage.sender",
        select: "name email"
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    }
    else {
        let chatData = {
            name: `${req.body.name} & ${req.user.name}`,
            isGroupChat: false,
            users: [req.user.userId, userId]
        }
        try {

            const createdChat = await ChatModel.create(chatData);
            const fullChat = await ChatModel.findOne({ _id: createdChat._id }).populate(
                "users", "-password"
            );
            res.status(StatusCodes.OK).send(fullChat)
        }
        catch (error: any) {
            return res.status(400).json({ success: false, msg: 'User id needed!' })

        }
    }
}

const fetchGroupChats = async (req: CustomRequest, res: Response) => {

    try {

        const allGroups = await ChatModel.where("isGroupChat").equals(true);
        res.status(StatusCodes.OK).send(allGroups)
    }
    catch (error: any) {
        res.status(StatusCodes.BadRequest);
        throw new Error(error.message)

    }

}

const createGroupChat = async (req: CustomRequest, res: Response) => {

    if (!req.body.name) {
        return res.status(StatusCodes.BAD_REQUEST).send({ message: "name of the group nedded!" })
    }
    console.log(req.body)
    let users = JSON.parse(req.body.users)

    try {

        const groupChat = await ChatModel.create({
            name: req.body.name,
            users: users,
            groupAdmin: req.user.userId,
            isGroupChat: true
        })
        const fullGroupChat = await ChatModel.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin");
        res.status(StatusCodes.OK).send(fullGroupChat)
    }
    catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error(error.message)
    }
}

const leaveGroupOrClearChat = async (req: Request, res: Response) => {

    const { userId, chatId } = req.body
    const isAChat = await ChatModel.findById(chatId)


    if (isAChat.isGroupChat) {
        const removed = await ChatModel.findByIdAndUpdate(chatId, {
            $pull: {
                users: userId
            },
        },
            {
                new: true
            })
            .populate("users", "-password").populate("groupAdmin", "-password");

        if (!removed) {
            res.status(StatusCodes.BadRequest)
            throw new Error("Chat not found")
        }
        else {
            res.status(StatusCodes.OK).send(removed)
        }
    }
    else {
        const removed = await MessageModel.deleteMany({ chat: chatId });
        if (!removed) {
            res.status(StatusCodes.BadRequest)
            throw new Error("Chat not found")
        }
        else {
            res.status(StatusCodes.OK).send(removed)
        }
    }

}

const addToGroup = async (req: Request, res: Response) => {
    const { userId, chatId } = req.body

    const added = await ChatModel.findByIdAndUpdate(chatId, {
        $push: {
            users: userId
        },
    },
        {
            new: true
        })
        .populate("users", "-password").populate("groupAdmin", "-password");

    if (!added) {
        res.status(StatusCodes.BadRequest)
        throw new Error("Chat not found")
    }
    else {
        res.status(StatusCodes.OK).send(added)
    }

}

module.exports = {
    accessChat,
    fetchChats,
    fetchGroupChats,
    leaveGroupOrClearChat,
    createGroupChat,
    addToGroup
}