import { Regions } from "./regions";

export class PartnerExtraDetails {
  constructor(
    public id: string = '',
    public nickName: string = '',
    public preferredPhoneNumber: string = '',
    public locale: string = '',
    public isPhoneVerified: string = '',
    public regions?: Regions
  ) {}

  static fromJson(json: any): PartnerExtraDetails {
    return new PartnerExtraDetails(
      json?.id ?? '',
      json?.nickName ?? '',
      json?.preferredPhoneNumber ?? '',
      json?.locale ?? '',
      json?.isPhoneVerified ?? '',
      json?.regions ? Regions.fromJson(json.regions) : undefined
    );
  }

  toJson(): any {
    return {
      id: this.id,
      nickName: this.nickName,
      preferredPhoneNumber: this.preferredPhoneNumber,
      locale: this.locale,
      isPhoneVerified: this.isPhoneVerified,
      regions: this.regions?.toJson()
    };
  }
  }

  