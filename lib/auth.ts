import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import { AuthOptions, Session, User } from "next-auth"
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import bcrypt from 'bcryptjs';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Please provide both username/email and password.");
        }

        // Allow login with either username OR email
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { username: credentials.username },
              { email: credentials.username }
            ]
          },
        });

        if (!user) {
          throw new Error("해당 아이디 또는 이메일의 사용자를 찾을 수 없습니다.");
        }

        // Check user status
        if (user.status !== 'ACTIVE') {
          if (user.status === 'PENDING') {
            throw new Error("관리자 승인 대기 중인 계정입니다. 관리자에게 문의하세요.");
          }
          if (user.status === 'SUSPENDED') {
            throw new Error("정지된 계정입니다. 관리자에게 문의하세요.");
          }
          throw new Error("활성화되지 않은 계정입니다. 관리자에게 문의하세요.");
        }

        if (!user.passwordHash) {
          throw new Error("이 계정은 비밀번호 로그인을 지원하지 않습니다 (소셜 로그인 이용).");
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isValid) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          koreanName: user.koreanName,
          role: user.role,
        };
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.koreanName = token.koreanName;
        session.user.birthdate = token.birthdate ? new Date(token.birthdate) : null;
        session.user.gender = token.gender;
        session.user.role = token.role;
        session.user.grade = token.grade;
        session.user.image = token.image as string | null | undefined;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User | AdapterUser }) {
      if (!token.email) {
        return token;
      }

      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        username: dbUser.username,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
        koreanName: dbUser.koreanName,
        birthdate: dbUser.birthdate,
        gender: dbUser.gender,
        role: dbUser.role,
        grade: dbUser.grade,
      };
    },
  },
}
