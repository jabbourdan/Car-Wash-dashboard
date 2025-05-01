import { Component ,viewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NgApexchartsModule, ChartComponent, ApexOptions } from 'ng-apexcharts';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-status-chars',
  imports: [NgApexchartsModule],
  templateUrl: './customer-status-chars.component.html',
  styleUrl: './customer-status-chars.component.scss'
})
export class CustomerStatusCharsComponent {

chart = viewChild.required<ChartComponent>('chart');
  chartOptions!: Partial<ApexOptions>;
  customers: Customer[] = []; // Full list from server

  constructor(
    private router: Router,
 private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;

        const statusCounts: { [key: string]: number } = {};

        data.forEach(customer => {
          let status: string;
          if (customer.isSuspended === true) {
            status = 'Suspended';
          } else if (customer.isSuspended === false) {
            status = 'Reactivated';
          } else {
            status = 'Approved'; // isSuspended is null
          }

          statusCounts[status] = (statusCounts[status] || 0) + 1;
        });

        const categories = Object.keys(statusCounts);
        const counts = Object.values(statusCounts);

        const colors = categories.map(status => {
          switch (status) {
            case 'Suspended':
              return '#dc3545'; // red
            case 'Reactivated':
              return '#28a745'; // green
            case 'Approved':
              return '#007bff'; // blue
            default:
              return '#6c757d'; // gray
          }
        });

        this.chartOptions = {
          chart: {
            height: 450,
            type: 'bar',
            toolbar: { show: false },
            background: 'transparent'
          },
          plotOptions: {
            bar: {
              distributed: true,
              horizontal: false
            }
          },
          dataLabels: { enabled: true },
          colors: colors,
          series: [
            {
              name: 'Customers',
              data: counts
            }
          ],
          xaxis: {
            categories: categories
          },
          yaxis: {
            labels: { style: { colors: ['#8c8c8c'] } }
          },
          grid: {
            strokeDashArray: 0,
            borderColor: '#f5f5f5'
          },
          theme: { mode: 'light' }
        };
      },
      error: (err) => {
        console.error('Failed to load customers:', err);
      }
    });
  }
  
}


