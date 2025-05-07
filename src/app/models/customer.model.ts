export class Customer {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phoneNumber: string,
    public photoUrl: string,
    public isSuspended: boolean = false,
    public isApproved: boolean = false,
    public displayName?: string
  ) {}

  static fromJson(json: Partial<Customer>): Customer {
    return new Customer(
      json.id ?? '',
      json.name ?? '',
      json.email ?? '',
      json.phoneNumber ?? '',
      json.photoUrl ?? '',
      json.isSuspended ?? false,
      json.isApproved ?? false,
      json.displayName ?? ''
    );
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      photoUrl: this.photoUrl,
      isSuspended: this.isSuspended,
      isApproved: this.isApproved,
      displayName: this.displayName
    };
  }
}
