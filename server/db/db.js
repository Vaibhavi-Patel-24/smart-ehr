import mongoose from "mongoose";

const connection = async (USERNAME , PASSWORD) =>{
    const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@citysupport.5pflg.mongodb.net/?retryWrites=true&w=majority&appName=CITYSUPPORT`
    try {
        await mongoose.connect(URL)
        console.log('Main db connected successfully')
    } catch (error) {
        console.log('Error while connecting to DB',error)
    }
}

export default connection;