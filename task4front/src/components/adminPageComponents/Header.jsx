export default function Header({ onLogout, userData }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>User Management</h2>
      <div className="d-flex align-items-center">
        <span className="me-3 text-muted">{userData.email}</span>
        <button className="btn btn-outline-secondary" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
