import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationModel } from 'src/app/models/reservation.model';
import { DataUtils } from 'src/app/utils/data-utils';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-reservation',
  imports: [CommonModule, FormsModule, NzIconModule],
  standalone: true,
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  reservations: ReservationModel[] = [];
  isLoading = true;
  isError = false;
  errorMessage = '';
  state = {
    searchTerm: '',
    sortColumn: '',
    sortDirection: 'asc' as 'asc' | 'desc'
  };

  searchFields: string[] = ['number', 'customer.name', 'assignedPartners.0.name'];

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getAllReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isError = true;
        this.errorMessage = 'Failed to load reservations. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  get filteredAndSortedReservations(): ReservationModel[] {
    let filtered = DataUtils.search(this.reservations, this.state.searchTerm, this.searchFields);

    if (this.state.sortColumn) {
      filtered = DataUtils.sort(filtered, this.state.sortColumn, this.state.sortDirection);
    }

    return filtered;
  }

  toggleSort(column: string): void {
    if (this.state.sortColumn === column) {
      this.state.sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.state.sortColumn = column;
      this.state.sortDirection = 'asc';
    }
  }

  trackByReservationNumber(index: number, reservation: ReservationModel): number {
    return reservation.number;
  }
}
