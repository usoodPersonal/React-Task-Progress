import React from "react";
import { useEffect } from "react";
function Analysis({ setNavbarTab }) {
  useEffect(() => {
    setNavbarTab("Analysis")
  }, [])
  return <h2 style={{padding:"30px"}}>Welcome to Analysis</h2>;
}

export default Analysis;
