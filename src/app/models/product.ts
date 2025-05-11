export class Product {
  constructor(
    public id: string,
    public productCode: string,
    public internalID: string,
    public name: string,
    public description: string,
    public price: number,
    public currency: string,
    public externalID: string,
    public status: string,
    public salePercentage: number,
    public systemProfitPercentage: number,
    public generalCosts: number
  ) {}

  static fromJson(json: Partial<Product>): Product {
    return new Product(
      json.id ?? '',
      json.productCode ?? '',
      json.internalID ?? '',
      json.name ?? '',
      json.description ?? '',
      json.price ?? 0,
      json.currency ?? '',
      json.externalID ?? '',
      json.status ?? '',
      json.salePercentage ?? 0,
      json.systemProfitPercentage ?? 0,
      json.generalCosts ?? 0
    );
  }

  toJson(): Record<string, any> {
    return { ...this };
  }
}