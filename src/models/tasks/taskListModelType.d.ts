import type { Task, ICreateTask, TUpdateTask } from "@models/tasks";
import { Attachment } from "@models/attachments";
import type { TTaskPriority, TTaskStatus } from "utils";

export interface ITaskListActions {
    // ###########################################################
    //                  GET TASKS METHODS
    // ###########################################################

    getAllTasks(): Task[];
    getExpiredTasks(): Task[];
    getCompletedTasks(): Task[];
    getPendingTasks(): Task[];
    getHighPriorityTasks(): Task[];
    getTasksByStatus(status: TTaskStatus): Task[];
    queryTasks(query: unknown): Task[];

    // ###########################################################
    //                CREATE, UPDATE, DELETE METHODS
    // ###########################################################

    addTask(params: ICreateTask): void;
    removeTask(taskId: string): void;
    updateTask(taskId: string, updatedTask: TUpdateTask): void;
    cleanCompletedTasks(): void;
    attachFile(attachment: Attachment, taskId: string): void;
    detachFile(attachmentId: string, taskId: string): void;

    // ###########################################################
    //                  STATUS METHODS
    // ###########################################################

    setStatus(taskId: string, newStatus: TTaskStatus): void;
    markAsCompleted(taskId: string): void;

    // ###########################################################
    //                  DEADLINE METHODS
    // ###########################################################

    setDeadline(taskId: string, newDeadline: Date): void;

    // ###########################################################
    //                  PRIORITY METHODS
    // ###########################################################

    setPriority(taskId: string, newPriority: TTaskPriority): void;

    // ###########################################################
    //                  TAGS METHODS
    // ###########################################################

    addTag(taskId: string, tag: string): void;
    removeTag(taskId: string, tag: string): void;
    getTags(): string[];
}