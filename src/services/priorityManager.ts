type TPriority = 1 | 2 | 3 | 4 | 5;

export class PriorityManager<T> {
    private priorities: Map<TPriority, T> = new Map();

    setPriority(item: T, value: TPriority): void {
        this.priorities.set(value, item);
    }

    getPriority(item: T): TPriority | undefined {
        for (const [priority, currentItem] of this.priorities.entries()) {
            if (currentItem === item) {
                return priority;
            }
        }
        return undefined;
    }

    getAll(): Map<TPriority, T> {
        return this.priorities;
    }
}