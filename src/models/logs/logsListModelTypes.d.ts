import type { ICreateLog, TLog, TLogExecution, TUpdateLog } from "@models/logs";
import { Task } from "@models/tasks";
import { Log } from "@models/logs"

export interface ILogsListActions {
    // ###########################################################
    //                  GET METHODS
    // ###########################################################

    getAllLogs(): TLog[];
    getSuccessfulLogs(): TLog[];
    getFailedLogs(): TLog[];
    getLogsByUser(userId: string): TLog[];
    getLogsByAction(action: string): TLog[];
    getLogsByTask(taskId: string): TLog[];

    // ###########################################################
    //                CREATE, UPDATE, DELETE METHODS
    // ###########################################################

    addLog(log: ICreateLog): void;
    removeLog(logId: string): void;
    updateLog(logId: string, updatedLog: TUpdateLog): void;
    setLogTask(logId: string, task: Task): void;
}