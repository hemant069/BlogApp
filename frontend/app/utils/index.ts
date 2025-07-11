import axios from 'axios';

import { getSession, } from 'next-auth/react';
import type { Session } from "next-auth";

const baseUrl: string | null = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:8000/api";


// Function to set up axios with current session token
export const setupAxiosAuth = async () => {
    try {
        const session: Session | null = await getSession();

        if (session?.user?.backendToken) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${session?.user?.backendToken}`;
            console.log("Token set:", session?.user?.backendToken);
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



export default axios;