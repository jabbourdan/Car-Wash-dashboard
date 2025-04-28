export class Customer {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phoneNumber: string,
    public photoUrl: string,
    public isSuspended?: boolean,
    public displayName?: string
  ) {}

  static fromJson(json: any): Customer {
    return new Customer(
      json?.id ?? '',
      json?.name ?? '',
      json?.email ?? '',
      json?.phoneNumber ?? '',
      json?.photoUrl ?? '',
      json?.isSuspended || false,
      json?.displayName ?? ''
    );
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      photoUrl: this.photoUrl,
      isSuspended: this.isSuspended,
      displayName: this.displayName
    };
  }
}
