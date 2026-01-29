import type { ICreateComment, TComment, TCommentModel, TUpdateComment } from "@models/comments";
import type { Task } from "@models/tasks";
import type { User } from "@models/users";

export class Comment implements TCommentModel {
    id: string;
    createdAt: Date;
    updatedAt: Date;

    user: User;
    task: Task;
    comment: string;

    isParent: boolean;

    constructor(params: ICreateComment) {
        this.id = new Date().getTime().toString();
        this.createdAt = new Date();
        this.updatedAt = new Date();

        this.user = params.user;
        this.task = params.task;
        this.comment = params.comment;
        this.isParent = params.isParent;
    }

    getComment(): TComment {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            user: this.user,
            task: this.task,
            comment: this.comment,
            isParent: this.isParent
        };
    }

    isParentComment(): boolean {
        return this.isParent;
    }

    updateComment(updatedComment: TUpdateComment): void {
        for (const key in updatedComment) {
            if (Object.prototype.hasOwnProperty.call(updatedComment, key)) {
                (this as any)[key] = (updatedComment as any)[key];
            }
        }
        this.updatedAt = new Date();
    }

}