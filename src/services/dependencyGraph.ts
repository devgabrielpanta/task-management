import type { Task } from "@models/tasks";
import type { TId } from "types/globals";
import { taskList } from "@main";

export class DependencyGraph {
    private graph: Map<TId, TId[]> = new Map();

    addDependency(item: Task, dependsOn: Task): void {
        if (!this.graph.has(item.getId())) {
            this.graph.set(item.getId(), [dependsOn.getId()]);
        } else {
            this.graph.get(item.getId())?.push(dependsOn.getId());
        }
    }

    getDependencies(item: Task): Task[] {
        const dependencies: Task[] = [];
        const dependsOnIds = this.graph.get(item.getId());
        if (dependsOnIds) {
            dependsOnIds.forEach(depId => {
                const task = taskList.getById(depId);
                if (task) {
                    dependencies.push(task);
                }
            });
        }
        return dependencies;
    }

    hasDependencies(item: Task): boolean {
        return this.graph.has(item.getId());
    }
}
