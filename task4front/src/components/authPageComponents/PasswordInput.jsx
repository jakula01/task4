import React from "react";

export default function PasswordInput({
  showPassword,
  setShowPassword,
  password,
  setPassword,
}) {
  return (
    <div className="input-group mb-3">
      <input
        type={showPassword ? "text" : "password"}
        className="form-control border-end-0"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <span
        className="input-group-text bg-white border-start-0"
        style={{ cursor: "pointer" }}
        onClick={() => setShowPassword(!showPassword)}
      >
        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
      </span>
    </div>
  );
}
