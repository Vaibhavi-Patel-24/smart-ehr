import express from 'express'

const PORT = 8000
const app = express();

try{app.listen(PORT,()=>{
    console.log(`server running on port ${PORT} successfully`)
})} catch{console.log(`server failed`)}
