const mongoose = require('mongoose');
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const conn = async () => {
    try {
        const dbConnect = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.ulrfa6n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

        console.log(`MongoDB connected: ${dbConnect.connection.host}`);
        return dbConnect;
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

conn();

module.exports = conn;