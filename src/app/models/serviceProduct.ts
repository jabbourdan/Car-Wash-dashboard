export class ServiceProduct {
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

  static fromJson(data: any): ServiceProduct {
    return new ServiceProduct(
      data.id,
      data.productCode,
      data.internalID,
      data.name,
      data.description,
      data.price,
      data.currency,
      data.externalID,
      data.status,
      data.salePercentage,
      data.systemProfitPercentage,
      data.generalCosts
    );
  }

  toJson() {
    return {
      id: this.id,
      productCode: this.productCode,
      internalID: this.internalID,
      name: this.name,
      description: this.description,
      price: this.price,
      currency: this.currency,
      externalID: this.externalID,
      status: this.status,
      salePercentage: this.salePercentage,
      systemProfitPercentage: this.systemProfitPercentage,
      generalCosts: this.generalCosts
    };
  }
}