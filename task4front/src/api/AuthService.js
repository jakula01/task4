const API_URL = "http://localhost:5000/api"; // твой backend

export const register = async (email, password, name, company) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, company }),
  });
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Registration failed");
  return data;
};

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
};

export const logout = async () => {
  const token = localStorage.getItem("token");
  await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  localStorage.removeItem("token");
};