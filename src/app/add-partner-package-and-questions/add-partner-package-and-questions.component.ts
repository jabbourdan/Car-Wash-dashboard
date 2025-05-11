import { Component, Inject, OnInit } from '@angular/core';
import { PartnerService } from '../services/partner.service';
import { CommonModule } from '@angular/common';
import { PartnerExtraDetails } from '../models/partnerExtraDetails';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { Regions } from '../models/regions';
import { Question } from '../models/question';
import { ServiceProduct } from '../models/serviceProduct';
import { PartnerPackage } from '../models/partnerPackage';
import { ExtraPackageDetails } from '../models/extraPackageDetails';


@Component({
  selector: 'app-add-partner-package-and-questions',
  templateUrl: './add-partner-package-and-questions.component.html',
  styleUrls: ['./add-partner-package-and-questions.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]

})
export class AddPartnerPackageAndQuestionsComponent implements OnInit {
  regions: Regions[] = [];
  services: ServiceProduct[] = [];
  selectedRegion: Regions = new Regions('', '', '', '');
  selectedServices: ServiceProduct[] = [];


  packageName: string = '';
  currency: string = '';
  vat: number = 0;
  privateCars: number = 0;
  vansOrSimilar: number = 0;
  suvs: number = 0;
  caravans: number = 0;
  numberOfServices: number = 0;
  duration: string = '';
  packageDescription: string = '';


  //Q
  text: string = '';
  type: number = 0;
  expectedAnswer: string = '';
  mandatory: boolean = true;

  questions: Question[] = [];
showQuestionsSection = false;
  

  constructor(
    private service: PartnerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddPartnerPackageAndQuestionsComponent>
  ) {}

  ngOnInit(): void {
    const countryCode = this.data.countryCode;
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

  fetchServicesForRegion(region: Regions): void {
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

  addQuestion() {
  this.questions.push(new Question('', '', 0, '', true));

}

removeQuestion(index: number) {
  this.questions.splice(index, 1);
}

  addPackage(): void {
  const region = this.selectedRegion;
  const partnerId = this.data.partnerId;

  const partnerPackage = new PartnerPackage(
      crypto.randomUUID(),
      this.packageName,
      this.vat,
      region.country,
      this.privateCars,
      this.vansOrSimilar,
      this.suvs,
      this.caravans,
      this.numberOfServices,
      region.countryCode,
      region.city,
      true,
      this.currency,
      new ExtraPackageDetails(
        this.duration,
        this.packageDescription,
        this.privateCars,
        this.vansOrSimilar,
        this.suvs,
        this.caravans,
        this.numberOfServices
      ),
      this.questions,
      [region],
      [], // stockProducts
      this.selectedServices,
      partnerId // partnerId
    );

  this.service.addPartnerPackage(partnerId, partnerPackage).subscribe({
 next: (res) => {
  Swal.fire({
    title: 'Success!',
    text: 'Partner package added successfully.',
    icon: 'success',
    confirmButtonText: 'OK'
  }).then(() => {
    this.dialogRef.close(res); // Close the dialog and return the new package
  });
},
    error: (err) => {
      console.error('Error adding package:', err);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong while adding the package.',
        icon: 'error',
        confirmButtonText: 'Close'
      });
    }
  });
}

}
