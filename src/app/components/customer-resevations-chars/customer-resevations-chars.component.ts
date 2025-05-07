import { Component, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgApexchartsModule, ChartComponent, ApexOptions } from 'ng-apexcharts';
import { ReservationModel } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-customer-resevations-chars',
  imports: [NgApexchartsModule],
  templateUrl: './customer-resevations-chars.component.html',
  styleUrl: './customer-resevations-chars.component.scss'
})
export class CustomerResevationsCharsComponent {
  // public props
  chart = viewChild.required<ChartComponent>('chart');
  chartOptions!: Partial<ApexOptions>;
  reservations: ReservationModel[] = [];

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.loadReservations();
    this.chartOptions = {
      chart: {
        height: 450,
        type: 'bar',
        toolbar: { show: false },
        background: 'transparent'
      },
      dataLabels: { enabled: false },
      colors: ['#1677ff'],
      series: [],
      stroke: { curve: 'smooth', width: 2 },
      xaxis: { categories: [] },
      yaxis: {
        labels: { style: { colors: ['#8c8c8c'] } }
      },
      grid: {
        strokeDashArray: 0,
        borderColor: '#f5f5f5'
      },
      theme: { mode: 'light' }
    };
  }

  loadReservations(): void {
    this.reservationService.getAllReservations().subscribe({
      next: (data) => {
        this.reservations = data;

        const customerCounts: { [key: string]: number } = {};

        data.forEach((res) => {
          const customerName = res.customer?.name || 'Unknown';
          customerCounts[customerName] = (customerCounts[customerName] || 0) + 1;
        });

        const categories = Object.keys(customerCounts);
        const counts = Object.values(customerCounts);

        this.chartOptions = {
          ...this.chartOptions,
          series: [
            {
              name: 'Reservations',
              data: counts
            }
          ],
          xaxis: {
            ...this.chartOptions.xaxis,
            categories
          }
        };
      },
      error: (err) => {
        console.error('Failed to load reservations:', err);
      }
    });
  }
}
