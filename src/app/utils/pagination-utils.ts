export class PaginationUtils<T> {
  constructor(
    private items: T[],
    public currentPage: number = 1,
    public pageSize: number = 10
  ) {}

  get totalPages(): number {
    return Math.ceil(this.items.length / this.pageSize);
  }

  get paginatedItems(): T[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.items.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  setItems(items: T[]): void {
    this.items = items;
  }
}
