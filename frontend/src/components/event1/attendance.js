// import React, { useEffect, useRef, useState } from 'react';

// const QRCodeScanner = () => {
//   const videoRef = useRef(null);
//   const [scannedData, setScannedData] = useState([]);
//   const [scanCount, setScanCount] = useState(0);

//   useEffect(() => {
//     const initializeScanner = async () => {
//       if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//         alert('Your browser does not support the camera API');
//       } else {
//         const scanner = new window.Instascan.Scanner({
//           video: videoRef.current,
//           mirror: false,
//         });

//         scanner.addListener('scan', (content) => {
//           handleScan(content);
//         });

//         try {
//           const cameras = await window.Instascan.Camera.getCameras();
//           if (cameras.length > 0) {
//             scanner.start(cameras[0]);
//           } else {
//             console.error('No cameras found.');
//           }
//         } catch (error) {
//           console.error(error);
//         }
//       }
//     };

//     initializeScanner();
//   }, []);

//   const handleScan = (content) => {
//     // Check if the scanned content is not similar to any existing data
//     if (!scannedData.some((data) => areStringsSimilar(data, content))) {
//       setScannedData((prevData) => {
//         // Ensure uniqueness by checking if the content is already in the array
//         const newData = [...prevData, content].slice(0, 3);
//         setScanCount(newData.length); // Update the scan count based on the new data length
//         return newData;
//       });
//     }
//   };

//   // Function to check if two strings are similar (you can customize this based on your requirements)
//   const areStringsSimilar = (str1, str2) => {
//     // For example, you can make a case-insensitive comparison
//     return str1.toLowerCase() === str2.toLowerCase();
//   };

//   const renderTableRows = () => {
//     return scannedData.map((data, index) => (
//       <tr key={index}>
//         <td>{data}</td>
//       </tr>
//     ));
//   };

//   return (
//     <div className='container'>
//       <div className='row'>
//         <div className='col-12 d-flex justify-content-center my-5'>
//           <video ref={videoRef} style={{ width: '300px', borderRadius: '20px' }} className='border border-warning'></video>
//         </div>
//       </div>
//       <div className='row d-flex justify-content-center'>
//         <div className='col-10 col-md-5'>
//           <table className='table table-hover' style={{ textAlign: 'center' }}>
//             <thead className='bg-primary'>
//               <tr>
//                 <th scope='col' className='text-light'>
//                   Participant Names
//                 </th>
//               </tr>
//             </thead>
//             <tbody>{renderTableRows()}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QRCodeScanner;

import React, { useEffect } from "react";
import { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function Scanner() {
  const [ScanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    async function success(result) {
      setScanResult(result);
      console.log(JSON.stringify({ key: result }));
      // console.log("Scan result: ", ScanResult);

      const response = await fetch("http://localhost:4000/admin/uiux", {
        method: "POST",
        body: JSON.stringify({ key: result }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        console.log(response.status);
        const data = await response.json();
        scanner.clear();
        alert(`Name: ${data.name}, College: ${data.college}, workshop: ${data.workshop} Events: ${data.events}`);
      }
    }

    function error(error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <p>Scanner</p>
      {/* {ScanResult ? <div>Success: {ScanResult}</div> : <div id="reader"></div>} */}
      {ScanResult && <div>Success: {ScanResult}</div>}
      <div id="reader"></div>
    </div>
  );
}

export default Scanner;
