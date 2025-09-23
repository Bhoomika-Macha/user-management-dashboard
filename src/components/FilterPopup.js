import React, { useState } from "react";
import data from "../application.json"; // ⬅ Import courses

const FilterPopup = ({ isOpen, onClose, onApply }) => {
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Filter Users</h2>
        <div className="user-form">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={filters.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={filters.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={filters.email}
            onChange={handleChange}
          />
          <select
            name="department"
            value={filters.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {data.courses.map((course, idx) => (
              <option key={idx} value={course}>
                {course}
              </option>
            ))}
          </select>
          <div className="form-actions">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="save-btn" onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
