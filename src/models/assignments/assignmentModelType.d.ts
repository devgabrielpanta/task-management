import type { TId, IBaseEntity } from "../../types/globals";
import type { ITaskActions, ITaskListActions, Task } from "@models/tasks";
import type { IUserActions, IUserListActions, User } from "@models/users";

export interface ICreateAssignment {
    user: User;
    task: Task;
}

interface IAssignmentActions {
    getAssignment(): TAssignment;
}

export type TAssignmentModel = IBaseEntity & IAssignmentActions;
export type TAssignment = IBaseEntity & ICreateAssignment;
export type TUpdateAssignment = Partial<Omit<TAssignment, 'id' | 'createdAt' | 'updatedAt'>>;