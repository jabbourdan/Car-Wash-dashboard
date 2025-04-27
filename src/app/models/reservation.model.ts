import { Customer } from './customer.model';
import { Partner } from './partner.model';
import { ReservationEvent } from './reservation-event.model';

export class ReservationModel {
  constructor(
    public id: string,
    public number: number,
    public arrivalTimeFrom: string,
    public lastReservationEvents: ReservationEvent,
    public assignedPartners: Partner[],
    public customer: Customer,
    public totalItemsPrice: number,
    public totalTransactionsAmount: number
  ) {}

  static fromJson(json: any): ReservationModel {
    return new ReservationModel(
      json.id,
      json.number,
      json.arrivalTimeFrom,
      ReservationEvent.fromJson(json.lastReservationEvents),
      (json.assignedPartners || []).map((p: any) => Partner.fromJson(p)),
      Customer.fromJson(json.customer),
      json.totalItemsPrice,

      json.totalTransactionsAmount
    );
  }

  toJson(): any {
    return {
      id: this.id,
      number: this.number,
      arrivalTimeFrom: this.arrivalTimeFrom,
      lastReservationEvents: this.lastReservationEvents?.toJson(),
      assignedPartners: this.assignedPartners?.map((p) => p.toJson()),
      customer: this.customer?.toJson(),
      totalItemsPrice: this.totalItemsPrice,
      totalTransactionsAmount: this.totalTransactionsAmount
    };
  }
}
