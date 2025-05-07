export class DataUtils {
  static search<T>(items: T[], searchTerm: string, fields: string[]): T[] {
    if (!searchTerm) return items;
    const term = searchTerm.toLowerCase();

    return items.filter((item) =>
      fields.some((field) => {
        const value = this.resolveNestedProperty(item, field)?.toString().toLowerCase();
        return value?.includes(term);
      })
    );
  }

  static sort<T>(items: T[], column: string, direction: 'asc' | 'desc'): T[] {
    return items.slice().sort((a, b) => {
      const valA = this.resolveNestedProperty(a, column);
      const valB = this.resolveNestedProperty(b, column);

      const isNumber = !isNaN(Number(valA)) && !isNaN(Number(valB));
      if (isNumber) {
        return direction === 'asc' ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
      } else {
        const strA = valA?.toString().toLowerCase() || '';
        const strB = valB?.toString().toLowerCase() || '';
        return direction === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
      }
    });
  }

  private static resolveNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((o, key) => (o ? o[key] : undefined), obj);
  }
}
