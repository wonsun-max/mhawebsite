import { UserRole } from "@prisma/client";
import { Session } from "next-auth";

// Define permissions for each role
export const ROLE_PERMISSIONS = {
  [UserRole.ADMIN]: {
    // Admin can do everything
    canReadAll: true,
    canWriteAll: true,
    canDeleteAll: true,
    canManageUsers: true,
    canManageContent: true,
  },
  [UserRole.TEACHER]: {
    canReadAll: true,
    canWriteOwn: true,
    canDeleteOwn: true,
    canManageContent: false,
    canManageUsers: false,
  },
  [UserRole.STUDENT]: {
    canReadPublic: true,
    canReadBoard: true, // Can read free board if logged in
    canWriteBoard: true, // Can write to free board
    canDeleteOwn: true,
    canManageContent: false,
    canManageUsers: false,
  },
  [UserRole.PARENT]: {
    canReadPublic: true,
    canReadAll: false,
    canWriteOwn: false,
    canDeleteOwn: false,
    canManageContent: false,
    canManageUsers: false,
  },
  [UserRole.GUEST]: {
    canReadPublic: true,
    canReadAll: false,
    canWriteOwn: false,
    canDeleteOwn: false,
    canManageContent: false,
    canManageUsers: false,
  },
};

// Check if user has permission
export function hasPermission(
  session: Session | null,
  permission: string
): boolean {
  if (!session?.user?.role) return false;

  const role = session.user.role;
  const permissions = ROLE_PERMISSIONS[role];

  return (permissions as any)[permission] === true;
}

// Check if user is admin
export function isAdmin(session: Session | null): boolean {
  return session?.user?.role === UserRole.ADMIN;
}

// Check if user is teacher or admin
export function isTeacherOrAdmin(session: Session | null): boolean {
  return (
    session?.user?.role === UserRole.ADMIN ||
    session?.user?.role === UserRole.TEACHER
  );
}

// Check if user is logged in
export function isAuthenticated(session: Session | null): boolean {
  return !!session?.user;
}

// Check if user can edit/delete content
export function canModifyContent(
  session: Session | null,
  authorId: string
): boolean {
  if (!session?.user) return false;

  // Admin can modify anything
  if (session.user.role === UserRole.ADMIN) return true;

  // Users can modify their own content
  return session.user.id === authorId;
}

// Check if user can read board content (free board requires login)
export function canReadBoard(session: Session | null): boolean {
  return isAuthenticated(session);
}

// Check if user can write to board
export function canWriteBoard(session: Session | null): boolean {
  if (!session?.user) return false;

  const role = session.user.role;
  return (
    role === UserRole.ADMIN ||
    role === UserRole.TEACHER ||
    role === UserRole.STUDENT
  );
}

// Check if user can manage announcements
export function canManageAnnouncements(session: Session | null): boolean {
  return session?.user?.role === UserRole.ADMIN;
}

// Check if user can manage albums
export function canManageAlbums(session: Session | null): boolean {
  return session?.user?.role === UserRole.ADMIN;
}

// Check if user can manage resources
export function canManageResources(session: Session | null): boolean {
  return session?.user?.role === UserRole.ADMIN;
}
