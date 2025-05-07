import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { ReservationModel } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = '/api/administrator/getAllReservations';

  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<ReservationModel[]> {
    return this.http.post<any[]>(this.apiUrl, {}, {}).pipe(
      map((data) => data.map((json) => ReservationModel.fromJson(json))),
      tap((res) => console.log('Reservations:', res)),
      catchError((error) => {
        console.error('Error:', error);
        return throwError(() => new Error('Failed to fetch reservations'));
      })
    );
  }
}
