import mongoose, { Schema } from "mongoose";



const UserSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name.'],
        unique: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide email.'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ]
    },
    password: {
        type: String,
        required: [true, 'Please provide password.'],
        minlength: 6,
        maxlength: 16,
    }
}, {
    timestamps: true
}
)


module.exports = mongoose.model('User', UserSchema);