import React, { useEffect, useState, useRef } from 'react';
import sos from '../../assets/sos.png';
import EhrContainer from '../../components/EhrContainer';
import { data } from '../../data/ehr';
import Navbar from '../../components/Navbar';
import { API } from '../../service/api';
import { usePatient } from '../../context/PatientContextProvider';
import io from 'socket.io-client';
import { FaDirections } from "react-icons/fa";
import DownloadableQR from '../../components/DownloadableQR';


const socket = io('http://localhost:8000'); // Adjust to your backend

const HomepagePatient = () => {
  const [ehr, setEhr] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [location, setLocation] = useState(null);
  const [sosCount, setSosCount] = useState(0);
  const [hospitals, setHospitals] = useState([]);
  const intervalRef = useRef(null);
  const context = usePatient();
  const [sosMessage, setSosMessage] = useState('');
  
  const patientId = context?.patientId || sessionStorage.getItem('patientId');

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        setLocation(coords);
      },
      (err) => console.error("Geolocation error", err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (location) {
      console.log("Current location:", `${location.latitude} ${location.longitude}`);
    }
  }, [location]);

  useEffect(() => {
    socket.on("nearby-hospitals", (data) => {
      console.log(`hospital have been recieved at frontend from back`)
      setHospitals(data);
      startTracking();
    });
    return () => {
      socket.off("nearby-hospitals");
    };
  }, []);

  useEffect(() => {
    socket.on("sos-alert", (data) => {
      console.log("🔔 SOS alert received with hospitals:", data);
      if (data && Array.isArray(data.hospitals)) {
        setHospitals(data.hospitals);
        setSosMessage("✅ Hospitals received in response to SOS.");
        startTracking();
      }
    });
    return () => {
      socket.off("sos-alert");
    };
  }, []);

  useEffect(() => {
    const listener = (e) => {
      const payload = e.detail;
      if (payload) handleSubmit(payload);
    };
    window.addEventListener('ehr-submit-payload', listener);
    return () => window.removeEventListener('ehr-submit-payload', listener);
  }, []);

  const handleSubmit = async (updatedFields) => {
    try {
      const response = await API.updatePatientSelf({ patientId, ...updatedFields });
      setEhr(response.data?.patient);
      setEditMode(false);
      alert("EHR updated.");
    } catch (error) {
      alert("Failed to update EHR.");
    }
  };

  const fetchEhr = async () => {
    try {
      const response = await API.fetchByPatientId({ patientId });
      setEhr(response?.data);
    } catch (error) {
      setEhr(data);
    }
  };

  useEffect(() => {
    fetchEhr();
  }, [patientId]);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = x => (x * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const startTracking = () => {
    intervalRef.current = setInterval(() => {
      if (!location || !hospitals.length) return;

      for (let hosp of hospitals) {
        const dist = getDistance(
          location.latitude, location.longitude,
          hosp.location.coordinates[1], hosp.location.coordinates[0]
        );
        if (dist < 0.05) {
          alert("You’ve reached a hospital!");
          clearInterval(intervalRef.current);
          return;
        }
      }
    }, 3000);
  };

  const handleSOSClick = () => {
    if (!location) {
      setSosMessage("⏳ Waiting for location...");
      return;
    }

    const nextCount = sosCount + 1;

    if (nextCount === 1) {
      setSosMessage("Click 2 more times to send SOS.");
    } else if (nextCount === 2) {
      setSosMessage("Click 1 more time to send SOS.");
    } else if (nextCount === 3) {
      setSosMessage("SOS sent to nearby medicals.");
      socket.emit("sos-alert", {
        patientId,
        location: {
          type: "Point",
          coordinates: [location.longitude, location.latitude],
        },
      });
    }

    setSosCount(nextCount);

    if (nextCount < 3) {
      setTimeout(() => {
        setSosCount(0);
        setSosMessage('');
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-10 pb-10 px-4 flex flex-col items-center text-center space-y-6">
        <p className="text-md font-semibold text-[rgb(255,143,154)] max-w-md pt-6">
          Don’t wait. If this is a health crisis, tap the SOS button now
        </p>

        <img
          src={sos}
          alt="sos"
          onClick={handleSOSClick}
          className="w-24 h-auto pt-2 cursor-pointer hover:scale-110 transition-transform"
        />

        <p className="text-md font-semibold text-[rgb(255,143,154)]">EMERGENCY</p>
        {sosMessage && (
          <p className="text-sm text-red-600 font-medium">{sosMessage}</p>
        )}

        {hospitals.length > 0 && (
          <div className="w-full max-w-xl mt-4">
            <h2 className="text-blue-600 text-lg font-semibold text-left mb-2">Nearby Hospitals</h2>
            {hospitals.map((hosp, idx) => {
              const destLat = hosp.location.coordinates[1];
              const destLng = hosp.location.coordinates[0];
              const mapsLink = `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${destLat},${destLng}&travelmode=driving`;
              
              return (
                <div key={idx} className="bg-gray-100 p-4 text-left rounded-xl mb-3 shadow">
                  <p className="text-blue-800 font-bold">{hosp.name}</p>
                  <p className="text-sm text-black">Address: {hosp.address}</p>
                  <p className="text-sm text-black">📍 {getDistance(
                    location.latitude,
                    location.longitude,
                    destLat,
                    destLng
                  ).toFixed(1)} km</p>
                  <p className="text-sm text-black">Contact: {hosp.contact}</p>
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-2 text-blue-600 hover:underline text-sm"
                  >
                    Open Directions <FaDirections className='text-sm ml-1'/>
                  </a>
                </div>
              );
            })}
          </div>
        )}
        <DownloadableQR/>
        <div className="w-full max-w-3xl text-left">
          <EhrContainer data={ehr} editMode={editMode} setEditMode={setEditMode} />
        </div>

        <button
          onClick={() => {
            if (editMode) {
              const submitEvent = new Event("ehr-collect-fields");
              window.dispatchEvent(submitEvent);
            } else {
              setEditMode(true);
            }
          }}
          className="btn btn-outline text-[#0095DA] outline-[#69A4DC] rounded-[15px] text-sm sm:text-base 
                     w-full sm:w-[200px] h-[44px] sm:h-[48px]"
        >
          {editMode ? "Submit" : "Update EHR"}
        </button>
      </div>
    </div>
  );
};

export default HomepagePatient;
