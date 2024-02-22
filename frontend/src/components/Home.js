import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div>Home Page</div>
      <Link to="/workshop">
        <button>Workshops</button>
      </Link>
      <Link to="/events">
        <button>Events</button>
      </Link>
    </div>
  );
}

export default Home;
