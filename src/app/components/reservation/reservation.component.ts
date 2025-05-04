import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationModel } from 'src/app/models/reservation.model';
import { DataUtils } from 'src/app/data-utils';

@Component({
  selector: 'app-reservation',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  // reservations: Reservation[] = [];
  reservationsssss: ReservationModel[] = [];
  isLoading = true;
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

  get filteredAndSortedReservations(): ReservationModel[] {
    let filtered = DataUtils.search(this.reservationsssss, this.state.searchTerm, this.searchFields);

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
  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getAllReservationss().subscribe({
      next: (data) => {
        this.reservationsssss = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load reservations:', err);
        this.isLoading = false;
      }
    });
  }

  // get filteredAndSortedReservations(): ReservationModel[] {
  //   let filtered = this.reservationsssss;

  //   if (this.searchTerm) {
  //     const term = this.searchTerm.toLowerCase();
  //     filtered = filtered.filter(
  //       (res) =>
  //         res.number?.toString().toLowerCase().includes(term) ||
  //         res.customer?.name?.toLowerCase().includes(term) ||
  //         res.assignedPartners?.[0]?.name?.toLowerCase().includes(term)
  //     );
  //   }

  //   if (this.sortColumn) {
  //     filtered = filtered.sort((a, b) => {
  //       const valA = (a as any)[this.sortColumn]?.toString().toLowerCase() || '';
  //       const valB = (b as any)[this.sortColumn]?.toString().toLowerCase() || '';
  //       if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
  //       if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
  //       return 0;
  //     });
  //   }

  //   return filtered;
  // }

  // toggleSort(column: string): void {
  //   if (this.sortColumn === column) {
  //     this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  //   } else {
  //     this.sortColumn = column;
  //     this.sortDirection = 'asc';
  //   }
  // }
}
