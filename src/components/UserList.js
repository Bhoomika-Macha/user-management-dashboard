import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api";
import {
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaArrowRight,
  FaUserPlus,
  FaFilter,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import UserForm from "./UserForm";
import FilterPopup from "./FilterPopup";
import data from "../application.json";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();

      const mappedUsers = response.data.map((user, index) => {
        const mapped = data.users[index % data.users.length];
        const [first, last] = mapped.name.split(" ");
        return {
          ...user,
          name: mapped.name,
          email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
          company: { name: mapped.course },
        };
      });

      setUsers(mappedUsers);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError("Failed to delete user. Please try again.");
    }
  };

  const handleSave = (user) => {
    if (editUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers([...users, user]);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="sort-icon" />;
    return sortConfig.direction === "asc" ? (
      <FaSortUp className="sort-icon active" />
    ) : (
      <FaSortDown className="sort-icon active" />
    );
  };

  const sortedUsers = [...users].sort((a, b) => {
    const [aFirst, aLast] = a.name.split(" ");
    const [bFirst, bLast] = b.name.split(" ");

    let aValue, bValue;

    switch (sortConfig.key) {
      case "firstName":
        aValue = aFirst || "";
        bValue = bFirst || "";
        break;
      case "lastName":
        aValue = aLast || "";
        bValue = bLast || "";
        break;
      case "email":
        aValue = a.email;
        bValue = b.email;
        break;
      case "department":
        aValue = a.company?.name || "";
        bValue = b.company?.name || "";
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const applyFilters = (user) => {
    const [firstName, lastName] = user.name.split(" ");
    if (
      filters.firstName &&
      !firstName?.toLowerCase().includes(filters.firstName.toLowerCase())
    )
      return false;
    if (
      filters.lastName &&
      !lastName?.toLowerCase().includes(filters.lastName.toLowerCase())
    )
      return false;
    if (
      filters.email &&
      !user.email.toLowerCase().includes(filters.email.toLowerCase())
    )
      return false;
    if (
      filters.department &&
      !user.company?.name
        .toLowerCase()
        .includes(filters.department.toLowerCase())
    )
      return false;
    return true;
  };

  const startIndex = (page - 1) * rowsPerPage;
  const paginatedUsers = sortedUsers
    .filter(
      (u) =>
        (u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())) &&
        applyFilters(u)
    )
    .slice(startIndex, startIndex + rowsPerPage);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="dashboard">
      <h1>User Management</h1>
      <p className="subtitle">
        Manage all users in one place. Control access, assign roles, and monitor
        activity.
      </p>

      <div className="toolbar">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="actions">
          <button className="filter-btn" onClick={() => setIsFilterOpen(true)}>
            <FaFilter /> Filter
          </button>
          <button
            className="add-btn"
            onClick={() => {
              setEditUser(null);
              setIsFormOpen(true);
            }}
          >
            <FaUserPlus /> Add User
          </button>
        </div>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th
              className={sortConfig.key === "firstName" ? "active" : ""}
              onClick={() => handleSort("firstName")}
            >
              First Name {getSortIcon("firstName")}
            </th>
            <th
              className={sortConfig.key === "lastName" ? "active" : ""}
              onClick={() => handleSort("lastName")}
            >
              Last Name {getSortIcon("lastName")}
            </th>
            <th
              className={sortConfig.key === "email" ? "active" : ""}
              onClick={() => handleSort("email")}
            >
              Email {getSortIcon("email")}
            </th>
            <th
              className={sortConfig.key === "department" ? "active" : ""}
              onClick={() => handleSort("department")}
            >
              Department {getSortIcon("department")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => {
            const [firstName, lastName] = user.name.split(" ");
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{firstName || ""}</td>
                <td>{lastName || ""}</td>
                <td>{user.email}</td>
                <td>{user.company?.name || "N/A"}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditUser(user);
                      setIsFormOpen(true);
                    }}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <span>
          Rows per page:
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </span>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          <FaArrowLeft /> Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() =>
            setPage((p) =>
              startIndex + rowsPerPage < users.length ? p + 1 : p
            )
          }
        >
          Next <FaArrowRight />
        </button>
      </div>

      <UserForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
        editUser={editUser}
      />

      <FilterPopup
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={setFilters}
      />
    </div>
  );
};

export default UserList;
