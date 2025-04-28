import { ExtraPackageDetails } from "./extraPackageDetails";
import { Question } from "./question";

export class PartnerPackage {
  constructor(
    public id: string,
    public packageName: string,
    public vat: string,
    public country: string,
    public countryCode: string,
    public city: string,
    public currency: string,
    public extraDetails?: ExtraPackageDetails,
    public questions?: Question[]
  ) {}

  static fromJson(json: any): PartnerPackage {
    return new PartnerPackage(
      json?.id ?? '',
      json?.packageName ?? '',
      json?.vat ?? '',
      json?.country ?? '',
      json?.countryCode ?? '',
      json?.city ?? '',
      json?.currency ?? '',
      json?.extraDetails ? ExtraPackageDetails.fromJson(json.extraDetails) : undefined,
      json?.questions?.map((q: any) => Question.fromJson(q)) ?? []
    );
  }

  toJson(): any {
    return {
      id: this.id,
      packageName: this.packageName,
      vat: this.vat,
      country: this.country,
      countryCode: this.countryCode,
      city: this.city,
      currency: this.currency,
      extraDetails: this.extraDetails?.toJson(),
      questions: this.questions?.map(q => q.toJson())
    };
  }
    
  }

  