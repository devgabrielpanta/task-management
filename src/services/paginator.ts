export class Paginator<T> {
    private pages: Map<number, T[]> = new Map();
    private itemsPerPage: number = 10;

    constructor(items: T[]) {
        this.paginate(items);
    }

    private paginate(items: T[]): void {
        let pageIndex = 1;
        for (let i = 0; i < items.length; i += this.itemsPerPage) {
            const pageItems = items.slice(i, i + this.itemsPerPage);
            this.pages.set(pageIndex, pageItems);
            pageIndex++;
        }
    }

    public getPage(pageNumber: number): T[] | null {
        return this.pages.get(pageNumber) || null;
    }

    public getTotalPages(): number {
        return this.pages.size;
    }

    public getAllPages(): Map<number, T[]> {
        return this.pages;
    }

    public paginateNewItems(items: T[]): void {
        const updatedItems: T[] = [];
        this.pages.forEach((pageItems) => updatedItems.push(...pageItems));

        const newItems = items.filter(item => !updatedItems.includes(item));
        if (newItems.length === 0) return;

        let lastPageIndex = this.pages.size;
        let lastPageItems = this.pages.get(lastPageIndex) || [];
        for (const newItem of newItems) {
            if (lastPageItems.length < this.itemsPerPage) {
                lastPageItems.push(newItem);
                this.pages.set(lastPageIndex, lastPageItems);
            } else {
                lastPageIndex++;
                lastPageItems = [newItem];
                this.pages.set(lastPageIndex, lastPageItems);
            }
        }
    }

}