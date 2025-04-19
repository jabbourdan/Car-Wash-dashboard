import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Partners } from 'src/app/models/partners';
import { CommonModule } from '@angular/common';
import { PartnerService } from 'src/app/services/partner.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-all-partners',
  imports: [CommonModule,FormsModule ],
  templateUrl: './all-partners.component.html',
  styleUrl: './all-partners.component.scss'
})
export class AllPartnersComponent {
  partnersList: Array<Partners> = [];
  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private partnerService:PartnerService,

    private router:Router

) { }

ngOnInit(): void {
  this.getAllPartners();
}

getAllPartners(): void {
  this.partnerService.getAllPartners().subscribe({
    next: (data) => {
      this.partnersList = data;
      console.log('Partners:', this.partnersList);
    },
    error: (err) => {
      console.error('Failed to load partners:', err);
    }
  });
}

get filteredAndSortedPartners(): Partners[] {
  let filtered = this.partnersList;

  if (this.searchTerm) {
    const term = this.searchTerm.toLowerCase();
    filtered = filtered.filter(p =>
      p.name?.toLowerCase().includes(term) ||
      p.email?.toLowerCase().includes(term) ||
      p.phoneNumber?.toLowerCase().includes(term)
    );
  }

  if (this.sortColumn) {
    filtered = filtered.sort((a, b) => {
      const valA = (a as any)[this.sortColumn]?.toLowerCase?.() || '';
      const valB = (b as any)[this.sortColumn]?.toLowerCase?.() || '';
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return filtered;
}


toggleSort(column: string) {
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }
}

}
