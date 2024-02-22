import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import Home from "./components/Home"

import Scanner from "./components/Scanner";
import Workshop from "./components/event1/Event";
import Event from "./components/event1/attendanceEvents";


function App() {
  // fallback={<Loading></Loading>}
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route
            path="/"
            element={
              <Suspense fallback={<Loading></Loading>}>
                <Home></Home>
              </Suspense>
            }
          ></Route>
          <Route
            path="/workshop"
            element={
              <Suspense fallback={<Loading></Loading>}>
                <Workshop></Workshop>
              </Suspense>
            }
          ></Route>
          <Route
            path="/event"
            element={
              <Suspense fallback={<Loading></Loading>}>
                <Event></Event>
              </Suspense>
            }
          ></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
