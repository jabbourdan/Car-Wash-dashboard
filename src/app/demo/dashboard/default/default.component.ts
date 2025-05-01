// angular import
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import tableData from 'src/fake-data/default-data.json';

import { MonthlyBarChartComponent } from 'src/app/theme/shared/apexchart/monthly-bar-chart/monthly-bar-chart.component';
import { IncomeOverviewChartComponent } from 'src/app/theme/shared/apexchart/income-overview-chart/income-overview-chart.component';
import { AnalyticsChartComponent } from 'src/app/theme/shared/apexchart/analytics-chart/analytics-chart.component';
import { SalesReportChartComponent } from 'src/app/theme/shared/apexchart/sales-report-chart/sales-report-chart.component';

// icons
import { IconService, IconDirective } from '@ant-design/icons-angular';
import { FallOutline, GiftOutline, MessageOutline, RiseOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { PartnerService } from 'src/app/services/partner.service';
import { Partners } from 'src/app/models/partners';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservationModel } from 'src/app/models/reservation.model';
import { PartnersCharsByreservationsComponent } from 'src/app/components/partners-chars-byreservations/partners-chars-byreservations.component';
import { PartnersStatusCharsComponent } from 'src/app/components/partners-status-chars/partners-status-chars.component';
import { CustomerResevationsCharsComponent } from 'src/app/components/customer-resevations-chars/customer-resevations-chars.component';
import { CustomerStatusCharsComponent } from 'src/app/components/customer-status-chars/customer-status-chars.component';

@Component({
  selector: 'app-default',
  imports: [
    CommonModule,
    CardComponent,
    IconDirective,
    MonthlyBarChartComponent,
    IncomeOverviewChartComponent,
    AnalyticsChartComponent,
    SalesReportChartComponent,
    PartnersCharsByreservationsComponent,
    PartnersStatusCharsComponent,
    CustomerResevationsCharsComponent,
    CustomerStatusCharsComponent
  ],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  private iconService = inject(IconService);
  partnersList: Array<Partners> = [];
  partnersCount:number=0
  customers: Customer[] = []; // Full list from server
  customersCount:number=0
  reservationsssss: ReservationModel[] = [];
  reservationsCount:number=0
  AnalyticEcommerce: any[] = []; // just declare it, don't assign yet


  // constructor
  constructor(private partnerService: PartnerService,
    private customerService: CustomerService,
    private reservationService: ReservationService

  ) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  }

  ngOnInit(): void {
    this.getAllPartners();
    this.loadCustomers();
    this.loadReservations();
  }

  getAllPartners(): void {
    this.partnerService.getAllPartners().subscribe({
      next: (data) => {
        this.partnersList = data;
        this.partnersCount = this.partnersList.length;
        this.updateAnalyticsData(); // ✅ update after data load
      },
      error: (err) => {
        console.error('Failed to load partners:', err);
      }
    });
  }
  
  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.customersCount = this.customers.length;
        this.updateAnalyticsData(); // ✅ update after data load
      },
      error: (err) => {
        console.error('Failed to load customers:', err);
      }
    });
  }

  loadReservations(): void {
    this.reservationService.getAllReservationss().subscribe({
      next: (data) => {
        this.reservationsssss = data;
        this.reservationsCount = this.reservationsssss.length;
        this.updateAnalyticsData(); // <-- call this here too
      },
      error: (err) => {
        console.error('Failed to load reservations:', err);
      }
    });
  }

  getPartnersPercentage(): string {
    const total = this.partnersCount + this.customersCount;
    if (total === 0) return '0%';
    const percent = (this.partnersCount / total) * 100;
    return percent.toFixed(1) + '%';
  }
  
  getCustomersPercentage(): string {
    const total = this.partnersCount + this.customersCount;
    if (total === 0) return '0%';
    const percent = (this.customersCount / total) * 100;
    return percent.toFixed(1) + '%';
  }
  
  


  updateAnalyticsData(): void {
    this.AnalyticEcommerce = [
      {
        title: 'Total Partners',
        amount: this.partnersCount,
        background: 'bg-light-primary',
        border: 'border-primary',
        icon: 'rise',
        percentage: this.getPartnersPercentage(),
        color: 'text-primary',
      },
      {
        title: 'Total Customers',
        amount: this.customersCount,
        background: 'bg-light-warning',
        border: 'border-warning',
        icon: 'rise',
        percentage: this.getCustomersPercentage(),
        color: 'text-warning',
      },
      {
        title: 'Total Reservations',
        amount: this.reservationsCount,
        background: 'non',
        border: 'non',
        icon: 'calendar',
        color: 'non',
      }
    ];
  }
  
  

  recentOrder = tableData;

 

  transaction = [
    {
      background: 'text-success bg-light-success',
      icon: 'gift',
      title: 'Order #002434',
      time: 'Today, 2:00 AM',
      amount: '+ $1,430',
      percentage: '78%'
    },
    {
      background: 'text-primary bg-light-primary',
      icon: 'message',
      title: 'Order #984947',
      time: '5 August, 1:45 PM',
      amount: '- $302',
      percentage: '8%'
    },
    {
      background: 'text-danger bg-light-danger',
      icon: 'setting',
      title: 'Order #988784',
      time: '7 hours ago',
      amount: '- $682',
      percentage: '16%'
    }
  ];
}
