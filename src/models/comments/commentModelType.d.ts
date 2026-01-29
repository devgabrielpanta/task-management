import type { TId, IBaseEntity } from "../../types/globals";
import type { ITaskActions, ITaskListActions, Task } from "@models/tasks";
import type { IUserActions, IUserListActions, User } from "@models/users";

export interface ICreateComment {
    user: User;
    task: Task;
    comment: string;
    isParent: boolean;
}

interface ICommentActions {
    getComment(): TComment;
    isParentComment(): boolean;
    updateComment(updatedComment: TUpdateComment): void;
}

export type TCommentModel = IBaseEntity & ICommentActions;
export type TComment = IBaseEntity & ICreateComment;
export type TUpdateComment = Partial<Omit<TComment, 'id' | 'createdAt' | 'updatedAt'>>;