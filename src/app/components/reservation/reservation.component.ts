import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  reservations: Reservation[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.loadReservations();
    console.log(this.reservations);
  }

  loadReservations(): void {
    this.reservationService.getAllReservations().subscribe({
      next: (res) => {
        this.reservations = res;
        console.log('Loaded reservations:', this.reservations);
      },
      error: (err) => {
        console.error('Failed to load reservations:', err);
      }
    });
  }
}
