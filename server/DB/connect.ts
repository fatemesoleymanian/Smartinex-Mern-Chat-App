const mongoose = require("mongoose")

const connectToDB = (url: String) => {
    return mongoose.connect(url);
}

module.exports = connectToDB;