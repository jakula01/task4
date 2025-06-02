import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import backImg from "../Imgs/back.png";
import logo from "../Imgs/logo.png";
import { login as loginApi, register as registerApi } from "../api/AuthService";
import { AuthContext } from "../contexts/AuthContext";
import AuthForm from "../components/authPageComponents/AuthForm";
import AuthToggle from "../components/authPageComponents/AuthToggle";
import ErrorAlert from "../components/authPageComponents/ErrorAlert";
import { toast } from "react-toastify";
export default function AuthPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = isLogin
        ? await loginApi(email, password)
        : await registerApi(email, password, name, company);
      login(data.token, {
        email: data.user.email,
        userIndex: data.user.user_index,
      });
      navigate("/admin");
    } catch (err) {
      toast.error(err.message);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      <div className="row flex-grow-1 w-100">
        <div
          className="col-md-6 d-flex flex-column p-5"
          style={{ height: "100vh" }}
        >
          <div className="mb-4">
            <img src={logo} alt="Logo" style={{ width: "15vw" }} />
          </div>
          <div
            className="mt-auto mb-auto w-100"
            style={{ maxWidth: "300px", margin: "0 auto" }}
          >
            <h5 className="text-secondary">Start your journey</h5>
            <h2 className="mb-4">
              {isLogin ? "Sign In to The App" : "Sign Up to The App"}
            </h2>
            <ErrorAlert message={error} />
            <AuthForm
              isLogin={isLogin}
              email={email}
              password={password}
              name={name}
              company={company}
              showPassword={showPassword}
              setEmail={setEmail}
              setPassword={setPassword}
              setName={setName}
              setCompany={setCompany}
              setShowPassword={setShowPassword}
              handleSubmit={handleSubmit}
            />
            <AuthToggle
              isLogin={isLogin}
              toggleMode={() => setIsLogin(!isLogin)}
            />
          </div>
        </div>
        <div
          className="col-md-6 d-none d-md-block"
          style={{
            backgroundImage: `url(${backImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    </div>
  );
}
