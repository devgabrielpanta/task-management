import type { Attachment } from "@models/attachments";
import { EntityList } from "@models/base-entity";
import { Task } from "@models/tasks";
import type { TTaskPriority, TTaskStatus } from "utils";
import { TaskPriority, TaskStatus } from "utils";

export class TaskList extends EntityList<Task> {
    private tags: string[] = [];

    // ###########################################################
    //                  GET TASKS METHODS
    // ###########################################################

    public getExpiredTasks(): Task[] {
        return this.getAll().filter(task => task.isExpired());
    }

    public getCompletedTasks(): Task[] {
        return this.getAll().filter(task => task.isCompleted());
    }

    public getPendingTasks(): Task[] {
        return this.getAll().filter(task => !task.isCompleted());
    }

    public getHighPriorityTasks(): Task[] {
        return this.getAll().filter(task => task.isHighPriority());
    }

    public getTasksByStatus(status: TTaskStatus): Task[] {
        return this.getAll().filter(task => task.getStatus() === TaskStatus[status]);
    }

    public queryTasks(query: unknown): Task[] {
        return this.getAll().filter(task => task.handleQuery(query));
    }

    // ###########################################################
    //                CREATE, UPDATE, DELETE METHODS
    // ###########################################################

    public cleanCompletedTasks(): void {
        this.getAll()
            .filter(task => task.isCompleted())
            .forEach(task => this.delete(task.getId()));
    }

    public attachFile(attachment: Attachment, taskId: string): void {
        const task = this.getAll().find(t => t.getId() === taskId);
        if (task) {
            task.attachFile(attachment);
        }
    }

    public detachFile(attachmentId: string, taskId: string): void {
        const task = this.getAll().find(t => t.getId() === taskId);
        if (task) {
            task.detachFile(attachmentId);
        }
    }

    // ###########################################################
    //                  STATUS METHODS
    // ###########################################################
    public setStatus(taskId: string, newStatus: TTaskStatus): void {
        const task = this.getAll().find(t => t.getId() === taskId);
        if (task) {
            task.setStatus(TaskStatus[newStatus]);
        }
    }

    public markAsCompleted(taskId: string): void {
        const task = this.getAll().find(t => t.getId() === taskId);
        if (task) {
            task.markAsCompleted();
        }
    }

    // ###########################################################
    //                  DEADLINE METHODS
    // ###########################################################

    public setDeadline(taskId: string, newDeadline: Date): void {
        const task = this.getAll().find(t => t.getId() === taskId);
        if (task) {
            task.setDeadline(newDeadline);
        }
    }

    // ###########################################################
    //                  PRIORITY METHODS
    // ###########################################################

    public setPriority(taskId: string, newPriority: TTaskPriority): void {
        const task = this.getAll().find(t => t.getId() === taskId);
        if (task) {
            task.setPriority(TaskPriority[newPriority]);
        }
    }

    // ###########################################################
    //                  TAGS METHODS
    // ###########################################################

    public addTag(taskId: string, tag: string): void {
        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
        }
        const task = this.getAll().find(t => t.getId() === taskId);
        if (task) {
            task.addTag(tag);
        }
    }

    public removeTag(taskId: string, tag: string): void {
        const task = this.getAll().find(t => t.getId() === taskId);
        if (task) {
            task.removeTag(tag);
            const isTagUsed = this.getAll().some(t => t.getTags().includes(tag));
            if (!isTagUsed) {
                this.tags = this.tags.filter(t => t !== tag);
            }
        }
    }

    public getTags(): string[] {
        return this.tags;
    }

}