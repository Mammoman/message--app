import React, { useEffect } from 'react';

function Camera() {
  useEffect(() => {
    async function requestCameraAccess() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // You can now use the stream to display the camera feed
        console.log('Camera access granted');
      } catch (error) {
        console.error('Camera access denied', error);
      }
    }

    requestCameraAccess();
  }, []);

  return (
    <div>
      <h2>Camera Component</h2>
      <p>Requesting camera access...</p>
    </div>
  );
}

export default Camera;
