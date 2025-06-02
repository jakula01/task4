import { use } from "react";

export default function UserRow({ user, isSelected, onSelect }) {
  return (
    <tr className={user.status === "blocked" ? "text-muted" : ""}>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(user.id)}
        />
      </td>
      <td>
        <div
          className={
            user.status === "blocked" ? "text-decoration-line-through" : ""
          }
        >
          {user.name}
        </div>
        <small className="text-muted">
          {user.company === "" ? "N/A" : user.company}
        </small>
      </td>
      <td className={user.status === "blocked" ? "text-muted" : ""}>
        {user.email}
      </td>
      <td>{new Date(user.last_seen).toLocaleString()}</td>
    </tr>
  );
}
