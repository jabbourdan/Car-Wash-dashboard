import { Component, OnInit } from '@angular/core';
import { PartnerService } from '../services/partner.service';
import { PartnerPackage, PartnerPriceDTO, Question, RegionDto, ServiceProduct } from '../models/test';
import { CommonModule } from '@angular/common';
import { PartnerExtraDetails } from '../models/partnerExtraDetails';

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

  constructor(private service: PartnerService) { }

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
    const region = this.selectedRegion;
    const partnerId = "1ee9019a-ce74-46c2-b7d9-d4b31dab14b4";
  
    const partnerPackage = {
      id: crypto.randomUUID(), // Add a unique ID
      countryCode: "IL",
      country: "Israel",
      city: "Haifa",
      packageName: "test",
      currency: "usd",
      numberOfServices: 5,
      active: true,
      vat: 0.17, // Add VAT if required
      regionDTOs: [
        {
          id: region.id,
          countryCode: region.countryCode,
          country: region.country,
          city: region.city
        }
      ],
      serviceProducts: this.selectedServices.map((service) => ({
        id: service.id,
        internalID: service.internalID,
        name: service.name,
        description: service.description,
        price: service.price
      })),
      stockProducts: [], // Add stock products if required
      questions: [], // Add questions if required
      extraDetails: {
        duration: "1",
        packageDescription: "dgfgfdg",
        PrivateCars: 50,
        VansOrSimilar: 100,
        SUVs: 100,
        Caravans: 100,
        numberOfServices: 5
      },
      partnerId: partnerId,
      toJson: () => JSON.stringify(this) // Add a `toJson` method if required
    };
  
    this.service.addPartnerPackage(partnerId, partnerPackage).subscribe({
      next: (res) => console.log('Package added successfully:', res),
      error: (err) => console.error('Error adding package:', err)
    });
  }
}
