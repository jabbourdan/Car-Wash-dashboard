import { Component, OnInit, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgApexchartsModule, ChartComponent, ApexOptions } from 'ng-apexcharts';
import { ReservationModel } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';
@Component({
  selector: 'app-partners-chars-byreservations',
  imports: [NgApexchartsModule],
  templateUrl: './partners-chars-byreservations.component.html',
  styleUrl: './partners-chars-byreservations.component.scss'
})
export class PartnersCharsByreservationsComponent {
 // public props
  chart = viewChild.required<ChartComponent>('chart');
  chartOptions!: Partial<ApexOptions>;
    reservationsssss: ReservationModel[] = [];
  
 constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}


  // life cycle hook
  ngOnInit() {
    this.loadReservations();
    this.chartOptions = {
      chart: {
        height: 450,
        type: 'bar', // more appropriate for partner count
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
    this.reservationService.getAllReservationss().subscribe({
      next: (data) => {
        this.reservationsssss = data;
  
        // Count reservations per partner
        const partnerCounts: { [key: string]: number } = {};
        data.forEach(res => {
          res.assignedPartners?.forEach(partner => {
            const partnerName = partner?.name || 'Unknown';
            if (partnerCounts[partnerName]) {
              partnerCounts[partnerName]++;
            } else {
              partnerCounts[partnerName] = 1;
            }
          });
        });
        
  
        // Prepare chart data
        const categories = Object.keys(partnerCounts);
        const counts = Object.values(partnerCounts);
  
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
