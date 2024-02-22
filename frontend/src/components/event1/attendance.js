import React, { useEffect } from "react";
import { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import logo from "../../image/ThreadsLogo.png";

function Scanner() {
  const [ScanResult, setScanResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(false);

  const handleModalChange = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedWorkshop);
    const response = await fetch(
      "http://localhost:4000/admin/download-report",
      {
        method: "POST",
        body: JSON.stringify({ selectedWorkshop }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "example.xlsx";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleWorkshopChange = (event) => {
    setSelectedWorkshop(event.target.value);
  };

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
        alert(
          `Name: ${data.name}, College: ${data.college}, workshop: ${data.workshop} Events: ${data.events}`
        );
      }
      window.location.reload();
    }

    function error(error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand text-warning" href="#">
            <img src={logo} style={{ width: "35px" }} alt="" />
            THREADS'24
          </a>

          <button
            className="navbar-toggler bg-light"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarText">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active m-2">
                <button className="btn btn-primary btn-block">
                  Attendance
                </button>
              </li>
              <li className="nav-item m-2">
                <button
                  onClick={handleModalChange}
                  className="btn btn-primary btn-block"
                >
                  Download Report
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div>
        <p>Scanner</p>
        {/* {ScanResult ? <div>Success: {ScanResult}</div> : <div id="reader"></div>} */}
        {ScanResult && <div>Success: {ScanResult}</div>}
        <div id="reader"></div>
      </div>
      {showModal && (
        <form>
          <label>
            <input
              onChange={handleWorkshopChange}
              type="radio"
              name="workshop"
              value="web_development"
            />
            Web Development
          </label>
          <br />
          <label>
            <input
              onChange={handleWorkshopChange}
              type="radio"
              name="workshop"
              value="cyber_security"
            />
            Cyber Security
          </label>
          <br />
          <label>
            <input
              onChange={handleWorkshopChange}
              type="radio"
              name="workshop"
              value="flutter"
            />
            Flutter
          </label>
          <br />
          <label>
            <input
              onChange={handleWorkshopChange}
              type="radio"
              name="workshop"
              value="uiux"
            />
            UI/UX
          </label>
          <br />
          <button onClick={handleSubmit} type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Scanner;
