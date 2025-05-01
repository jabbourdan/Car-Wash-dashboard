import { Component,viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgApexchartsModule, ChartComponent, ApexOptions } from 'ng-apexcharts';
import { Partners } from 'src/app/models/partners';
import { PartnerDataService } from 'src/app/services/partner-data.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partners-status-chars',
  imports: [NgApexchartsModule],
  templateUrl: './partners-status-chars.component.html',
  styleUrl: './partners-status-chars.component.scss'
})
export class PartnersStatusCharsComponent {
  chart = viewChild.required<ChartComponent>('chart');
  chartOptions!: Partial<ApexOptions>;
  partnersList: Array<Partners> = [];

  constructor(
    private router: Router,
    private partnerDataService: PartnerDataService,
    private partnerService: PartnerService
  ) {}

  ngOnInit() {
    this.getAllPartners();
  }

  getAllPartners(): void {
    this.partnerService.getAllPartners().subscribe({
      next: (data) => {
        this.partnersList = data;

        const statusCounts: { [key: string]: number } = {};

        data.forEach(partner => {
          let status: string;
          if (partner.isSuspended === true) {
            status = 'Suspended';
          } else if (partner.isSuspended === false) {
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
              name: 'Partners',
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
        console.error('Failed to load partners:', err);
      }
    });
  }
  
}

