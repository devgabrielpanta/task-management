import { userList, taskList, assignmentList } from "@main";
import type { IUser } from "@models/users";
import type { ITask } from "@models/tasks";
import type { TAssignment } from "@models/assignments";

export function backupAll() {
    backupUsers();
    backupTasks();
    backupAssignments();
}

export function backupUsers(): IUser[] {
    return userList.getAll();
}

export function backupTasks(): ITask[] {
    return taskList.getAll();
}

export function backupAssignments(): TAssignment[] {
    return assignmentList.getAssignments();
}