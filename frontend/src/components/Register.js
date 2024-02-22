import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import eventQR from "../image/eventQR.jpeg";
import workshopQR from "../image/workshopQR.jpeg";
import workshopEventsQr from "../image/workshopEventsQr.jpeg";

const Register = () => {
  const details = {};
  const navigate = useNavigate();
  const [UPI, setUPI] = useState("");

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [college, setCollege] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState(null);
  const [showHiddenDiv, setShowHiddenDiv] = useState(false);
  const [showHiddenDiv2, setShowHiddenDiv2] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(
    "Sona College Of Technology"
  );
  const [selectedEvents, setSelectedEvents] = useState(false);
  const [selectedWorkshops, setSelectedWorkshops] = useState("");
  const [selectedYear, setSelectedYear] = useState("1");
  const [selectedPayment, setSelectedPayment] = useState("upi");

  function revert(e) {
    setChecked(!checked);
    setSelectedEvents(!selectedEvents);
  }

  function revert2(e) {
    setChecked2(!checked2);
    setShowHiddenDiv2(checked2);
  }

  useEffect(() => {
    console.log(selectedCollege);

    // console.log(selectedWorkshops);

    if (selectedCollege === "Sona College Of Technology") {
      setShowHiddenDiv(false);
    } else {
      setShowHiddenDiv(true);
      setSelectedCollege(college);
    }
    setShowHiddenDiv2(checked2);
    if (!checked2) {
      setSelectedWorkshops(false);
    }
  }, [selectedCollege, checked2, selectedWorkshops]);

  const handleCollegeChange = (event) => {
    setSelectedCollege(event.target.value);
  };

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handleWorkshopChange = (event) => {
    setSelectedWorkshops(event.target.value);
  };

  const handleOptionChange4 = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedPayment);

    const details = {
      name,
      selectedCollege,
      department,
      email,
      number,
      selectedEvents,
      selectedWorkshops,
      selectedYear,
      selectedPayment,
    };

    const response = await fetch("https://threads-admin.onrender.com/admin/register", {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(details);

    // return;
    alert("successful");
  };

  return (
    <div className="register">
      <div className="workshopsForm">
        <div style={{ paddingLeft: "1em" }} className="hero1">
          <div className="Txt">
            <h1 className="topic">REGISTRATION</h1>
          </div>
          <form
            action="#"
            id="workshopRegis"
            onSubmit={handleSubmit}
            className="workshopRegis"
          >
            <label htmlFor="canditateName">Name</label>
            <br />
            <input
              type="text"
              id="canditateName"
              className="inputBox"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            <br />
            <p className="hint">
              Note: The details you enter will be reflected in your ID and
              certificates. So, kindly enter correct details
            </p>
            <br />

            <p className="label">College</p>
            <div className="radioBtn">
              <input
                type="radio"
                id="sct"
                name="Colleger"
                value="Sona College Of Technology"
                checked={selectedCollege === "Sona College Of Technology"}
                // checked={false}
                onClick={handleCollegeChange}
              />
              <label htmlFor="sct" className="workShopTxt" id="workShopTxtid">
                Sona College Of Technology
              </label>
              <br />
            </div>

            <div className="radioBtn">
              <input
                type="radio"
                id="others"
                name="Colleger"
                value="Others"
                checked={selectedCollege !== "Sona College Of Technology"}
                // onChange={handleOptionChange}
                onClick={handleCollegeChange}
              />
              <label htmlFor="others" className="workShopTxt">
                Others
              </label>
              <br />
            </div>
            <br />

            <div
              className="hiddenDiv"
              id="hiddenDiv"
              style={{ display: showHiddenDiv ? "block" : "none" }}
            >
              <label htmlFor="clgName">College Name</label>
              <input
                type="text"
                id="clgName"
                className="inputBox"
                onChange={(e) => setCollege(e.target.value)}
                value={college}
              />
            </div>

            <label>Participation</label>
            <br />
            <div className="radioBtn">
              <input
                type="checkbox"
                id="event"
                name="event"
                value="yes"
                checked={checked}
                onClick={revert}
              />
              <label htmlFor="event" className="workShopTxt">
                Events (24.02.2024)
              </label>
              <br />
            </div>

            <div className="radioBtn">
              <input
                type="checkbox"
                id="workshop"
                name="workshop"
                value="workshop"
                className="workselect"
                checked={checked2}
                onClick={revert2}
              />
              <label htmlFor="workshop" className="workShopTxt">
                Workshop (23.02.2024)
              </label>
              <br />
            </div>

            <div
              className="hiddenDiv1"
              id="hiddenDiv1"
              style={{ display: showHiddenDiv2 ? "block" : "none" }}
            >
              <br />
              <label>Workshop</label>
              <br />
              <div className="radioBtn">
                <input
                  type="radio"
                  id="rpa"
                  name="workshop1"
                  value="uiux"
                  checked={selectedWorkshops === "uiux"}
                  onChange={handleWorkshopChange}
                />
                <label htmlFor="rpa" className="workShopTxt">
                  UI UX Design
                </label>
                <br />
              </div>

              <div className="radioBtn">
                <input
                  type="radio"
                  id="cyber"
                  name="workshop1"
                  value="cyber_security"
                  checked={selectedWorkshops === "cyber_security"}
                  onChange={handleWorkshopChange}
                />
                <label htmlFor="cyber" className="workShopTxt">
                  Cyber Security
                </label>
                <br />
              </div>

              <div className="radioBtn">
                <input
                  type="radio"
                  id="web_development"
                  name="workshop1"
                  value="web_development"
                  checked={selectedWorkshops === "web_development"}
                  onChange={handleWorkshopChange}
                />
                <label htmlFor="cyber" className="workShopTxt">
                  Web Development
                </label>
                <br />
              </div>

              <div className="radioBtn">
                <input
                  type="radio"
                  id="web"
                  name="workshop1"
                  value="flutter"
                  checked={selectedWorkshops === "flutter"}
                  onChange={handleWorkshopChange}
                />
                <label htmlFor="web" className="workShopTxt">
                  Flutter
                </label>
                <br />
              </div>
            </div>

            <br />
            <label htmlFor="dept" className="dept">
              Department
            </label>
            <br />
            <input
              type="text"
              required
              id="dept"
              className="inputBox"
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
            />
            <br />
            <br />

            <p className="label">Year</p>
            <div className="Yrs">
              <div className="YrRadio">
                <input
                  type="radio"
                  id="firstYr"
                  name="year"
                  value="1"
                  checked={selectedYear === "1"}
                  onChange={handleOptionChange4}
                />
                <label htmlFor="firstYr" className="YrTxt">
                  I
                </label>
              </div>

              <div className="YrRadio">
                <input
                  type="radio"
                  id="secondYr"
                  name="year"
                  value="2"
                  checked={selectedYear === "2"}
                  onChange={handleOptionChange4}
                />
                <label htmlFor="secondYr" className="YrTxt">
                  II
                </label>
              </div>

              <div className="YrRadio">
                <input
                  type="radio"
                  id="thirdYr"
                  name="year"
                  value="3"
                  checked={selectedYear === "3"}
                  onChange={handleOptionChange4}
                />
                <label htmlFor="thirdYr" className="YrTxt">
                  III
                </label>
              </div>

              <div className="YrRadio1">
                <input
                  type="radio"
                  id="fourthYr"
                  name="year"
                  value="4"
                  checked={selectedYear === "4"}
                  onChange={handleOptionChange4}
                />
                <label htmlFor="fourthYr" className="YrTxt">
                  IV
                </label>
              </div>
            </div>

            <label htmlFor="contactNo">Contact Number</label>
            <br />
            <input
              type="tel"
              required
              id="contactNo"
              className="inputBox"
              maxLength="10"
              minLength="10"
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            />
            <br />
            <br />

            <label htmlFor="email">Email ID</label>
            <br />
            <input
              type="email"
              required
              id="email"
              className="inputBox"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <br />
            <p className="hint">
              Note: If you are from Sona College, kindly enter your sonatech
              mail ID
            </p>
            <br />
            <p className="label">Payment</p>
            <div className="radioBtn">
              <input
                type="radio"
                id="pay"
                name="Upiradio"
                value="upi"
                checked={selectedPayment === "upi"}
                // checked={false}
                onClick={handlePaymentChange}
              />
              <label htmlFor="sct" className="workShopTxt" id="workShopTxtid">
                upi
              </label>
            </div>

            <div className="radioBtn">
              <input
                type="radio"
                id="pay"
                name="Upiradio"
                value="cash"
                checked={selectedPayment === "cash"}
                // checked={false}
                onClick={handlePaymentChange}
              />
              <label htmlFor="sct" className="workShopTxt" id="workShopTxtid">
                cash
              </label>
              <br />
            </div>
            <br />
            <button className="submitBtn" id="nextBtn">
              NEXT
            </button>
            <br />
            <br />
          </form>

          <div>
            Pay to this number: <h2>8270202119</h2> or <br />
            <h4>Event QR</h4>
            <img
              style={{ height: "250px", width: "250px" }}
              src={eventQR}
              alt=""
            />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h4>Workshop QR</h4>
            <img
              style={{ height: "250px", width: "250px" }}
              src={workshopQR}
              alt=""
            />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h4>Workshops and events QR</h4>
            <img
              style={{ height: "250px", width: "250px" }}
              src={workshopEventsQr}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
