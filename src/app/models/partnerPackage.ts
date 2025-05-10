import { ExtraPackageDetails } from "./extraPackageDetails";
import { Product } from "./partnerpackage.model";
import { Question } from "./question";
import { Regions } from "./regions";

export class PartnerPackage {
  constructor(
    public id: string,
    public packageName: string,
    public vat: string,
    public country: string,
   public PrivateCars: string,
   public VansOrSimilar: string,
   public SUVs: string,
    public caravans:string,
    public numberOfServices: string,
    public countryCode: string,
    public city: string,
    public active: boolean,
    public currency: string,
    public extraDetails?: ExtraPackageDetails,
    public questions?: Question[],
    public regionDTOs?: Regions[],
    public stockProducts?: Product[],
    public serviceProducts?: Product[],
  ) {}

  static fromJson(json: any): PartnerPackage {
    return new PartnerPackage(
      json?.id ?? '',
      json?.packageName ?? '',
      json?.vat ?? '',
      json?.country ?? '',
      json?.PrivateCars ?? '',
      json?.VansOrSimilar ?? '',
      json?.SUVs || '',
       json?.numberOfServices || '',
      json?.caravans || '',
      json?.countryCode ?? '',
      json?.city ?? '',
      json.active ?? true,
      json?.currency ?? '',
      json?.extraDetails ? ExtraPackageDetails.fromJson(json.extraDetails) : undefined,
      json?.questions?.map((q: any) => Question.fromJson(q)) ?? [],
      json?.regionDTOs?.map((r: any) => Regions.fromJson(r)) ?? [],
      json?.stockProducts?.map((p: any) => Product.fromJson(p)) ?? [],
       json?.serviceProducts?.map((p: any) => Product.fromJson(p)) ?? [],

    );
  }

  toJson(): any {
    return {
      id: this.id,
      packageName: this.packageName,
      vat: this.vat,
      country: this.country,
      PrivateCars: this.PrivateCars,
      countryCode: this.countryCode,
      VansOrSimilar: this.VansOrSimilar,
      SUVs: this.SUVs,
      numberOfServices: this.numberOfServices,
      caravans: this.caravans,
      city: this.city,
      currency: this.currency,
      active: this.active,
      extraDetails: this.extraDetails?.toJson(),
      questions: this.questions?.map(q => q.toJson()),
       regionDTOs: this.regionDTOs?.map(r => r.toJson()),
        stockProducts: this.stockProducts?.map(p => p.toJson()),
         serviceProducts: this.serviceProducts?.map(p => p.toJson())
    };
  }
    
  }

  