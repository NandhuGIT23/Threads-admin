import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

function QRCodeReader() {
  const Navigate = useNavigate();
  const [latestScanResult, setLatestScanResult] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);

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
        "https://threads-admin.onrender.com/admin/uiux",
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
        setAdditionalData(data);
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
        <center>{latestScanResult && <div>Student ID: {latestScanResult}</div>}</center>
      </div>
      {additionalData && (
        <div className="mt-4">
         
          <div className="container mt-4">
            <div className="row ">
                <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                    <h3 className="card-title text-center mb-4 text-danger">Additional Data</h3>
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-center mb-1">
                       <p >{additionalData.name}</p>
                        </div>
                        <div className="d-flex justify-content-center mb-1">
                        <p>{additionalData.college}</p>
                        
                        </div>
                        <div className="d-flex justify-content-center">
                       <p >{additionalData.workshop}</p>
                        
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

          {/* <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">College</th>
                <th scope="col">Workshop</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>{additionalData.name}</td>
                <td>{additionalData.college}</td>
                <td>{additionalData.workshop}</td>
              </tr>
            </tbody>
          </table> */}
        </div>
      )}
    </div>
  );
}

export default QRCodeReader;
