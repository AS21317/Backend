const mongoose = require('mongoose');
const dotenv = require('dotenv');
const createError = require('http-errors');
dotenv.config();
const secret = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(secret, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
}
);
mongoose.connection.on('error', (err) => {
    console.log(err.message);
}
);
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected');
}
);
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
}
);

module.exports = connectDB;

