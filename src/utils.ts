export const UserRole = {
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    MEMBER: 'MEMBER',
    VIEWER: 'VIEWER'
} as const;

export type TUserRole =
    typeof UserRole[keyof typeof UserRole];

export const TaskCategory = {
    FRONTEND: 'FRONTEND',
    BACKEND: 'BACKEND',
    DATABASE: 'DATABASE',
} as const;

export type TTaskCategory =
    typeof TaskCategory[keyof typeof TaskCategory];


export const TaskPriority = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    URGENT: 'URGENT',
} as const;

export type TTaskPriority =
    typeof TaskPriority[keyof typeof TaskPriority];

export const TaskStatus = {
    CREATED: 'CREATED',
    ASSIGNED: 'ASSIGNED',
    IN_PROGRESS: 'IN_PROGRESS',
    BLOCKED: 'BLOCKED',
    COMPLETED: 'COMPLETED',
    ARCHIVED: 'ARCHIVED'
} as const;

export type TTaskStatus =
    typeof TaskStatus[keyof typeof TaskStatus];