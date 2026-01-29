import type { Attachment } from "@models/attachments";
import type { TId } from "../../types/globals";
import type { ICreateTask, ITask, ITaskBase, TUpdateTask } from "@models/tasks";
import type { TTaskCategory, TTaskPriority, TTaskStatus } from "utils";
import { TaskCategory, TaskPriority, TaskStatus } from "utils";

export class Task implements ITask {
    // BaseEntity members
    public id: TId;
    public createdAt: Date;
    public updatedAt: Date;
    // Task members
    private title: string;
    private category: TTaskCategory;
    private status: TTaskStatus;
    private priority: TTaskPriority;
    private deadline: Date;
    private completed: boolean = false;
    private completedAt?: Date;
    private tags: string[] = [];
    private attachments: Attachment[] = [];

    constructor(params: ICreateTask) {
        this.title = params.title;
        this.category = params.category;
        this.status = params.status;
        this.priority = params.priority;
        this.deadline = params.deadline;
        this.tags = params.tags;
        this.id = new Date().getTime().toString();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    // ###########################################################
    //                  CRUD METHODS
    // ###########################################################

    public attachFile(attachment: Attachment): void {
        this.attachments.push(attachment);
        this.updatedAt = new Date();
    }

    public detachFile(attachmentId: TId): void {
        this.attachments = this.attachments.filter(att => att.id !== attachmentId);
        this.updatedAt = new Date();
    }

    public getTask(): ITaskBase {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            title: this.title,
            category: this.category,
            status: this.status,
            priority: this.priority,
            deadline: this.deadline,
            tags: this.tags,
            completed: this.completed,
            completedAt: this.completedAt,
            attachments: this.attachments,
        };
    }

    public updateTask(updatedTask: Partial<TUpdateTask>): void {
        for (const key in updatedTask) {
            (this as any)[key] = (updatedTask as any)[key];
        }
        this.updatedAt = new Date();
    }

    public handleQuery(query: unknown): boolean {
        if (Object.values(TaskCategory).includes(query as unknown as keyof typeof TaskCategory)) {
            return this.queryByCategory(query as TTaskCategory);
        }

        if (Object.values(TaskStatus).includes(query as unknown as keyof typeof TaskStatus)) {
            return this.queryByStatus(query as keyof typeof TaskStatus);
        }


        if (Object.values(TaskPriority).includes(query as unknown as keyof typeof TaskPriority)) {
            return this.queryByPriority(query as keyof typeof TaskPriority);
        }

        if (typeof query === "string") {
            return this.queryByTitle(query) || this.queryByTag(query);
        }
        return false;
    }

    // ###########################################################
    //                  QUERY HELPERS
    // ###########################################################

    private queryByTitle(query: string): boolean {
        return this.title.includes(query);
    }

    private queryByCategory(category: keyof typeof TaskCategory): boolean {
        return this.category === TaskCategory[category];
    }

    private queryByStatus(status: keyof typeof TaskStatus): boolean {
        return this.status === TaskStatus[status];
    }

    private queryByPriority(priority: keyof typeof TaskPriority): boolean {
        return this.priority === TaskPriority[priority];
    }

    private queryByTag(tag: string): boolean {
        return this.tags.includes(tag);
    }

    // ###########################################################
    //                  STATUS METHODS
    // ###########################################################
    public getStatus(): TTaskStatus {
        return this.status;
    }

    public setStatus(newStatus: TTaskStatus): void {
        this.status = newStatus;
        this.updatedAt = new Date();
    }

    public isCompleted(): boolean {
        return this.completed;
    }

    public markAsCompleted(): void {
        this.completed = true;
        this.completedAt = new Date();
        this.status = TaskStatus.COMPLETED;
        this.updatedAt = new Date();
    }

    // ###########################################################
    //                  DEADLINE METHODS
    // ###########################################################

    public setDeadline(newDeadline: Date): void {
        this.deadline = newDeadline;
        this.updatedAt = new Date();
    }

    public getDeadline(): Date {
        return this.deadline;
    }

    public isExpired(): boolean {
        const now = new Date();
        return now > this.deadline;
    }

    // ###########################################################
    //                  PRIORITY METHODS
    // ###########################################################

    public getPriority(): TTaskPriority {
        return this.priority;
    }

    public setPriority(newPriority: TTaskPriority): void {
        this.priority = newPriority;
        this.updatedAt = new Date();
    }

    public isHighPriority(): boolean {
        return this.priority === TaskPriority.HIGH || this.priority === TaskPriority.URGENT;
    }

    // ###########################################################
    //                  TAGS METHODS
    // ###########################################################

    public addTag(tag: string): void {
        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
            this.updatedAt = new Date();
        }
    }

    public removeTag(tag: string): void {
        const index = this.tags.indexOf(tag);
        if (index !== -1) {
            this.tags.splice(index, 1);
            this.updatedAt = new Date();
        }
    }

    public getTags(): string[] {
        return this.tags;
    }

}