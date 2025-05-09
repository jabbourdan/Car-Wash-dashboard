import { Component, OnInit } from '@angular/core';
import { PartnerService } from '../services/partner.service';
import { PartnerPackage, PartnerPriceDTO, Question, RegionDto, ServiceProduct } from '../models/test';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-partner-package-and-questions',
  templateUrl: './add-partner-package-and-questions.component.html',
  styleUrls: ['./add-partner-package-and-questions.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AddPartnerPackageAndQuestionsComponent implements OnInit {
  regions: RegionDto[] = [];
  services: ServiceProduct[] = [];
  selectedRegion = new RegionDto('', '', '', '');
  selectedServices: ServiceProduct[] = [];

  constructor(private service: PartnerService) {}

  ngOnInit(): void {
    this.service.getRegions('IL').subscribe((res) => {
      this.regions = res;
    });
  }

  onRegionSelect(event: Event): void {
    const regionId = (event.target as HTMLSelectElement).value;
    const region = this.regions.find((r) => r.id === regionId);
    if (region) {
      this.selectedRegion = region;
      this.fetchServicesForRegion(region);
    }
  }

  fetchServicesForRegion(region: RegionDto): void {
    this.service.getServicesForRegion(region).subscribe(
      (res) => {
        this.services = res?.services?.map((s: any) => ServiceProduct.fromJson(s)) || [];
      },
      (error) => {
        console.error('Error fetching services for region', error);
        this.services = [];
      }
    );
  }

  toggleService(service: ServiceProduct, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedServices.push(service);
    } else {
      this.selectedServices = this.selectedServices.filter((s) => s.id !== service.id);
    }
  }

  addPackage(): void {
    const region = RegionDto.fromJson(this.selectedRegion);

    const packageModel = new PartnerPackage(
      crypto.randomUUID(),
      '17',
      region.country,
      region.countryCode,
      region.city,
      'Basic Package',
      'USD',
      { note: 'Auto-generated package' },
      this.selectedServices.map((s) => {
        const product = ServiceProduct.fromJson(s);
        product.status = product.status ?? 'Publish';
        return product;
      }),
      [
        ServiceProduct.fromJson({
          id: crypto.randomUUID(),
          productCode: 'STOCK001',
          internalID: 'INT001',
          name: 'Stock Product 1',
          description: 'This is a stock item',
          price: 20,
          currency: 'USD',
          externalID: 'EXT001',
          status: 'Publish',
          salePercentage: 0,
          systemProfitPercentage: 15,
          generalCosts: 3,
          categoryDTOList: [],
          images: [],
          tags: []
        })
      ],
      [new Question(crypto.randomUUID(), 'What is your car brand?', 0, 'Any brand', true)],
      true
    );

    console.log('Final payload:', JSON.stringify(packageModel.toJson(), null, 2));

    this.service.getAllPartners().subscribe((partners) => {
      const partnerId = partners[0]?.id;
      if (!partnerId) {
        alert('No partner ID found');
        return;
      }

      this.service.addPartnerPackage(partnerId, packageModel).subscribe({
        next: () => alert('Package added successfully'),
        error: (err) => {
          console.error('API rejected payload:', err);
          alert('Failed to add package. Check console for details.');
        }
      });
    });
  }
}
