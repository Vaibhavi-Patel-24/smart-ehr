import express from 'express'

const PORT = 8000
const app = express();

// see in package.json
// to start for dev purposes use command: npm run dev
// for production grade command is : npm start
try{app.listen(PORT,()=>{
    console.log(`server running on port ${PORT} successfully`)
})} catch{console.log(`server failed`)}
