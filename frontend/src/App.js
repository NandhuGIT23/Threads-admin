import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Register = lazy(() => import("./components/Register"));

function App() {
  // fallback={<Loading></Loading>}
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={
              <Suspense>
                <Register></Register>
              </Suspense>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
