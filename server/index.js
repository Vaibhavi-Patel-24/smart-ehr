import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/route.js'
import connection from './db/db.js'
import { Server } from 'socket.io'
import http from 'http'
import Patient from './models/patient.js'
import Hospital from './models/hospital.js'

dotenv.config()

const PORT = process.env.PORT || 8000
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/', router)

// DB connection
const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD
connection(USERNAME, PASSWORD)

// Create HTTP server manually
const server = http.createServer(app)

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // In production, specify your frontend domain
  },
})

global.io = io
global.onlineUsers = {}

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`)

  // Register medical user by hospitalId
  socket.on('register-medical', (medicalId) => {
    global.onlineUsers[medicalId] = socket.id
    console.log(`Medical ${medicalId} registered with socket ${socket.id}`)
  })

  // SOS: receive patient location and broadcast to nearby hospitals
  socket.on('sos-alert', async ({ patientId, location }) => {
    try {
      console.log(`Received SOS from ${patientId}:`, location)

      // Fetch patient details
      const patient = await Patient.findOne({ patientId })

      // Find nearby hospitals using GeoJSON
      const nearbyHospitals = await Hospital.find({
        location: {
          $near: {
            $geometry: location, // { type: 'Point', coordinates: [lng, lat] }
            $maxDistance: 20000, // 20km radius
          },
        },
      })

      console.log(`Found ${nearbyHospitals.length} hospitals near SOS`)

      // 1. Send to all registered medicals
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
    // 2. Also respond back to the patient with the hospital list
    socket.emit('sos-alert', {
        hospitals: nearbyHospitals.map(h => ({
            name: h.name,
            address: h.address,
            contact: h.contact,
            location: h.location,
        })),
    })
    console.log(nearbyHospitals)
    } catch (err) {
      console.error('Error handling sos-location:', err)
    }
  })

  // Handle disconnect
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
} catch (error) {
  console.error('Server failed to start:', error)
}
