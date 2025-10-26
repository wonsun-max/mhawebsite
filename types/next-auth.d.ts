import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      koreanName?: string | null;
      birthdate?: Date | null;
      gender?: string | null;
      role?: string | null;
      grade?: number | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    koreanName?: string | null;
    birthdate?: Date | null;
    gender?: string | null;
    role?: string | null;
    grade?: number | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    koreanName?: string | null;
    birthdate?: Date | null;
    gender?: string | null;
    role?: string | null;
    grade?: number | null;
  }
}