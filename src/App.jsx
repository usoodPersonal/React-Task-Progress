import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";

import Overview from "./pages/Overview";
import Analysis from "./pages/Analysis";
import Policies from "./pages/Policies";
import Devices from "./pages/Devices";
import Objects from "./pages/Objects/index";
import Integration from "./pages/Integration";

const App = () => {
  const [navbarTab, setNavbarTab] = useState("Overview");
  return (
    <BrowserRouter>
      <div className={"main"} >
        <Navbar navbarTab={navbarTab} setNavbarTab={setNavbarTab}/>
        <div className={"content"}>
          <Routes>
            <Route path="/" element={<Overview setNavbarTab={setNavbarTab}/>} />
            <Route path="/analysis" element={<Analysis setNavbarTab={setNavbarTab}/>} />
            <Route path="/policies" element={<Policies setNavbarTab={setNavbarTab}/>} />
            <Route path="/devices" element={<Devices setNavbarTab={setNavbarTab}/>} />
            <Route path="/object/*" element={<Objects setNavbarTab={setNavbarTab}/>} /> 
            <Route path="/integration" element={<Integration setNavbarTab={setNavbarTab}/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
