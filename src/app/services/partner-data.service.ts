import { Injectable } from '@angular/core';
import { Partners } from '../models/partners';

@Injectable({ providedIn: 'root' })
export class PartnerDataService {
  private partner: Partners | null = null;

  setPartner(partner: Partners): void {
    this.partner = partner;
  }

  getPartner(): Partners {
    if (this.partner) {
      return this.partner;
    }
    const storedPartner = localStorage.getItem('partner');
    if (storedPartner) {
      this.partner = JSON.parse(storedPartner);
      return this.partner;
    }
    return null;
  }

  clear(): void {
    this.partner = null;
  }
}
