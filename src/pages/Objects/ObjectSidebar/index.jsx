import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./ObjectSidebar.css";
import { objectConfig } from "../objects-config/config";






const ObjectSidebar = () => {
  const [openItems, setOpenItems] = useState({});
  const toggleItem = (itemName) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };
  return (
    <div className="sidebar">
      <div className="sidebar-items">
        {objectConfig.map((item, index) => (
          <div key={index} className="sidebar-item">
            {item.children ? (
              <>
                <div 
                  className="sidebar-parent" 
                  onClick={() => toggleItem(item.name)}
                >
                  <span className="arrow">
                    {openItems[item.name] ? "▼" : "▶"} 
                  </span>
                  <span>{item.name}</span>
                </div>
                {openItems[item.name] && (
                  <div className="sidebar-children">
                    {item.children.map((child, idx) => (
                      <NavLink 
                        key={idx} 
                        to={child.path} 
                        state={{ name: child.name }}
                        className={({ isActive }) =>
                          "sidebar-child" + (isActive ? " active" : "")
                        }
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink 
                to={item.path} 
                state={{ name: item.name }}
                className={({ isActive }) =>
                  "sidebar-parent" + (isActive ? " active" : "")
                }
              >
                {item.name}
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObjectSidebar;
