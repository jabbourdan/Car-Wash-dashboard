export class RegionDto {
  constructor(
    public id: string,
    public countryCode: string,
    public country: string,
    public city: string
  ) {}

  static fromJson(json: Partial<RegionDto>): RegionDto {
    return new RegionDto(json.id ?? '', json.countryCode ?? '', json.country ?? '', json.city ?? '');
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      countryCode: this.countryCode,
      country: this.country,
      city: this.city
    };
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
    return {
      id: this.id,
      text: this.text,
      type: this.type,
      expectedAnswer: this.expectedAnswer,
      mandatory: this.mandatory
    };
  }
}

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
    public serviceProducts: ServiceProduct[],
    public stockProducts: ServiceProduct[],
    public questions: Question[],
    public active: boolean
  ) {}

  static fromJson(data: any): PartnerPackage {
    return new PartnerPackage(
      data.id,
      data.vat,
      data.country,
      data.countryCode,
      data.city,
      data.packageName,
      data.currency,
      data.extraDetails ?? {},
      (data.serviceProducts ?? []).map((sp: any) => ServiceProduct.fromJson(sp)),
      (data.stockProducts ?? []).map((sp: any) => ServiceProduct.fromJson(sp)),
      (data.questions ?? []).map((q: any) => Question.fromJson(q)),
      !!data.active
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
      serviceProducts: this.serviceProducts.map((sp) => sp.toJson()),
      stockProducts: this.stockProducts.map((sp) => sp.toJson()),
      questions: this.questions.map((q) => q.toJson()),
      active: this.active
    };
  }
}
