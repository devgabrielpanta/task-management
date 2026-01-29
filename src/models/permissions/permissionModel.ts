import type { PermissionMap } from "@models/permissions";
import type { ITaskActions, ITaskListActions } from "@models/tasks";
import type { IUserActions, IUserListActions } from "@models/users";
import { UserRole } from "@models/users";

const allUsers = [UserRole.ADMIN, UserRole.MANAGER, UserRole.MEMBER, UserRole.VIEWER];
const membersOnly = [UserRole.ADMIN, UserRole.MANAGER, UserRole.MEMBER];
const managersAndAdmins = [UserRole.ADMIN, UserRole.MANAGER];

// ###########################################################
//                  TASK PERMISSIONS
// ###########################################################
export const taskPermissions: PermissionMap<ITaskActions> = {
    // CRUD methods
    attachFile: membersOnly,
    detachFile: membersOnly,
    getTask: allUsers,
    updateTask: membersOnly,
    handleQuery: allUsers,

    // Status methods
    getStatus: allUsers,
    setStatus: membersOnly,
    isCompleted: allUsers,
    markAsCompleted: membersOnly,

    // Deadline methods
    getDeadline: allUsers,
    setDeadline: managersAndAdmins,
    isExpired: allUsers,

    // Priority methods
    getPriority: allUsers,
    setPriority: managersAndAdmins,
    isHighPriority: allUsers,

    // Tags methods
    getTags: allUsers,
    addTag: membersOnly,
    removeTag: managersAndAdmins,
}

// ###########################################################
//                  TASK LIST PERMISSIONS
// ###########################################################
export const taskListPermissions: PermissionMap<ITaskListActions> = {
    // GET TASKS METHODS
    getAllTasks: allUsers,
    getExpiredTasks: allUsers,
    getCompletedTasks: allUsers,
    getPendingTasks: allUsers,
    getHighPriorityTasks: allUsers,
    getTasksByStatus: allUsers,
    queryTasks: allUsers,

    // CREATE, UPDATE, DELETE METHODS
    addTask: membersOnly,
    removeTask: membersOnly,
    updateTask: membersOnly,
    cleanCompletedTasks: managersAndAdmins,
    attachFile: membersOnly,
    detachFile: membersOnly,

    // STATUS METHODS
    setStatus: membersOnly,
    markAsCompleted: membersOnly,

    // DEADLINE METHODS
    setDeadline: managersAndAdmins,

    // PRIORITY METHODS
    setPriority: managersAndAdmins,

    // TAGS METHODS
    addTag: membersOnly,
    removeTag: managersAndAdmins,
    getTags: allUsers,
}

// ###########################################################
//                  USER PERMISSIONS
// ###########################################################
export const userPermissions: PermissionMap<IUserActions> = {
    // CRUD METHODS
    getUser: allUsers,
    updateUser: managersAndAdmins,
    handleQuery: allUsers,

    // STATUS METHODS
    isActive: allUsers,
    toggleActive: managersAndAdmins,

    // ROLE METHODS
    getRole: allUsers,
    setRole: managersAndAdmins,
};

// ###########################################################
//                  USER LIST PERMISSIONS
// ###########################################################
export const userListPermissions: PermissionMap<IUserListActions> = {
    // GET USERS METHODS
    getUserById: allUsers,
    getAllUsers: allUsers,
    getActiveUsers: allUsers,
    getInactiveUsers: allUsers,
    queryUser: allUsers,

    // CREATE, UPDATE, DELETE METHODS
    addUser: managersAndAdmins,
    removeUser: managersAndAdmins,
    updateUser: managersAndAdmins,
    toggleActive: managersAndAdmins,

    // ROLE METHODS
    setAsAdmin: managersAndAdmins,
    setAsManager: managersAndAdmins,
    setAsMember: managersAndAdmins,
    setAsViewer: managersAndAdmins,
}

export class Permissions {
    static can<T>(
        permissions: PermissionMap<T>,
        action: keyof T,
        role: UserRole
    ) {
        const allowedRoles = permissions[action];

        if (!allowedRoles) {
            throw new Error(`Action "${String(action)}" is not defined in permissions.`);
        }

        if (!allowedRoles.includes(role)) {
            throw new Error(`Role "${UserRole[role]}" does not have permission to perform action "${String(action)}".`);
        }
    }

}