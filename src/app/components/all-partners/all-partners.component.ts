import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Partners } from 'src/app/models/partners';
import { CommonModule } from '@angular/common';
import { PartnerService } from 'src/app/services/partner.service';
import { FormsModule } from '@angular/forms';
import { PartnerInfoDialogComponent } from '../partner-info-dialog/partner-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PartnerDataService } from 'src/app/services/partner-data.service';
import { DataUtils } from 'src/app/data-utils';

@Component({
  selector: 'app-all-partners',
  imports: [CommonModule, FormsModule],
  templateUrl: './all-partners.component.html',
  styleUrl: './all-partners.component.scss'
})
export class AllPartnersComponent {
  partnersList: Array<Partners> = [];

  state = {
    searchTerm: '',
    sortColumn: '',
    sortDirection: 'asc' as 'asc' | 'desc'
  };

  searchFields: string[] = ['name', 'email', 'phoneNumber'];
  constructor(
    private partnerService: PartnerService,
    private dialog: MatDialog,
    private router: Router,
    private partnerDataService: PartnerDataService
  ) {}

  ngOnInit(): void {
    this.getAllPartners();
  }

  getAllPartners(): void {
    this.partnerService.getAllPartners().subscribe({
      next: (data) => {
        this.partnersList = data;
        console.log('Partners in info:', this.partnersList);
      },
      error: (err) => {
        console.error('Failed to load partners:', err);
      }
    });
  }
  get filteredAndSortedPartners(): Partners[] {
    let filtered = DataUtils.search(this.partnersList, this.state.searchTerm, this.searchFields);

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
  // get filteredAndSortedPartners(): Partners[] {
  //   let filtered = this.partnersList;

  //   if (this.searchTerm) {
  //     const term = this.searchTerm.toLowerCase();
  //     filtered = filtered.filter(
  //       (p) => p.name?.toLowerCase().includes(term) || p.email?.toLowerCase().includes(term) || p.phoneNumber?.toLowerCase().includes(term)
  //     );
  //   }

  //   if (this.sortColumn) {
  //     filtered = filtered.sort((a, b) => {
  //       const valA = (a as any)[this.sortColumn]?.toLowerCase?.() || '';
  //       const valB = (b as any)[this.sortColumn]?.toLowerCase?.() || '';
  //       if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
  //       if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
  //       return 0;
  //     });
  //   }

  //   return filtered;
  // }

  // toggleSort(column: string) {
  //   if (this.sortColumn === column) {
  //     this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  //   } else {
  //     this.sortColumn = column;
  //     this.sortDirection = 'asc';
  //   }
  // }
  //status
  getStatusLabel(isSuspended: boolean | null): string {
    if (isSuspended === null) {
      return 'Approve'; // If isSuspended is null, display "Approve"
    }
    return isSuspended ? 'Reactivate' : 'Suspend';
  }

  toggleSuspend(partner: Partners): void {
    const updatedSuspend = partner.isSuspended === true ? false : true;

    this.partnerService.suspendUser(partner.id, updatedSuspend).subscribe({
      next: () => {
        partner.isSuspended = updatedSuspend; // Update the partner's suspension status
        this.getAllPartners();
      },
      error: (err) => {
        console.error('Failed to change suspend status', err);
        this.getAllPartners();
      }
    });
    this.getAllPartners();
  }

  //info
  showPartnerInfo(partner: Partners): void {
    this.partnerDataService.setPartner(partner);
    localStorage.setItem('partner', JSON.stringify(partner));
    this.router.navigate(['/partnerInfoDialog']);
  }
}
