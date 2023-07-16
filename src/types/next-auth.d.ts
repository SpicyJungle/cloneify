import NextAuth from "next-auth";

declare module 'next-auth' {
    interface User {
        accessToken: string,
        refreshToken: string,
    }

    interface Session {
        accessToken: string,
        refreshToken: string,
        id?: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        accessToken: string,
        refreshToken: string
    }
}