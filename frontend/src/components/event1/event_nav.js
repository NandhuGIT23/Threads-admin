import React from 'react'
import logo from '../../image/ThreadsLogo.png'


function event_nav() {
  return (
    <div>
         <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <a className="navbar-brand text-warning" href="#">
                <img src={logo}  style={{width:"35px"}}   alt=""/>THREADS'24
            </a>
            
            <button className="navbar-toggler bg-light" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarText">
              <ul className="navbar-nav ml-auto">
              <li className="nav-item active m-2">
                 <button className="btn btn-primary btn-block">Attendance</button>
                </li>
                <li className="nav-item m-2">
                    <button className="btn btn-primary btn-block">Download Report</button>
                </li>
               
              </ul>
              
            </div>
          </nav>
    </div>
  )
}

export default event_nav