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
  assignedPartner: Partner;
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
    this.customer = new Customer(data.customer);
    this.assignedPartner = new Partner(data.assignedPartners[0]);
    this.reservationStatus = data.reservationEvents[0]?.reservationStatus || '';
    this.statusColor = data.reservationEvents[0]?.statusColor || '';
    this.statusText = data.reservationEvents[0]?.statusText || '';
    this.totalItemsPrice = data.totalItemsPrice;
    this.totalTransactionsAmount = data.totalTransactionsAmount;
    this.transactionAmount = data.transactions || [];
  }
}

export class Customer {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  displayName: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.displayName = data.displayName;
  }
}

export class Partner {
  id: string;
  name: string;
  displayName: string;
  phoneNumber: string;
  stars: number;
  reviews: number;
  sendViaWhatsApp: boolean;
  sendViaNotification: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.displayName = data.displayName;
    this.phoneNumber = data.phoneNumber;
    this.stars = data.stars;
    this.reviews = data.reviews;
    this.sendViaWhatsApp = data.sendViaWhatsApp;
    this.sendViaNotification = data.sendViaNotification;
  }
}

export class Transaction {
  amount: {
    currency: string;
    details: {
      subtotal: string;
      shipping: string;
      shipping_discount: string;
    };
    total: string;
  };
  description: string;
  relatedResources: any;

  constructor(data: any) {
    this.amount = data.amount;
    this.description = data.description;
    this.relatedResources = data.related_resources;
  }
}
