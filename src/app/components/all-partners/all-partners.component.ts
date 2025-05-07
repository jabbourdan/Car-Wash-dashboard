import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Partners } from 'src/app/models/partners';
import { CommonModule } from '@angular/common';
import { PartnerService } from 'src/app/services/partner.service';
import { FormsModule } from '@angular/forms';
import { PartnerInfoDialogComponent } from '../partner-info-dialog/partner-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PartnerDataService } from 'src/app/services/partner-data.service';
import { DataUtils } from 'src/app/utils/data-utils';
import { UserService } from 'src/app/services/user.service';
import { catchError, of, tap } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { log } from 'console';

@Component({
  selector: 'app-all-partners',
  imports: [CommonModule, FormsModule, NzIconModule],
  templateUrl: './all-partners.component.html',
  styleUrl: './all-partners.component.scss'
})
export class AllPartnersComponent {
  partnersList: Array<Partners> = [];
  isLoading = true;
  isError = false;
  errorMessage = '';
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
    private partnerDataService: PartnerDataService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAllPartners();
    console.log(this.getAllPartners());
  }

  getAllPartners(): void {
    this.partnerService
      .getAllPartners()
      .pipe(
        catchError((err) => {
          this.isError = true;
          this.errorMessage = 'Failed to load partners. Please try again later.';
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe((data) => {
        this.partnersList = data;
        this.isLoading = false;
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

  //status
  getStatusLabel(isSuspended: boolean | null): string {
    if (isSuspended === null) {
      return 'Approve'; // If isSuspended is null, display "Approve"
    }
    return isSuspended ? 'Reactivate' : 'Suspend';
  }

  //info
  showPartnerInfo(partner: Partners): void {
    this.partnerDataService.setPartner(partner);
    localStorage.setItem('partner', JSON.stringify(partner));
    this.router.navigate(['/partnerInfoDialog']);
  }

  toggleApproval(partner: Partners): void {
    this.toggleUserStatus(partner, 'approveUser', 'isApproved');
  }

  toggleSuspension(partner: Partners): void {
    this.toggleUserStatus(partner, 'suspendUser', 'isSuspended');
  }

  private toggleUserStatus(partner: Partners, action: 'approveUser' | 'suspendUser', statusField: 'isApproved' | 'isSuspended'): void {
    this.userService[action](partner.id, !partner[statusField]).subscribe({
      next: () => {
        partner[statusField] = !partner[statusField];
      },
      error: () => {
        this.isError = true;
        this.errorMessage = `Failed to ${statusField === 'isApproved' ? 'approve' : 'suspend'} customer.`;
      }
    });
  }

  trackByCustomerId(index: number, partner: Partners): string {
    return partner.id;
  }
}
