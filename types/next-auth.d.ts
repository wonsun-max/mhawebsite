import { DefaultSession, DefaultUser } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            username: string
            koreanName?: string | null
            role: string
            birthdate?: Date | null
            gender?: string | null
            grade?: number | null
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        username: string
        koreanName?: string | null
        role: string
        birthdate?: Date | null
        gender?: string | null
        grade?: number | null
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string
        username: string
        koreanName?: string | null
        role: string
        birthdate?: Date | null
        gender?: string | null
        grade?: number | null
    }
}
