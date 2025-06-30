import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // You can now access decoded token fields like token.email, token.sub, etc.
    return res.status(200).json({ message: "Authorized", token });
}
