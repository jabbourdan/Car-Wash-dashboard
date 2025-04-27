import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  customers: Customer[] = []; // Full list from server
  searchText = '';
  sortField: keyof Customer | '' = '';
  ascending: boolean = true;
  isLoading = true;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load customers:', err);
        this.isLoading = false;
      }
    });
  }

  get filteredCustomers(): Customer[] {
    let filtered = this.customers;

    if (this.searchText) {
      const term = this.searchText.toLowerCase();
      filtered = filtered.filter(
        (customer) =>
          customer.name?.toLowerCase().includes(term) ||
          customer.email?.toLowerCase().includes(term) ||
          customer.phoneNumber?.toLowerCase().includes(term)
      );
    }

    if (this.sortField) {
      filtered = filtered.sort((a, b) => {
        const aField = (a[this.sortField] || '').toString().toLowerCase();
        const bField = (b[this.sortField] || '').toString().toLowerCase();
        if (aField < bField) return this.ascending ? -1 : 1;
        if (aField > bField) return this.ascending ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }

  toggleSort(field: keyof Customer) {
    if (this.sortField === field) {
      this.ascending = !this.ascending;
    } else {
      this.sortField = field;
      this.ascending = true;
    }
  }

  getStatusLabel(isSuspended: boolean | null): string {
    if (isSuspended === null) {
      return 'Approve';
    }
    return isSuspended ? 'Reactivate' : 'Suspend';
  }
}
