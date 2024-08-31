import mongoose from 'mongoose';

export const connectDataBase = async () => {
    try {
        console.log("mongo_uri: ", process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error conection to MongoDB: ", error.message)
        process.exit(1) // failure
    }
}