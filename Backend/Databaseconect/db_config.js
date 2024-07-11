import mongoose from "mongoose";
const db_connection = async()=>{
    try {
        await mongoose.connect("mongodb+srv://2021cs445:mern@cluster0.5ciofni.mongodb.net/coin_saga?appName=Cluster0");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}
export default db_connection;