import type { TId, IBaseEntity } from "../../types/globals";
import type { ITaskActions, ITaskListActions, Task } from "@models/tasks";
import type { IUserActions, IUserListActions, User } from "@models/users";

export type TLogExecution = keyof IUserActions | keyof IUserListActions | keyof ITaskActions | keyof ITaskListActions;

export interface ICreateLog {
    user: User;
    task?: Task;
    action: TLogExecution;
    success: boolean;
}

interface ILogActions {
    getLog(): TLog;
    updateLog(updatedLog: TUpdateLog): void;
    setLogTask(task: Task): void;
    isSuccessful(): boolean;
}

export type TLogModel = IBaseEntity & ILogActions;
export type TLog = IBaseEntity & ICreateLog;
export type TUpdateLog = Partial<Omit<TLog, 'id' | 'createdAt' | 'updatedAt'>>;