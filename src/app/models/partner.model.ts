export class Partner {
  constructor(public name: string) {}

  static fromJson(json: any): Partner {
    return new Partner(json?.name || '');
  }

  toJson(): any {
    return {
      name: this.name
    };
  }
}
