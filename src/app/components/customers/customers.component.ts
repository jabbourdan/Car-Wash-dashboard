import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DataUtils } from 'src/app/utils/data-utils';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule, NzIconModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  customers: Customer[] = [];
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
    private router: Router,
    private customerService: CustomerService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService
      .getAllCustomers()
      .pipe(
        catchError((err) => {
          this.isError = true;
          this.errorMessage = 'Failed to load customers. Please try again later.';
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe((data) => {
        this.customers = data;
        this.isLoading = false;
      });
  }

  get filteredCustomers(): Customer[] {
    let filtered = DataUtils.search(this.customers, this.state.searchTerm, this.searchFields);

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
  getStatusLabel(isSuspended: boolean | null): string {
    return isSuspended === null ? 'Approve' : isSuspended ? 'Reactivate' : 'Suspend';
  }

  toggleApproval(customer: Customer): void {
    this.toggleUserStatus(customer, 'approveUser', 'isApproved');
  }

  toggleSuspension(customer: Customer): void {
    this.toggleUserStatus(customer, 'suspendUser', 'isSuspended');
  }

  private toggleUserStatus(customer: Customer, action: 'approveUser' | 'suspendUser', statusField: 'isApproved' | 'isSuspended'): void {
    this.userService[action](customer.id, !customer[statusField]).subscribe({
      next: () => {
        customer[statusField] = !customer[statusField];
      },
      error: () => {
        this.isError = true;
        this.errorMessage = `Failed to ${statusField === 'isApproved' ? 'approve' : 'suspend'} customer.`;
      }
    });
  }

  trackByCustomerId(index: number, customer: Customer): number {
    return +customer.id;
  }
}
