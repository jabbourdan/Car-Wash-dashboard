import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = '/api/administrator/getAllReservations';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.post<any[]>(this.apiUrl, {}, { headers: this.getAuthHeaders() }).pipe(
      tap((response) => {
        console.log('Reservations response:', response);
      }),
      map((reservations) => reservations.map((data) => new Reservation(data)))
    );
  }
}
