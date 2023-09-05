import mongoose, { Schema } from "mongoose";


const MessageSchema: Schema = new mongoose.Schema({
    isDeleted: {
        type: Boolean,
        default: false
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the sender.']
    },
    reciever: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    chat: {
        type: mongoose.Types.ObjectId,
        ref: 'Chat',
        required: [true, 'Please provide the chatId.']
    },
    content: {
        type: String,
        required: [true, 'Please provide message.']
    }
},
    {
        timestamps: true
    });
MessageSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

MessageSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

module.exports = mongoose.model('Message', MessageSchema);