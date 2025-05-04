import { Customer } from './customer.model';
import { Partners } from './partners';
import { ReservationEvent } from './reservation-event.model';

export class ReservationModel {
  constructor(
    public id: string,
    public number: number,
    public arrivalTimeFrom: string,
    public lastReservationEvents: ReservationEvent,
    public assignedPartners: Partners[],
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
      (json.assignedPartners || []).map((p: any) => Partners.fromJson(p)),
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
