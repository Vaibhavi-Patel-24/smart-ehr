import { useState } from 'react';
import QRCode from 'qrcode';

const DownloadableQR = () => {
  const [qrUrl, setQrUrl] = useState('');

  const valueToEncode = sessionStorage.getItem('patientId');
    console.log(valueToEncode)
  const generateQR = async () => {
    try {
      const url = await QRCode.toDataURL(valueToEncode);
      setQrUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'qr-code.png';
    link.click();
  };

  return (
    <div className="p-4">
    {!qrUrl &&
      <button onClick={generateQR} className="bg-blue-500 text-white px-4 py-2 rounded">Generate QR</button>}
      {qrUrl && (
        <>
          <img src={qrUrl} alt="QR Code" className="my-4 w-48 h-48" />
          <button onClick={downloadQR} className="bg-green-500 text-white px-4 py-2 rounded">Download QR</button>
        </>
      )}
    </div>
  );
};

export default DownloadableQR;
