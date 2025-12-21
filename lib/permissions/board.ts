// Permission utilities for board features
import { UserRole } from '@prisma/client';

export interface PermissionContext {
    userRole?: UserRole;
    userId?: string;
    isAuthenticated: boolean;
}

// View permissions
export function canViewBoard(context: PermissionContext): boolean {
    return true; // Public can view
}

// Post permissions
export function canCreatePost(context: PermissionContext): boolean {
    return context.isAuthenticated;
}

export function canEditPost(context: PermissionContext, postAuthorId: string): boolean {
    if (!context.isAuthenticated) return false;
    if (context.userRole === 'ADMIN') return true;
    return context.userId === postAuthorId;
}

export function canDeletePost(context: PermissionContext, postAuthorId: string): boolean {
    if (!context.isAuthenticated) return false;
    if (context.userRole === 'ADMIN') return true;
    return context.userId === postAuthorId;
}

// Moderation permissions
export function canPinPost(context: PermissionContext): boolean {
    if (!context.isAuthenticated) return false;
    return context.userRole === 'ADMIN' || context.userRole === 'TEACHER';
}

export function canModeratePost(context: PermissionContext): boolean {
    if (!context.isAuthenticated) return false;
    return context.userRole === 'ADMIN' || context.userRole === 'TEACHER';
}

// Report permissions
export function canReportPost(context: PermissionContext): boolean {
    return context.isAuthenticated;
}

export function canViewReports(context: PermissionContext): boolean {
    if (!context.isAuthenticated) return false;
    return context.userRole === 'ADMIN' || context.userRole === 'TEACHER';
}

// Edit history
export function canViewEditHistory(context: PermissionContext, postAuthorId: string): boolean {
    if (!context.isAuthenticated) return false;
    if (context.userRole === 'ADMIN') return true;
    return context.userId === postAuthorId;
}

// Reaction permissions
export function canReact(context: PermissionContext): boolean {
    return context.isAuthenticated;
}

// Comment permissions
export function canComment(context: PermissionContext): boolean {
    return context.isAuthenticated;
}

export function canDeleteComment(context: PermissionContext, commentAuthorId: string): boolean {
    if (!context.isAuthenticated) return false;
    if (context.userRole === 'ADMIN') return true;
    return context.userId === commentAuthorId;
}
