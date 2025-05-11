export class PartnerPriceDTO {
  constructor(
    public netPrice: number,
    public totalPrice: number,
    public price: number,
    public salePrice: number,
    public vat: number,
    public systemProfitPercentage: number,
    public salePercentage: number
  ) {}

  static fromJson(json: Partial<PartnerPriceDTO>): PartnerPriceDTO {
    return new PartnerPriceDTO(
      json.netPrice ?? 0,
      json.totalPrice ?? 0,
      json.price ?? 0,
      json.salePrice ?? 0,
      json.vat ?? 0,
      json.systemProfitPercentage ?? 0,
      json.salePercentage ?? 0
    );
  }

  toJson(): Record<string, any> {
    return {
      netPrice: this.netPrice,
      totalPrice: this.totalPrice,
      price: this.price,
      salePrice: this.salePrice,
      vat: this.vat,
      systemProfitPercentage: this.systemProfitPercentage,
      salePercentage: this.salePercentage
    };
  }
}