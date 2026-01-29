import { userList, taskList } from "@main";
import { TaskStatus } from "@models/tasks";

type TasksByStatus = {
    [key in TaskStatus]: number;
};

export function countUsers(): number {
    return userList.getAllUsers().length;
}

export function countTasks(): number {
    return taskList.getAllTasks().length;
}

export function countCompletedTasks(): number {
    return taskList.getCompletedTasks().length;
}

export function countActiveTasks(): number {
    return taskList.getPendingTasks().length;
}

export function tasksByStatus(): TasksByStatus {
    return Object.values(TaskStatus)
        .filter((v): v is TaskStatus => typeof v === 'number') // Type guard to ensure we only have indexes of TaskStatus
        .reduce((acc, status) => {
            acc[status] = taskList.getTasksByStatus(status).length;
            return acc;
        }, {} as TasksByStatus);
}