import React from "react";
import PasswordInput from "./PasswordInput";

export default function AuthForm({
  isLogin,
  email,
  password,
  name,
  company,
  showPassword,
  setEmail,
  setPassword,
  setName,
  setCompany,
  setShowPassword,
  handleSubmit,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-100"
      style={{ maxWidth: "300px" }}
    >
      {!isLogin && (
        <>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </>
      )}
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <PasswordInput
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        password={password}
        setPassword={setPassword}
      />
      <button type="submit" className="btn btn-primary w-100">
        {isLogin ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}
