import type { UserRole } from "@models/users";

export type PermissionMap<T> = Record<keyof T, UserRole[]>;