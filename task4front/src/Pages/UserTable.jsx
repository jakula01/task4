import React, { useContext, useState, useEffect, useRef } from "react";
import Header from "../components/adminPageComponents/Header";
import Toolbar from "../components/adminPageComponents/Toolbar";
import UserRow from "../components/adminPageComponents/UserRow";
import { AuthContext } from "../contexts/AuthContext";
import { logout as logoutApi } from "../api/AuthService";
import {
  getUsers,
  updateUserStatus,
  deleteUsersByIds,
} from "../api/UsersService";
import { toast } from "react-toastify";
export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const selectAllRef = useRef();
  const { logout } = useContext(AuthContext);
  const [sortOrder, setSortOrder] = useState("desc");
  const { userData } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await logoutApi();
      logout();
    } catch (err) {
      toast.error("Logout failed", err);
    }
  };

  const filteredUsers = users
    .slice()
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.last_seen) - new Date(b.last_seen)
        : new Date(b.last_seen) - new Date(a.last_seen)
    )
    .filter(
      (u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };
  const allFilteredSelected =
    filteredUsers.length > 0 &&
    filteredUsers.every((u) => selectedIds.includes(u.id));

  const someSelected =
    filteredUsers.some((u) => selectedIds.includes(u.id)) &&
    !allFilteredSelected;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response);
      } catch (err) {
        console.error("Error on loading users:", err);
      }
    };

    fetchUsers();
  }, []);
  const updateStatus = async (status) => {
    try {
      await updateUserStatus(selectedIds, status);
      setUsers((prev) =>
        prev.map((user) =>
          selectedIds.includes(user.id) ? { ...user, status } : user
        )
      );
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
    }
  };
  const deleteUsers = async () => {
    try {
      await deleteUsersByIds(selectedIds);
      setUsers((prev) => prev.filter((user) => !selectedIds.includes(user.id)));
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected;
    }
  }, [someSelected, allFilteredSelected]);

  const toggleSelectAll = () => {
    if (allFilteredSelected || selectedIds.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredUsers.map((u) => u.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="container py-4">
      <Header onLogout={handleLogout} userData={userData} />
      <Toolbar
        selectedCount={selectedIds.length}
        onBlock={() => updateStatus("blocked")}
        onUnblock={() => updateStatus("active")}
        onDelete={deleteUsers}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>
              <input
                type="checkbox"
                ref={selectAllRef}
                onChange={toggleSelectAll}
                checked={allFilteredSelected}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th onClick={toggleSortOrder} style={{ cursor: "pointer" }}>
              Last seen{" "}
              {sortOrder === "asc" ? <span>&uarr;</span> : <span>&darr;</span>}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              isSelected={selectedIds.includes(user.id)}
              onSelect={toggleSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
