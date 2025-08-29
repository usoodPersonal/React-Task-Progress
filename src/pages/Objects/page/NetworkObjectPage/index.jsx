import React, { useState, useEffect, useMemo } from "react";
import "./networkObjectPage.css";

const NetworkObjectPage = ({ pageName }) => {
  // Generate localStorage key based on pageName
  const STORAGE_KEY = useMemo(() => {
    const toCamelCase = (str) =>
      str
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[A-Z]/, (chr) => chr.toLowerCase());

    return "fmc_" + toCamelCase(pageName) + "Object"; 
  }, [pageName]);

  const [networks, setNetworks] = useState([]);

  // Modal & form state
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    textbox: "",
    allowOverride: false,
  });
  const [radioOption, setRadioOption] = useState("Host");

  // Override state
  const [overrides, setOverrides] = useState([]);
  const [overrideModalOpen, setOverrideModalOpen] = useState(false);
  const [overrideForm, setOverrideForm] = useState({
    overrideOn: "",
    content: "",
    type: "",
  });

  // Validation state
  const [errors, setErrors] = useState({ name: false, textbox: false });

  // Editing state
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingOverrideIndex, setEditingOverrideIndex] = useState(null);
  const [overrideOpen, setOverrideOpen] = useState(false);

  // Load from localStorage whenever STORAGE_KEY changes
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setNetworks(JSON.parse(saved));
    } else {
      setNetworks([]);
    }
  }, [STORAGE_KEY]);

  // Save to localStorage whenever networks or STORAGE_KEY changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(networks));
  }, [networks, STORAGE_KEY]);

  // Reset form
  const resetForm = () => {
    setModalOpen(false);
    setEditingIndex(null);
    setFormData({
      name: "",
      description: "",
      textbox: "",
      allowOverride: false,
    });
    setRadioOption("Host");
    setOverrides([]);
    setErrors({ name: false, textbox: false });
    setEditingOverrideIndex(null);
  };

  // Save/Add item
  const handleSave = () => {
    const newErrors = { name: false, textbox: false };
    let hasError = false;

    if (!formData.name.trim()) {
      newErrors.name = true;
      hasError = true;
    }
    if (!formData.textbox.trim()) {
      newErrors.textbox = true;
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    if (editingIndex !== null) {
      const updated = [...networks];
      updated[editingIndex] = { ...formData, radioOption, overrides };
      setNetworks(updated);
    } else {
      setNetworks((prev) => [
        ...prev,
        { ...formData, radioOption, overrides },
      ]);
    }
    resetForm();
  };

  const handleCancel = () => resetForm();

  const handleDelete = (idx) => {
    setNetworks((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleEdit = (idx) => {
    const item = networks[idx];
    setFormData({
      name: item.name,
      description: item.description,
      textbox: item.textbox,
      allowOverride: item.allowOverride,
    });
    setRadioOption(item.radioOption);
    setOverrides(item.overrides || []);
    setEditingIndex(idx);
    setModalOpen(true);
  };

  // Override handlers
  const handleOverrideSave = () => {
    if (
      !overrideForm.overrideOn.trim() ||
      !overrideForm.content.trim() ||
      !overrideForm.type.trim()
    )
      return;

    if (editingOverrideIndex !== null) {
      const updated = [...overrides];
      updated[editingOverrideIndex] = overrideForm;
      setOverrides(updated);
    } else {
      setOverrides([...overrides, overrideForm]);
    }

    setOverrideForm({ overrideOn: "", content: "", type: "" });
    setEditingOverrideIndex(null);
    setOverrideModalOpen(false);
  };

  const handleOverrideDelete = (idx) => {
    setOverrides((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleOverrideEdit = (idx) => {
    const o = overrides[idx];
    setOverrideForm(o);
    setEditingOverrideIndex(idx);
    setOverrideModalOpen(true);
  };

  return (
    <div className="network-page-container">
      {/* Header */}
      <div className="network-page-header">
        <h2>{pageName}</h2>
        <button className="network-add-btn" onClick={() => setModalOpen(true)}>
          Add
        </button>
      </div>

      {/* Table */}
      {networks.length > 0 && (
        <table className="network-items-table" style={{ backgroundColor: "#fff" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Type</th>
              <th>Override</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {networks.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.textbox}</td>
                <td>{item.radioOption}</td>
                <td>{item.allowOverride ? "✅" : "❌"}</td>
                <td>
                  <button className="network-edit-btn" onClick={() => handleEdit(idx)}>
                    Edit
                  </button>
                  <button
                    className="network-delete-btn"
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

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="network-modal-overlay">
          <div className="network-modal-card">
            <h3>{editingIndex !== null ? "Edit" : "New"} {pageName} Object</h3>

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

            <label>Description:</label>
            <input
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              style={{ border: "1px solid #ccc", padding: 5, borderRadius: 5 }}
            />

            <div className="network-radio-group">
              {["Host", "Range", "Network", "FQDN"].map((opt) => (
                <label key={opt}>
                  <input
                    type="radio"
                    name="type"
                    value={opt}
                    checked={radioOption === opt}
                    onChange={(e) => setRadioOption(e.target.value)}
                  />
                  {" " + opt}
                </label>
              ))}
            </div>

            <input
              value={formData.textbox}
              onChange={(e) =>
                setFormData({ ...formData, textbox: e.target.value })
              }
              style={{
                border: errors.textbox ? "2px solid red" : "1px solid #ccc",
                boxShadow: errors.textbox
                  ? "0 0 5px 1px rgba(255,0,0,0.5)"
                  : "none",
                outline: "none",
                padding: 5,
                borderRadius: 5,
              }}
            />

            <label>
              <input
                type="checkbox"
                checked={formData.allowOverride}
                onChange={(e) =>
                  setFormData({ ...formData, allowOverride: e.target.checked })
                }
              />
              {" "}Allow Overrides
            </label>

            {/* Override Section */}
            {formData.allowOverride && (
              <div className="network-override-section">
                <div
                  className="network-override-header"
                  onClick={() => setOverrideOpen(!overrideOpen)}
                >
                  <span>
                    {overrideOpen ? "▾" : "▸"} Override ({overrides.length})
                  </span>
                  <button
                    className="network-add-btn small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOverrideForm({ overrideOn: "", content: "", type: "" });
                      setOverrideModalOpen(true);
                      setEditingOverrideIndex(null);
                    }}
                  >
                    Add
                  </button>
                </div>

                {overrideOpen && (
                  <table className="network-override-table">
                    <thead>
                      <tr>
                        <th>Override On</th>
                        <th>Content</th>
                        <th>Type</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {overrides.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="network-no-records">
                            No records to display
                          </td>
                        </tr>
                      ) : (
                        overrides.map((o, i) => (
                          <tr key={i}>
                            <td>{o.overrideOn}</td>
                            <td>{o.content}</td>
                            <td>{o.type}</td>
                            <td>
                              <button
                                className="network-edit-btn"
                                onClick={() => handleOverrideEdit(i)}
                              >
                                Edit
                              </button>
                              <button
                                className="network-delete-btn"
                                onClick={() => handleOverrideDelete(i)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            <div className="network-modal-actions">
              <button className="network-cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button className="network-save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Override Add/Edit Modal */}
      {overrideModalOpen && (
        <div className="network-modal-overlay">
          <div className="network-modal-card">
            <h3>{editingOverrideIndex !== null ? "Edit" : "Add"} Override</h3>

            <label>Override On:</label>
            <input
              type="text"
              value={overrideForm.overrideOn}
              onChange={(e) =>
                setOverrideForm({ ...overrideForm, overrideOn: e.target.value })
              }
            />

            <label>Content:</label>
            <input
              type="text"
              value={overrideForm.content}
              onChange={(e) =>
                setOverrideForm({ ...overrideForm, content: e.target.value })
              }
            />

            <label>Type:</label>
            <input
              type="text"
              value={overrideForm.type}
              onChange={(e) =>
                setOverrideForm({ ...overrideForm, type: e.target.value })
              }
            />

            <div className="network-modal-actions">
              <button
                className="network-cancel-btn"
                onClick={() => setOverrideModalOpen(false)}
              >
                Cancel
              </button>
              <button className="network-save-btn" onClick={handleOverrideSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkObjectPage;
