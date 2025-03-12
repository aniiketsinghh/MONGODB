import {DB_NAME} from "../constants.js";
import mongoose from "mongoose";

const connectDB= async()=>{
    try{
    const connectionINstance=await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`);
    console.log(`\n MONGODB got connected!! DB HOST: ${connectionINstance.connection.host}`);
    }
    catch(error){
        console.log("Connection failed!! :",error);
        process.exit(1);
    }
}

export default connectDB
