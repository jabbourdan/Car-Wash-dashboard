import { ExtraPackageDetails } from "./extraPackageDetails";
import { Question } from "./question";

export class PartnerPackage {
    public id?: string;
    public packageName?:string;
    public vat?: string;
    public country?: string;
    public countryCode?: string;
    public city?: string;
    public currency?:string;
    public extraDetails?: ExtraPackageDetails;
    public questions?:Question[];
          

    
  }

  