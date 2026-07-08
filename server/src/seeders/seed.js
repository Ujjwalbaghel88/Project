import dotenv from "dotenv";
import { connect } from "mongoose";
dotenv.config();


const Seed = async () => {
    try {

        connectDB();

        
    } catch (error) {
        console.log(error.message);
        process.exit(1);


    }
};

Seed();