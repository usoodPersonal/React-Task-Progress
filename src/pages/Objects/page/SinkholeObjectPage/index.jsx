import React, { useState, useEffect } from "react";
import "./sinkholeObjectPage.css";

const STORAGE_KEY = "fmc_sinkholeObject"
const SinkholeObjectPage = () => {
  const [sinkholes, setSinkholes] = useState([]);

  // Modal & form state
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    ipv4Policy: "",
    ipv6Policy: "",
  });
  const [radioOption, setRadioOption] = useState("Log Connections to Sinkhole");
  const [type, setType] = useState("None");

  // Validation state
  const [errors, setErrors] = useState({
    name: false,
    ipv4Policy: false,
    ipv6Policy: false,
  });
  // Load from localStorage whenever STORAGE_KEY changes
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setSinkholes(JSON.parse(saved));
    } else {
      setSinkholes([]);
    }
  }, []);

  // Save to localStorage whenever sinkholes changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sinkholes));
  }, [sinkholes]);

  // Editing state
  const [editingIndex, setEditingIndex] = useState(null);

  // Reset form
  const resetForm = () => {
    setModalOpen(false);
    setEditingIndex(null);
    setFormData({
      name: "",
      ipv4Policy: "",
      ipv6Policy: "",
    });
    setRadioOption("Log Connections to Sinkhole");
    setType("None");
    setErrors({ name: false });
  };

  function isValidIPv4(ip) {
    const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
    return ipv4Regex.test(ip);
  }
  function isValidIPv6(ip) {
    const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|(([0-9a-fA-F]{1,4}:){1,7}:)|(([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})|(([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2})|(([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3})|(([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4})|(([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5})|([0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6}))|(:((:[0-9a-fA-F]{1,4}){1,7}|:)))(%.+)?$/;
    return ipv6Regex.test(ip);
  }
  // Save/Add item
  const handleSave = () => {
    const newErrors = { name: false, ipv4Policy: false, ipv6Policy: false };
    let hasError = false;

    if (!formData.name.trim()) {
      newErrors.name = true;
      hasError = true;
    }
    if (!isValidIPv4(formData.ipv4Policy.trim())) {
      newErrors.ipv4Policy = true;
      hasError = true;
    }
    if (!isValidIPv6(formData.ipv6Policy.trim())) {
      newErrors.ipv6Policy = true;
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    const sinkholeData = { ...formData, radioOption, type };

    if (editingIndex !== null) {
      const updated = [...sinkholes];
      updated[editingIndex] = sinkholeData;
      setSinkholes(updated);
    } else {
      setSinkholes((prev) => [...prev, sinkholeData]);
    }
    resetForm();
  };

  const handleDelete = (idx) => {
    setSinkholes((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleEdit = (idx) => {
    const item = sinkholes[idx];
    setFormData({
      name: item.name,
      ipv4Policy: item.ipv4Policy,
      ipv6Policy: item.ipv6Policy,
    });
    setRadioOption(item.radioOption);
    setType(item.type);
    setEditingIndex(idx);
    setModalOpen(true);
  };

  return (
    <div className="sinkhole-page-container">
      {/* Header */}
      <div className="sinkhole-page-header">
        <h2>{"Sinkhole"}</h2>
        <button className="sinkhole-add-btn" onClick={() => setModalOpen(true)}>
          Add
        </button>
      </div>

      {/* Table */}
      {sinkholes.length > 0 && (
        <table className="sinkhole-items-table" >
          <thead>
            <tr>
              <th>Name</th>
              {/* <th>IPv4 Policy</th> */}
              {/* <th>IPv6 Policy</th> */}
              {/* <th>Option</th> */}
              <th>Value</th>
              {/* <th>Type</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sinkholes.map((item, idx) => (
              <tr key={idx} className="sinkhole-table-row">
                <td>{item.name}</td>
                {/* <td>{item.ipv4Policy}</td> */}
                {/* <td>{item.ipv6Policy}</td> */}
                {/* <td>{item.radioOption}</td> */}
                <td>
                  {item.ipv4Policy}
                  <br />
                  {item.ipv6Policy}
                </td>
                {/* <td>{item.type}</td> */}
                <td>
                  <button className="sinkhole-edit-btn" onClick={() => handleEdit(idx)}>
                    Edit
                  </button>
                  <button
                    className="sinkhole-delete-btn"
                    onClick={() => handleDelete(idx)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="sinkhole-modal-overlay">
          <div className="sinkhole-modal-card">
            <h3>{editingIndex !== null ? "Edit" : "New"} Sinkhole Object</h3>

            <label>Name:</label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              style={{
                border: errors.name ? "2px solid red" : "1px solid #ccc",
                boxShadow: errors.name
                  ? "0 0 5px 1px rgba(255,0,0,0.5)"
                  : "none",
                outline: "none",
                padding: 5,
                borderRadius: 5,
              }}
            />

            <label>IPv4 Policy:</label>
            <input
              value={formData.ipv4Policy}
              onChange={(e) =>
                setFormData({ ...formData, ipv4Policy: e.target.value })
              }
              style={{
                border: errors.ipv4Policy ? "2px solid red" : "1px solid #ccc",
                boxShadow: errors.ipv4Policy
                  ? "0 0 5px 1px rgba(255,0,0,0.5)"
                  : "none",
                outline: "none",
                padding: 5,
                borderRadius: 5,
              }}
            />

            <label>IPv6 Policy:</label>
            <input
              value={formData.ipv6Policy}
              onChange={(e) =>
                setFormData({ ...formData, ipv6Policy: e.target.value })
              }
              style={{
                border: errors.ipv6Policy ? "2px solid red" : "1px solid #ccc",
                boxShadow: errors.ipv6Policy
                  ? "0 0 5px 1px rgba(255,0,0,0.5)"
                  : "none",
                outline: "none",
                padding: 5,
                borderRadius: 5,
              }}
            />

            {/* Radio Options */}
            <div
              className="sinkhole-radio-group"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {[
                "Log Connections to Sinkhole",
                "Block and Log Connections to Sinkhole",
              ].map((opt) => (
                <label key={opt}>
                  <div style={{ paddingBottom: "10px" }}>{opt}</div>
                  <input
                    type="radio"
                    name="sinkholeOption"
                    value={opt}
                    checked={radioOption === opt}
                    onChange={(e) => setRadioOption(e.target.value)}
                  />
                </label>
              ))}
            </div>

            <label>Type:</label>
            <div className="sinkhole-selectContainer">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="sinkhole-custom-select"
              >
                <option value="None">None</option>
                <option value="Command and Control">Command and Control</option>
                <option value="Malware">Malware</option>
                <option value="Phishing">Phishing</option>
              </select>
              <span className="sinkhole-arrow"></span>
            </div>

            <div className="sinkhole-modal-actions">
              <button className="sinkhole-cancel-btn" onClick={resetForm}>
                Cancel
              </button>
              <button className="sinkhole-save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinkholeObjectPage;
