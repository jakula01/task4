export default function Header({ onLogout, userData }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>User Management</h2>
      <div className="d-flex align-items-center gap-3">
        <div className="text-end" style={{ minWidth: "150px" }}>
          <h6 className="mb-1" style={{ fontWeight: "600", color: "#495057" }}>
            {userData?.email}
          </h6>
          <small className="text-muted">{userData?.userIndex}</small>
        </div>
        <button className="btn btn-outline-secondary" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
