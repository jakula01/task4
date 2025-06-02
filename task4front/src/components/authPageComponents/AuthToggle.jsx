import React from "react";

export default function AuthToggle({ isLogin, toggleMode }) {
  return (
    <div className="d-flex justify-content-between mt-4">
      <div>
        {isLogin ? `Don't have an account? ` : "Already have an account? "}
        <button onClick={toggleMode} className="btn btn-link p-0">
          {isLogin ? "Sign up" : "Sign in"}
        </button>
      </div>
      <div>
        <a href="#" className="btn btn-link p-0">
          Forgot password?
        </a>
      </div>
    </div>
  );
}
