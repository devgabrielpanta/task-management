import type { ICreateLog, TLog, TLogExecution, TUpdateLog } from "@models/logs";
import type { ILogsListActions } from "@models/logs";
import { Task } from "@models/tasks";
import { Log } from "@models/logs";

export class LogList implements ILogsListActions {
    private logs: Log[] = [];

    // ###########################################################
    //                  GET METHODS
    // ###########################################################

    public getAllLogs(): TLog[] {
        return this.logs.map(log => log.getLog());
    }

    public getSuccessfulLogs(): TLog[] {
        return this.logs.filter(log => log.isSuccessful()).map(log => log.getLog());
    }

    public getFailedLogs(): TLog[] {
        return this.logs.filter(log => !log.isSuccessful()).map(log => log.getLog());
    }

    public getLogsByUser(userId: string): TLog[] {
        {
            return this.logs
                .filter(log => log.getLog().user.getId() === userId)
                .map(log => log.getLog());
        }
    }

    public getLogsByAction(action: TLogExecution): TLog[] {
        let filteredLogs: TLog[] = [];
        this.logs.forEach(log => {
            if (log.getLog().action === action) {
                filteredLogs.push(log.getLog());
            }
        });
        return filteredLogs;
    }

    public getLogsByTask(taskId: string): TLog[] {
        let filteredLogs: TLog[] = [];
        this.logs.forEach(log => {
            const logData = log.getLog();
            if (logData.task && logData.task.getId() === taskId) {
                filteredLogs.push(logData);
            }
        });
        return filteredLogs;
    }

    // ###########################################################
    //                CREATE, UPDATE, DELETE METHODS
    // ###########################################################

    public addLog(log: ICreateLog): void {
        const newLog = new Log(log);
        this.logs.push(newLog);
    }

    public removeLog(logId: string): void {
        this.logs = this.logs.filter(log => log.getLog().id !== logId);
    }

    public updateLog(logId: string, updatedLog: TUpdateLog): void {
        const log = this.logs.find(log => log.getLog().id === logId);
        if (log) {
            log.updateLog(updatedLog);
        }
    }

    public setLogTask(logId: string, task: Task): void {
        const log = this.logs.find(log => log.getLog().id === logId);
        if (log) {
            log.setLogTask(task);
        }
    }

}