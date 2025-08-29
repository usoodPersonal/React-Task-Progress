import React from "react";
import { useEffect } from "react";
function Overview({ setNavbarTab }) {
  useEffect(() => {
    setNavbarTab("Overview")
  }, [])
  return <h2 style={{padding:"30px"}}>Welcome to Overview</h2>;
}

export default Overview;
