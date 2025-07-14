import express from 'express'
import router from './routes/route.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import cors from'cors'

dotenv.config()

const PORT = process.env.PORT || 8000
const app = express();

app.use(cors())

//search kari n joi leje niche nu mn nai khbr
app.use(express.json());
app.use(bodyParser.json({ extended:true}))
app.use(bodyParser.urlencoded({ extended:true}))

// routes throgh this
app.use('/',router)

// see in package.json
// to start for dev purposes use command: npm run dev
// for production grade command is : npm start
try{
    app.listen(PORT,()=>{
    console.log(`server running on port ${PORT} successfully`)})
} 
catch{console.log(`server failed to start`)}
