export class PriceDTO {
  constructor(
    public netPrice: number,
    public totalPrice: number,
    public price: number,
    public salePrice: number,
    public vat: number,
    public systemProfitPercentage: number,
    public salePercentage: number
  ) {}

  static fromJson(json: Partial<PriceDTO>): PriceDTO {
    return new PriceDTO(
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
    return { ...this };
  }
}
