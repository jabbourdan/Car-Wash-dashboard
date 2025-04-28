import { Customer } from "./customer.model";
import { Partners } from "./partners";
import { Transaction } from "./Transaction";

export class Reservation {
  id: string;
  number: number;
  latitude: number;
  longitude: number;
  arrivalTimeFrom: string;
  arrivalTimeTo: string;
  reservationPaymentToken: string;
  isTimePassedChecked: boolean;
  isPartnerResponseTimePassedChecked: boolean;
  isPendingPayment: boolean;
  lastPartnerAssignTime: string;
  description: string;
  customer: Customer;
  assignedPartner: Partners;  // Use Partners here instead of Partner
  reservationStatus: string;
  statusColor: string;
  statusText: string;
  totalItemsPrice: number;
  totalTransactionsAmount: number;
  transactionAmount: Transaction[];

  constructor(data: any) {
    this.id = data.id;
    this.number = data.number;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.arrivalTimeFrom = data.arrivalTimeFrom;
    this.arrivalTimeTo = data.arrivalTimeTo;
    this.reservationPaymentToken = data.reservationPaymentToken;
    this.isTimePassedChecked = data.isTimePassedChecked;
    this.isPartnerResponseTimePassedChecked = data.isPartnerResponseTimePassedChecked;
    this.isPendingPayment = data.isPendingPayment;
    this.lastPartnerAssignTime = data.lastPartnerAssignTime;
    this.description = data.description;
    this.customer = Customer.fromJson(data.customer);
    this.assignedPartner = Partners.fromJson(data.assignedPartners[0]);  // Use Partners.fromJson to correctly instantiate the partner
    this.reservationStatus = data.reservationEvents[0]?.reservationStatus || '';
    this.statusColor = data.reservationEvents[0]?.statusColor || '';
    this.statusText = data.reservationEvents[0]?.statusText || '';
    this.totalItemsPrice = data.totalItemsPrice;
    this.totalTransactionsAmount = data.totalTransactionsAmount;
    this.transactionAmount = data.transactions || [];
  }
}

// export class Transaction {
//   amount: {
//     currency: string;
//     details: {
//       subtotal: string;
//       shipping: string;
//       shipping_discount: string;
//     };
//     total: string;
//   };
//   description: string;
//   relatedResources: any;

//   constructor(data: any) {
//     this.amount = data.amount;
//     this.description = data.description;
//     this.relatedResources = data.related_resources;
//   }
// }
