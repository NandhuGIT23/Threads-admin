import React, { useState } from "react";

function ReportGenerator() {
  const [selectedWorkshop, setSelectedWorkshop] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://threads-admin.onrender.com/admin/download-report",
      // "admin/download-report",
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

  return (
    <div>
      {/* <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand text-warning" href="#">
            THREADS'24
          </a>
        </nav>
      </div> */}
      <div className="container-fluid my-5 ">
        <center>
          <div className="row d-flex align-items-center">
            <div className="col-12">
              <p className="h4 text-primary">Download Your Report</p>
            </div>
            <div className="col-12">
              <form className="mt-3 col-8">
                <div className="mb-3">
                  <label htmlFor="workshop" className="form-label">
                    Workshop:
                  </label>
                  <select
                    className="form-control"
                    id="workshop"
                    value={selectedWorkshop}
                    onChange={handleWorkshopChange}
                  >
                    <option value="web_development">All Events</option>
                    {/* <option value="cyber_security">Cyber Security</option>
                    <option value="flutter">Flutter</option>
                    <option value="uiux">UI/UX</option> */}
                    {/* Add similar options for other workshops */}
                  </select>
                </div>
                <button
                  className="btn btn-primary btn-block"
                  onClick={handleSubmit}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
}

export default ReportGenerator;
