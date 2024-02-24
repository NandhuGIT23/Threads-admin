import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

function QRCodeReader() {
  const Navigate = useNavigate();
  const [latestScanResult, setLatestScanResult] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);
  const [error, setError] = useState("");

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
      setLatestScanResult(result);

      // Fetch additional data from the API
      const response = await fetch(
        // "https://threads-admin.onrender.com/admin/uiux",
        "admin/uiux",
        {
          method: "POST",
          body: JSON.stringify({ key: result }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setAdditionalData(data);
      } else {
        setError("Participant has not registered for workshop");
      }
    }

    function error(error) {
      console.log(error);
    }

    return () => {
      // Cleanup function, remove event listeners, etc.
      scanner.clear();
    };
  }, [Navigate]);

  return (
    <div>
      <div>
        <div id="reader"></div>
        <center>
          {latestScanResult && <div>Student ID: {latestScanResult}</div>}
        </center>
      </div>
      {additionalData && (
        <div className="mt-4">
          <div className="container mt-4">
            <div className="row ">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title text-center mb-4 text-danger">
                      Additional Data
                    </h3>
                    <div className="d-flex flex-column">
                      <div className="d-flex justify-content-center mb-1">
                        <p>Name: {additionalData.name}</p>
                      </div>
                      <div className="d-flex justify-content-center mb-1">
                        <p>College: {additionalData.college}</p>
                      </div>
                      <div className="d-flex justify-content-center">
                        <p>Events paid: {additionalData.events}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <h3>Participant has not been registerd for events</h3>}
    </div>
  );
}

export default QRCodeReader;
