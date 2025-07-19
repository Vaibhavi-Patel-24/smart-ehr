import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import NotificationCard from '../../components/medical/NotificationCard.medical'
import moment from 'moment'

// 👇 Socket instance
const socket = io("http://localhost:8000")

const Notification = () => {
  const [alerts, setAlerts] = useState([])

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      )
      const data = await response.json()
      return data.display_name || `Lat: ${lat}, Lng: ${lng}`
    } catch (error) {
      console.error("Geocode error:", error)
      return `Lat: ${lat}, Lng: ${lng}`
    }
  }

  useEffect(() => {
    const hospitalId = sessionStorage.getItem("hospitalId")

    if (hospitalId) {
      socket.emit("register-medical", hospitalId)
      console.log("✅ Registered hospitalId with socket:", hospitalId)
    } else {
      console.warn("❌ hospitalId not found in sessionStorage")
    }

    socket.on("sos-alert", async (data) => {
      const readableTime = moment(data.timestamp).fromNow()

      // ✅ Extract coordinates
      const lat = data?.location?.coordinates?.[1]
      const lng = data?.location?.coordinates?.[0]

      let locationAddress = "Unknown location"
      if (lat && lng) {
        locationAddress = await reverseGeocode(lat, lng)
      }

      const alertObj = {
        fullName: `${data.firstName ?? "Unknown"} ${data.middleName ?? ""} ${data.lastName ?? ""}`.trim(),
        phone: data.contact || "N/A",
        location: locationAddress,
        time: readableTime,
      }
      console.log(alertObj.fullName)
      setAlerts((prev) => [alertObj, ...prev])
    })

    return () => {
      socket.off("sos-alert")
    }
  }, [])

  return (
    <div className="relative h-screen w-full flex justify-center items-center overflow-hidden">
      {/* Decorative Images */}
      <img src="/drimage.svg" alt="Doctor Left" className="absolute top-0 left-0 w-[160px] sm:w-[140px] md:w-[200px] lg:w-[300px] z-0" />
      <img src="/nurseimage.svg" alt="Nurse Bottom Left" className="absolute bottom-0 left-0 w-[160px] sm:w-[140px] md:w-[200px] lg:w-[300px] z-0" />
      <img src="/drimage2.svg" alt="Doctor Bottom Right" className="absolute bottom-0 right-0 w-[160px] sm:w-[140px] md:w-[200px] lg:w-[300px] z-0" />
      <img src="/hospitalimage.svg" alt="Hospital Top Right" className="absolute top-0 right-0 w-[160px] sm:w-[140px] md:w-[200px] lg:w-[300px] z-0" />

      {/* Alert Feed */}
      <div className="absolute overflow-y-scroll z-10 inset-0 pt-10 pb-10 flex flex-col w-full items-center gap-5">
        {alerts.length === 0 ? (
          <p className="text-gray-500 text-lg mt-10">No SOS alerts yet.</p>
        ) : (
          alerts.map((user, idx) => (
            <NotificationCard key={idx} user={user} />
          ))
        )}
      </div>
    </div>
  )
}

export default Notification
