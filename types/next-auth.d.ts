import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      profileId: string;
      isFirstLogin: boolean;
    };
  }

  export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    profileId: string;
    isFirstLogin: boolean;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
    profileId: string;
    isFirstLogin: boolean;
  }
}
