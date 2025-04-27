export class ReservationEvent {
  constructor(public statusText: string) {}

  static fromJson(json: any): ReservationEvent {
    return new ReservationEvent(json?.statusText || '');
  }

  toJson(): any {
    return {
      statusText: this.statusText
    };
  }
}
