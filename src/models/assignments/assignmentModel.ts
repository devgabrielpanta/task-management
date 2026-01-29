import type { TAssignmentModel, TAssignment } from "@models/assignments";
import { User } from "@models/users";
import { Task } from "@models/tasks";

export class Assignment implements TAssignmentModel {
    id: string;
    createdAt: Date;
    updatedAt: Date;

    user: User;
    task: Task;

    constructor(params: { user: User; task: Task }) {
        this.user = params.user;
        this.task = params.task;

        this.id = new Date().getTime().toString();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    getAssignment(): TAssignment {
        return {
            id: this.id,
            user: this.user,
            task: this.task,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}