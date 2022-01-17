import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">Vitroscape</Link>
        </div>
      </nav>
    </>
  )
}


export default Navbar
