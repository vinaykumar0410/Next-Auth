
import mongoose from "mongoose";

export async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log('connected to mongodb');
        })

        connection.on('error',(error)=>{
            console.log('something went wrong reason - ' + error);
            process.exit;
        })
    } catch (error) {
        console.log('something went wrong');
        console.log(error);
        
    }
}