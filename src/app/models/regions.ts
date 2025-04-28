export class Regions {
  constructor(
    public id: string,
    public countryCode: string,
    public country: string,
    public city: string
  ) {}

  static fromJson(json: any): Regions {
    return new Regions(
      json?.id ?? '',
      json?.countryCode ?? '',
      json?.country ?? '',
      json?.city ?? ''
    );
  }

  toJson(): any {
    return {
      id: this.id,
      countryCode: this.countryCode,
      country: this.country,
      city: this.city
    };
  }

  }

  