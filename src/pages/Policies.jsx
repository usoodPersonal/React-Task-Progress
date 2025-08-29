import React from "react";
import { useEffect } from "react";
function Policies({ setNavbarTab }) {
  useEffect(() => {
    setNavbarTab("Policies")
  }, [])
  return <h2 style={{padding:"30px"}}>Welcome to Policies</h2>;
}

export default Policies;
