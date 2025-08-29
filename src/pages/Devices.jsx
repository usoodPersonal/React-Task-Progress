import React from "react";
import { useEffect } from "react";
function Devices({ setNavbarTab }) {
  useEffect(() => {
    setNavbarTab("Devices")
  }, [])
  return <h2 style={{padding:"30px"}}>Welcome to Devices</h2>;
}

export default Devices;
