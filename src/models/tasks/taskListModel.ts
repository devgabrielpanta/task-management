import type { Attachment } from "@models/attachments";
import type { ICreateTask, TUpdateTask, ITaskListActions } from "@models/tasks";
import { Task } from "@models/tasks";
import type { TTaskPriority, TTaskStatus } from "utils";
import { TaskPriority, TaskStatus } from "utils";

export class TaskList implements ITaskListActions {
    private tasks: Task[] = [];
    private tags: string[] = [];

    // ###########################################################
    //                  GET TASKS METHODS
    // ###########################################################

    public getAllTasks(): Task[] {
        return this.tasks;
    }

    public getExpiredTasks(): Task[] {
        return this.tasks.filter(task => task.isExpired());
    }

    public getCompletedTasks(): Task[] {
        return this.tasks.filter(task => task.isCompleted());
    }

    public getPendingTasks(): Task[] {
        return this.tasks.filter(task => !task.isCompleted());
    }

    public getHighPriorityTasks(): Task[] {
        return this.tasks.filter(task => task.isHighPriority());
    }

    public getTasksByStatus(status: TTaskStatus): Task[] {
        return this.tasks.filter(task => task.getStatus() === TaskStatus[status]);
    }

    public queryTasks(query: unknown): Task[] {
        return this.tasks.filter(task => task.handleQuery(query));
    }

    // ###########################################################
    //                CREATE, UPDATE, DELETE METHODS
    // ###########################################################

    public addTask(params: ICreateTask): void {
        const newTask = new Task(params);
        this.tasks.push(newTask);
    }

    public removeTask(taskId: string): void {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    public updateTask(taskId: string, updatedTask: TUpdateTask): void {
        const index = this.tasks.findIndex(task => task.id === taskId);
        if (index !== -1) {
            this.tasks[index].updateTask(updatedTask);
        }
    }

    public cleanCompletedTasks(): void {
        this.tasks = this.tasks.filter(task => !task.isCompleted());
    }

    public attachFile(attachment: Attachment, taskId: string): void {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.attachFile(attachment);
        }
    }

    public detachFile(attachmentId: string, taskId: string): void {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.detachFile(attachmentId);
        }
    }

    // ###########################################################
    //                  STATUS METHODS
    // ###########################################################
    public setStatus(taskId: string, newStatus: TTaskStatus): void {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.setStatus(TaskStatus[newStatus]);
        }
    }

    public markAsCompleted(taskId: string): void {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.markAsCompleted();
        }
    }

    // ###########################################################
    //                  DEADLINE METHODS
    // ###########################################################

    public setDeadline(taskId: string, newDeadline: Date): void {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.setDeadline(newDeadline);
        }
    }

    // ###########################################################
    //                  PRIORITY METHODS
    // ###########################################################

    public setPriority(taskId: string, newPriority: TTaskPriority): void {
        const task = this.tasks.find(t => t.id === taskId);
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
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.addTag(tag);
        }
    }

    public removeTag(taskId: string, tag: string): void {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.removeTag(tag);
            const isTagUsed = this.tasks.some(t => t.getTags().includes(tag));
            if (!isTagUsed) {
                this.tags = this.tags.filter(t => t !== tag);
            }
        }
    }

    public getTags(): string[] {
        return this.tags;
    }

}