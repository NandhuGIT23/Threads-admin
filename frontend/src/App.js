import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";


import QRCodeReader from "./components/qrreader";
import Report from "./components/report";
import Navbar from "./components/navbar";
import { QrReader } from "react-qr-reader";

function App() {
  // fallback={<Loading></Loading>}
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading></Loading>}>
                <QRCodeReader></QRCodeReader>
              </Suspense>
            }
          ></Route>
          <Route
            path="/report"
            element={
              <Suspense fallback={<Loading></Loading>}>
                <Report></Report>
              </Suspense>
            }
          ></Route>
          {/* <Route
            path="/event"
            element={
              <Suspense fallback={<Loading></Loading>}>
                <Event></Event>
              </Suspense>
            }
          ></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
