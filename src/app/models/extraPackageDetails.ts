export class ExtraPackageDetails {
  constructor(
    public duration: string,
    public packageDescription: string,
    public privateCars: number,
    public vansOrSimilar: number,
    public suvs: number,
    public caravans: number,
    public numberOfServices: number
  ) {}

  static fromJson(json: any): ExtraPackageDetails {
    return new ExtraPackageDetails(
      json.duration,
      json.packageDescription,
      json.privateCars,
      json.vansOrSimilar,
      json.suvs,
      json.caravans,
      json.numberOfServices
    );
  }

  toJson(): any {
    return {
      duration: this.duration,
      packageDescription: this.packageDescription,
      privateCars: this.privateCars,
      vansOrSimilar: this.vansOrSimilar,
      suvs: this.suvs,
      caravans: this.caravans,
      numberOfServices: this.numberOfServices
    };
  }
}


// export class ExtraPackageDetails {
//     constructor(
//       public id: string,
//       public duration: string,
//       public packageDescription: string,
//       public PrivateCars: string,
//       public VansOrSimilar: string,
//       public SUVs?: string,
//       public numberOfServices?: string,
//       public packageName?:string,
//       public caravans?:string
//     ) {}
  
//     static fromJson(json: any): ExtraPackageDetails {
//       return new ExtraPackageDetails(
//         json?.id ?? '',
//         json?.duration ?? '',
//         json?.packageDescription ?? '',
//         json?.PrivateCars ?? '',
//         json?.VansOrSimilar ?? '',
//         json?.SUVs || '',
//         json?.numberOfServices || '',
//         json?.packageName || '',
//         json?.caravans || ''
//       );
//     }
  
//     toJson(): any {
//       return {
//         id: this.id,
//         duration: this.duration,
//         packageDescription: this.packageDescription,
//         PrivateCars: this.PrivateCars,
//         VansOrSimilar: this.VansOrSimilar,
//         SUVs: this.SUVs,
//         numberOfServices: this.numberOfServices,
//         packageName: this.packageName,
//         caravans: this.caravans
//       };
//     } 
//   }