import wretch from "wretch";

// Base instance
const api = wretch(process.env.BACKEND_URL);

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