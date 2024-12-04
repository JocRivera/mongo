import  mongoose  from "mongoose";
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log('Error in dbConnection', error)
    }
}
export default dbConnection;