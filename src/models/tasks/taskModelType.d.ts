import type { Attachment } from "@models/attachments";
import type { TId, IBaseEntity } from "../../types/globals";
import { TaskStatus, TaskPriority, TaskCategory } from "@models/tasks";

export interface ICreateTask {
    title: string;
    category: TaskCategory;
    status: TaskStatus;
    priority: TaskPriority;
    deadline: Date;
    tags: string[];
}

export interface ITaskBase extends IBaseEntity, ICreateTask {
    completed: boolean;
    completedAt?: Date;
    attachments: Attachment[];
}

export type TUpdateTask = Omit<Partial<ITaskBase>, 'id' | 'createdAt' | 'updatedAt'>;

export interface ITaskActions {
    // ###########################################################
    //                  CRUD METHODS
    // ###########################################################

    attachFile(attachment: Attachment): void;
    detachFile(attachmentId: TId): void;
    getTask(): ITaskBase;
    updateTask(taskId: string, updatedTask: TUpdateTask): void;
    handleQuery(query: unknown): boolean;

    // ###########################################################
    //                  STATUS METHODS
    // ###########################################################

    getStatus(): TaskStatus;
    setStatus(newStatus: TaskStatus): void;
    isCompleted(): boolean;
    markAsCompleted(): void;

    // ###########################################################
    //                  DEADLINE METHODS
    // ###########################################################

    getDeadline(): Date;
    setDeadline(newDeadline: Date): void;
    isExpired(): boolean;

    // ###########################################################
    //                  PRIORITY METHODS
    // ###########################################################

    getPriority(): TaskPriority;
    setPriority(newPriority: TaskPriority): void;
    isHighPriority(): boolean;

    // ###########################################################
    //                  TAGS METHODS
    // ###########################################################

    getTags(): string[];
    addTag(tag: string): void;
    removeTag(tag: string): void;
}

export interface ITask implements IBaseEntity, ITaskActions { }

