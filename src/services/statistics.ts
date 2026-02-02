import { userList, taskList } from "@main";
import { TaskStatus } from "utils";
import type { TTaskStatus } from "utils";

type TasksByStatus = {
    [key in TTaskStatus]: number;
};

export function countUsers(): number {
    return userList.getAll().length;
}

export function countTasks(): number {
    return taskList.getAll().length;
}

export function countCompletedTasks(): number {
    return taskList.getCompletedTasks().length;
}

export function countActiveTasks(): number {
    return taskList.getPendingTasks().length;
}

export function tasksByStatus(): TasksByStatus {
    return Object.values(TaskStatus)
        .filter((v): v is TTaskStatus => typeof v === 'number') // Type guard to ensure we only have indexes of TaskStatus
        .reduce((acc, status) => {
            acc[status] = taskList.getTasksByStatus(status).length;
            return acc;
        }, {} as TasksByStatus);
}