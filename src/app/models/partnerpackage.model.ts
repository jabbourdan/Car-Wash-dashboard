// models/partner-package.model.ts
export class PartnerPackage {
  constructor(
    public id: string,
    public vat: string,
    public country: string,
    public countryCode: string,
    public city: string,
    public packageName: string,
    public currency: string,
    public extraDetails: Record<string, string>,
    public serviceProducts: Product[],
    public stockProducts: Product[],
    public questions: Question[],
    public regionDTOs: Region[],
    public priceDTO: PriceDTO,
    public active: boolean
  ) {}

  static fromJson(json: Partial<PartnerPackage>): PartnerPackage {
    return new PartnerPackage(
      json.id ?? '',
      json.vat ?? '',
      json.country ?? '',
      json.countryCode ?? '',
      json.city ?? '',
      json.packageName ?? '',
      json.currency ?? '',
      json.extraDetails ?? {},
      (json.serviceProducts ?? []).map((p) => Product.fromJson(p)),
      (json.stockProducts ?? []).map((p) => Product.fromJson(p)),
      (json.questions ?? []).map((q) => Question.fromJson(q)),
      (json.regionDTOs ?? []).map((r) => Region.fromJson(r)),
      PriceDTO.fromJson(json.priceDTO ?? {}),
      json.active ?? false
    );
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      vat: this.vat,
      country: this.country,
      countryCode: this.countryCode,
      city: this.city,
      packageName: this.packageName,
      currency: this.currency,
      extraDetails: this.extraDetails,
      serviceProducts: this.serviceProducts.map((p) => p.toJson()),
      stockProducts: this.stockProducts.map((p) => p.toJson()),
      questions: this.questions.map((q) => q.toJson()),
      regionDTOs: this.regionDTOs.map((r) => r.toJson()),
      priceDTO: this.priceDTO.toJson(),
      active: this.active
    };
  }
}

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

export class Question {
  constructor(
    public id: string,
    public text: string,
    public type: number,
    public expectedAnswer: string,
    public mandatory: boolean
  ) {}

  static fromJson(json: Partial<Question>): Question {
    return new Question(json.id ?? '', json.text ?? '', json.type ?? 0, json.expectedAnswer ?? '', json.mandatory ?? false);
  }

  toJson(): Record<string, any> {
    return { ...this };
  }
}

export class Region {
  constructor(
    public id: string,
    public countryCode: string,
    public country: string,
    public city: string
  ) {}

  static fromJson(json: Partial<Region>): Region {
    return new Region(json.id ?? '', json.countryCode ?? '', json.country ?? '', json.city ?? '');
  }

  toJson(): Record<string, any> {
    return { ...this };
  }
}

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
