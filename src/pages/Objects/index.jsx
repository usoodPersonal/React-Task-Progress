import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ObjectSidebar from "./ObjectSidebar";
import NetworkObjectPage from "./page/NetworkObjectPage/index";
import SinkholeObjectPage from "./page/SinkholeObjectPage";
import { preProcessObjectConfig } from "./objects-config/config";

const Objects = ({ setNavbarTab }) => {
  useEffect(() => {
    setNavbarTab("Objects")
  }, [])
  const componentMap = {
    "Network": NetworkObjectPage,
    "Sinkhole": SinkholeObjectPage,
  }
  return (
    <div style={{ display: "flex", height: "100%", padding: 0, margin: 0 }}>
      <ObjectSidebar />
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <Routes>
          {preProcessObjectConfig().map((page) => {
            const Comp = componentMap[page.name] || componentMap["Network"];
            return (<Route
              key={page.name}
              path={page.path.replace("/object/", "")}
              element={
                <Comp pageName={page.name} />
              }
            />
            )
          })}
        </Routes>
      </div>
    </div>
  );
};

export default Objects;
