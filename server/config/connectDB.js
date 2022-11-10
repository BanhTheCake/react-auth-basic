const mongoose = require('mongoose');
const { env } = require('../utils/variables')

const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'auth-basic',
        });
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB