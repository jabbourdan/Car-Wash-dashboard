export class DataUtils {
  static search<T>(items: T[], searchText: string, fields: (keyof T)[]): T[] {
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter((item) => fields.some((field) => (item[field]?.toString().toLowerCase() ?? '').includes(searchText)));
  }

  static sort<T>(items: T[], field: keyof T, ascending: boolean = true): T[] {
    return [...items].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      if (aVal == null || bVal == null) return 0;
      return (aVal > bVal ? 1 : -1) * (ascending ? 1 : -1);
    });
  }

  static filter<T>(items: T[], predicate: (item: T) => boolean): T[] {
    return items.filter(predicate);
  }
}
