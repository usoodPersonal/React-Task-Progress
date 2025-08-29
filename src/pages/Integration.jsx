import React from "react";
import { useEffect } from "react";
function Integration({ setNavbarTab }) {
  useEffect(() => {
    setNavbarTab("Integration")
  }, [])
  return <h2 style={{padding:"30px"}}>Welcome to Integration</h2>;
}

export default Integration;
