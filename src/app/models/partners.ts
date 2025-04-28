import { Regions } from "./regions";

export class Partners {
    constructor(
      public id: string,
      public photoUrl: string,
      public name: string,
      public email: string,
      public phoneNumber: string,
      public displayName: string,   // Make sure this comes before the optional parameters
      public stars: number,
      public sendViaWhatsApp: boolean,
      public sendViaNotification: boolean,
      public isSuspended?: boolean, // Optional
      public isPhoneVerified?: boolean // Optional
    ) {}
  
    static fromJson(json: any): Partners {
      return new Partners(
        json?.id ?? '',
        json?.photoUrl ?? '',
        json?.name ?? '',
        json?.email ?? '',
        json?.phoneNumber ?? '',
        json?.displayName ?? '',
        json?.stars ?? 0, // Ensure stars is a number, or adjust as needed
        json?.sendViaWhatsApp || false,
        json?.sendViaNotification || false,
        json?.isSuspended || false,
        json?.isPhoneVerified || false
      );
    }
  
    toJson(): any {
      return {
        id: this.id,
        photoUrl: this.photoUrl,
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        displayName: this.displayName,
        stars: this.stars,
        sendViaWhatsApp: this.sendViaWhatsApp,
        sendViaNotification: this.sendViaNotification,
        isSuspended: this.isSuspended,
        isPhoneVerified: this.isPhoneVerified
      };
    }
  }

  