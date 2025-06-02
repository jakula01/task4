import { fetchWithAuth } from "./apiHelper";
import { toast } from "react-toastify";
const API_URL = process.env.REACT_APP_API_URL;

export const getUsers = async () => {
  try {
    const res = await fetchWithAuth(`${API_URL}/get`, { method: "GET" });

    if (!res.ok) throw new Error("Failed to load users");

    return await res.json();
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateUserStatus = async (ids, status) => {
  try {
    const res = await fetchWithAuth(`${API_URL}/update-status`, {
      method: "POST",
      body: JSON.stringify({ ids, status }),
    });

    if (!res.ok) throw new Error("Failed to update user status");

    toast.success(status === "blocked" ? "Blocked" : "Unblocked");
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteUsersByIds = async (ids) => {
  try {
    const res = await fetchWithAuth(`${API_URL}/delete`, {
      method: "POST",
      body: JSON.stringify({ ids }),
    });

    if (!res.ok) throw new Error("Failed to delete users");

    toast.success("Deleted");
  } catch (error) {
    toast.error(error.message);
  }
};
