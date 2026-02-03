import { User } from "@models/users";

export class WatcherSystem<T> {
    private watchers: Map<T, Set<User>> = new Map();

    watch(target: T, user: User): void {
        if (!this.watchers.has(target)) {
            this.watchers.set(target, new Set());
        }
        this.watchers.get(target)!.add(user);
    }

    unwatch(target: T, user: User): void {
        if (this.watchers.has(target)) {
            this.watchers.get(target)!.delete(user);
        }
    }

    getWatchers(target: T): User[] {
        return Array.from(this.watchers.get(target) || []);
    }
}
