import axios from 'axios';
import { getSession } from 'next-auth/react';

const baseUrl: string | null = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:8000/api";
//const baseUrl: string = "http://localhost:8000/api";

// Function to set up axios with current session token
export const setupAxiosAuth = async () => {
    try {
        const session = await getSession();

        if (session?.backendToken) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${session.backendToken}`;
            console.log("Token set:", session.backendToken);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            console.log("No token found");
        }

        axios.defaults.withCredentials = true;
        axios.defaults.baseURL = baseUrl;

    } catch (error) {
        console.error("Error setting up auth:", error);
    }
};

// Usage in components:
// await setupAxiosAuth();
// const response = await axios.get('/protected-route');

export default axios;