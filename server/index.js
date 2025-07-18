import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/route.js'
import connection from './db/db.js'
import { Server } from 'socket.io'
import http from 'http'
import Patient from './models/patient.js'
import Hospital from './models/hospital.js' // ✅ add this


dotenv.config()

const PORT = process.env.PORT || 8000
const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

//search kari n joi leje niche nu mn nai khbr
app.use(express.json());
app.use(bodyParser.json({ extended:true}))
app.use(bodyParser.urlencoded({ extended:true}))

// routes throgh this
app.use('/',router)


// // see in package.json
// // to start for dev purposes use command: npm run dev
// // for production grade command is : npm start



// DB connection
const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD
connection(USERNAME, PASSWORD)

// Create HTTP server manually
const server = http.createServer(app)

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // adjust in production
  },
})

global.io = io
global.onlineUsers = {}

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`)

  // Register medical user
  socket.on('register-medical', (medicalId) => {
    global.onlineUsers[medicalId] = socket.id
    console.log(`Medical ${medicalId} registered with socket ${socket.id}`)
  })

  // SOS: receive patient location and broadcast to nearby hospitals
  socket.on('sos-alert', async ({ patientId, location }) => {
    try {
      console.log(`Received SOS from ${patientId}:`, location)

      // Optional: fetch patient details
      const patient = await Patient.findOne({ patientId })

      // Find nearby hospitals using GeoJSON $near
      const nearbyHospitals = await Hospital.find({
        location: {
          $near: {
            $geometry: location, // Must be GeoJSON: { type: 'Point', coordinates: [lng, lat] }
            $maxDistance: 20000, // 20km max radius
          },
        },
      })

      console.log(`Found ${nearbyHospitals.length} hospitals near SOS`)

      for (const hospital of nearbyHospitals) {
        const medicalSocketId = global.onlineUsers[hospital.hospitalId]
        if (medicalSocketId) {
          io.to(medicalSocketId).emit('sos-alert', {
            patientId,
            patientName: patient?.name || 'Unknown',
            location,
            timestamp: new Date(),
          })
          console.log(`SOS alert sent to ${hospital.hospitalId}`)
        }
      }
    } catch (err) {
      console.error('Error handling sos-location:', err)
    }
  })

  socket.on('disconnect', () => {
    for (const [id, sockId] of Object.entries(global.onlineUsers)) {
      if (sockId === socket.id) {
        delete global.onlineUsers[id]
        console.log(`Medical ${id} disconnected`)
        break
      }
    }
  })
})

// Start server
try {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
} catch {
  console.log('Server failed to start')
}
