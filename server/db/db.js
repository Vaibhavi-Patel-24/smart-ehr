import mongoose from "mongoose";

const connection = async (USERNAME , PASSWORD) =>{
    const URL = ''
    try {
        await mongoose.connect(URL)
        console.log('Main db connected successfully')
    } catch (error) {
        console.log('Error while connecting to DB',error)
    }
}

export default connection;