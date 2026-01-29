import type { Task } from "@models/tasks";
import type { User } from "@models/users";
import type { TAssignment } from "@models/assignments";

export interface IAssignmentList {
    getAssignments(): TAssignment[];
    getUserAssignments(user: User): TAssignment[];
    getTaskAssignments(task: Task): TAssignment[];
    assignTaskToUser(user: User, task: Task): void;
    unassignTaskFromUser(user: User, task: Task): void;

    userIsAssignedToTask(user: User, task: Task): boolean;
    taskIsAssignedToUser(task: Task, user: User): boolean;

    userHasAssignments(user: User): boolean;
    taskHasAssignments(task: Task): boolean;

    deleteTaskAssignments(task: Task): void;
    deleteUserAssignments(user: User): void;
}