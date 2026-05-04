import wretch from "wretch";

// Base instance
const api = wretch("http://localhost:5000");

// Helper to add token
export const withAuth = () => {
    const token = typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    console.log("TOKEN:", token);

    return token
        ? api.auth(`Bearer ${token}`)
        : api;
};

export default api;