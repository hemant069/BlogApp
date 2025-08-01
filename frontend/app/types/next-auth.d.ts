// types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            backendToken?: string | null;
            mongoId?: string | null;
        };
    }

    interface User {
        id: string;
        backendToken?: string | null;
        mongoId?: string | null;
    }

    interface JWT {
        id: string;
        backendToken?: string | null;
        mongoId?: string | null;
        username?: string | null
    }
}
