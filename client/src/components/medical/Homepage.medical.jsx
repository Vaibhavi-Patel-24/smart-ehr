import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'qr-scanner';

function Homepagemedical() {
  const [patientId, setPatientId] = useState('');
  const [cameraOpen, setCameraOpen] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const scannerRef = useRef(null);

  const handleSubmit = () => {
    if (patientId.trim() !== '') {
      navigate(`/medical/ehr/${patientId.trim()}`);
    } else {
      alert("Please enter a valid Patient ID");
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const result = await QrScanner.scanImage(file);
      if (result) {
        navigate(`/medical/ehr/${result}`);
      } else {
        alert("No valid QR code found in the image.");
      }
    } catch (err) {
      alert("Failed to read QR code from image.");
      console.error(err);
    }
  };

  const startCameraScanner = async () => {
    setCameraOpen(true);
    scannerRef.current = new QrScanner(
      videoRef.current,
      (result) => {
        scannerRef.current.stop();
        setCameraOpen(false);
        navigate(`/medical/ehr/${result}`);
      },
      {
        highlightScanRegion: true,
        returnDetailedScanResult: true,
      }
    );
    scannerRef.current.start();
  };

  const stopCameraScanner = () => {
    scannerRef.current?.stop();
    setCameraOpen(false);
  };

  return (
    <div className="relative h-screen w-full flex justify-center items-center overflow-hidden">
      {/* Decorative Images */}
      <img src="/drimage.svg" className="absolute top-0 left-0 w-[160px] sm:w-[140px] md:w-[200px] lg:w-[300px] z-0" alt="Doctor Left" />
      <img src="/nurseimage.svg" className="absolute bottom-0 left-0 w-[160px] sm:w-[140px] md:w-[200px] lg:w-[300px] z-0" alt="Nurse Bottom Left" />
      <img src="/drimage2.svg" className="absolute bottom-0 right-0 w-[160px] sm:w-[140px] md:w-[200px] lg:w-[300px] z-0" alt="Doctor Bottom Right" />
      <img src="/hospitalimage.svg" className="absolute top-0 right-0 w-[160px] sm:w-[140px] md:w-[200px] lg:w-[300px] z-0" alt="Hospital Top Right" />

      {/* Input Form */}
      <div className="z-10 shadow-2xl flex justify-center items-center border-2 w-[90%] sm:w-[80%] md:w-[65%] lg:w-[60%] h-auto sm:h-[60%] py-6 rounded-[15px] px-6 sm:px-10 border-[#0095DA] bg-white/90 backdrop-blur-lg">
        <div className="flex flex-col items-center gap-6 w-full">
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="p-3 w-full sm:w-[80%] bg-[#F8FDFF] border rounded-[15px] border-[#0095DA] outline-none text-sm sm:text-base"
            placeholder="Enter Patient ID"
          />

          <button
            onClick={handleSubmit}
            className="btn btn-outline text-sm sm:text-base text-[#0095DA] outline-[#69A4DC] rounded-[15px] px-6 py-2 mt-2"
          >
            View EHR
          </button>

          <div className="text-[#0095DA] text-center text-sm">
            <p>OR</p>
          </div>

          {/* Scan Buttons */}
          <div className="flex flex-col gap-3 w-full items-center">
            {/* 👇 Scan Fingerprint */}
            <button className="btn btn-outline text-sm sm:text-base text-[#0095DA] outline-[#69A4DC] rounded-[15px] px-4 py-2">
              Scan Fingerprint
            </button>

            {/* 👇 QR Options */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-center w-full">
              <button
                className="btn btn-outline text-sm sm:text-base text-[#0095DA] outline-[#69A4DC] rounded-[15px] px-4 py-2"
                onClick={() => fileInputRef.current.click()}
              >
                Upload QR Image
              </button>
              <button
                className="btn btn-outline text-sm sm:text-base text-[#0095DA] outline-[#69A4DC] rounded-[15px] px-4 py-2"
                onClick={startCameraScanner}
              >
                Use Camera to Scan
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* QR Camera Modal */}
      {cameraOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <video ref={videoRef} className="w-[300px] h-[300px] rounded" />
          <button
            onClick={stopCameraScanner}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Homepagemedical;
