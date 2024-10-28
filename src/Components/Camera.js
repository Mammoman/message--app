import React, { useEffect, useRef } from 'react';
import '../Styles/Camera.css';

function Camera() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function requestCameraAccess() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        console.log('Camera access granted');
      } catch (error) {
        console.error('Camera access denied', error);
      }
    }

    requestCameraAccess();
  }, []);

  return (
    <div className="camera-container">
      <h2>Camera Component</h2>
      <video ref={videoRef} autoPlay className="camera-feed"></video>
    </div>
  );
}

export default Camera;
