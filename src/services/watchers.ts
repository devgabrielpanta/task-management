import { Task } from "@models/tasks";
import { User } from "@models/users";

export class WatcherSystem {
    private watchers: Map<Task, Set<User>> = new Map();

    watch(target: Task, user: User): void {
        if (!this.watchers.has(target)) {
            this.watchers.set(target, new Set());
        }
        this.watchers.get(target)!.add(user);
    }

    unwatch(target: Task, user: User): void {
        if (this.watchers.has(target)) {
            this.watchers.get(target)!.delete(user);
        }
    }

    getWatchers(target: Task): User[] {
        return this.watchers.has(target) ? Array.from(this.watchers.get(target)!) : [];
    }
}
