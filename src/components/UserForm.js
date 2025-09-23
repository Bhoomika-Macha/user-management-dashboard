import React, { useState, useEffect } from "react";
import { addUser, updateUser } from "../api";
import data from "../application.json"; // ⬅ Import courses

const UserForm = ({ isOpen, onClose, onSave, editUser }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editUser) {
      const [fName, lName] = editUser.name.split(" ");
      setFirstName(fName || "");
      setLastName(lName || "");
      setEmail(editUser.email || "");
      setDepartment(editUser.company?.name || "");
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setDepartment("");
    }
  }, [editUser]);

  if (!isOpen) return null;

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !department) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    const userData = {
      name: `${firstName} ${lastName}`,
      email,
      company: { name: department },
    };

    try {
      if (editUser) {
        await updateUser(editUser.id, userData);
        onSave({ ...editUser, ...userData });
      } else {
        const res = await addUser(userData);
        onSave({ id: res.data.id || Date.now(), ...userData });
      }
      onClose();
    } catch (err) {
      setError("Failed to save user. Try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editUser ? "Edit User" : "Add User"}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="user-form">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            {data.courses.map((course, idx) => (
              <option key={idx} value={course}>
                {course}
              </option>
            ))}
          </select>
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {editUser ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
