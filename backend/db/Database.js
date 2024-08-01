import mongoose from "mongoose";

const connectDatabase = async () => {
    await mongoose.connect(process.env.MONGO_URL).then((data) => {
    console.log(`MongoDb connected with server: ${data.connection.host}`.bgCyan.white);
    });
};

export default connectDatabase;
