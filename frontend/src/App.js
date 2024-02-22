import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";

import Scanner from "./components/Scanner";
import Event from "./components/event1/Event";

const Register = lazy(() => import("./components/Register"));

function App() {
  // fallback={<Loading></Loading>}
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/workshop"
            element={
              <Suspense fallback={<Loading></Loading>}>
                <Event></Event>
              </Suspense>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <Suspense fallback={<Loading></Loading>}>
                <Register></Register>
              </Suspense>
            }
          ></Route>

          <Route
            path="/scanner"
            element={
              <Suspense fallback={<Loading></Loading>}>
                <Scanner></Scanner>
              </Suspense>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
