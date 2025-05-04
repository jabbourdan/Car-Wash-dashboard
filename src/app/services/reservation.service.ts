import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { ReservationModel } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = '/api/administrator/getAllReservations';

  constructor(private http: HttpClient) {}

  // private getAuthHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('authToken');
  //   return new HttpHeaders({
  //     Authorization: `Bearer ${token}`
  //   });
  // }

  getAllReservationss(): Observable<ReservationModel[]> {
    return this.http.post<any[]>(this.apiUrl, {}, {}).pipe(map((data) => data.map((json) => ReservationModel.fromJson(json))));
  }
}
