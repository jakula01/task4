export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("token");
      setTimeout(() => {
        window.location.href = "/auth";
      }, 2000);
      throw new Error(
        res.status === 401
          ? "Your account has been deleted"
          : "Your account has been blocked"
      );
    }

    return res;
  } catch (error) {
    throw error;
  }
};
