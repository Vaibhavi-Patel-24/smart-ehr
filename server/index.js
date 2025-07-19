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
    origin: '*', // Update to your frontend domain in prod
  },
})

global.io = io
global.onlineUsers = {} // Map of { hospitalId: socket.id }

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`)

  // Medical user registers with their hospitalId
  socket.on('register-medical', (hospitalId) => {
    global.onlineUsers[hospitalId] = socket.id
    console.log(`Registered medical (hospitalId: ${hospitalId}) with socket ${socket.id}`)
  })

  // SOS triggered by patient
  socket.on('sos-alert', async ({ patientId, location }) => {
    try {
      console.log(`Received SOS from ${patientId}:`, location)

      const patient = await Patient.findOne({ patientId })
      if (!patient) return

const { firstName = 'Unknown', middleName = '', lastName = '' } = patient

      const nearbyHospitals = await Hospital.find({
        location: {
          $near: {
            $geometry: location, // { type: 'Point', coordinates: [lng, lat] }
            $maxDistance: 20000,
          },
        },
      })

      console.log(`Found ${nearbyHospitals.length} nearby hospitals`)

      // Broadcast to registered medical users from nearby hospitals
      for (const hospital of nearbyHospitals) {
        const socketId = global.onlineUsers[hospital.hospitalId]
        
        if (socketId) {
          io.to(socketId).emit('sos-alert', {
            patientId,
            firstName,
            middleName,
            lastName,
            contact: patient.contact || 'N/A',
            location,
            timestamp: new Date().toISOString(),  
          })


          console.log(`Alert sent to ${hospital.hospitalId}`)
        }
      }

      // Also respond to the patient with nearby hospitals
      socket.emit('sos-alert', {
        hospitals: nearbyHospitals.map((h) => ({
          name: h.name,
          address: h.address,
          contact: h.contact,
          location: h.location,
        })),
      })
    } catch (err) {
      console.error('Error processing sos-alert:', err)
    }
  })

  // Cleanup on disconnect
  socket.on('disconnect', () => {
    for (const [hospitalId, sockId] of Object.entries(global.onlineUsers)) {
      if (sockId === socket.id) {
        delete global.onlineUsers[hospitalId]
        console.log(`Medical disconnected: ${hospitalId}`)
        break
      }
    }
  })
})

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
