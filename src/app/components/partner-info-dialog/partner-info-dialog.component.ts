import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ExtraPackageDetails } from 'src/app/models/extraPackageDetails';
import { PartnerExtraDetails } from 'src/app/models/partnerExtraDetails';
import { PartnerPackage } from 'src/app/models/partnerPackage';
import { Partners } from 'src/app/models/partners';
import { Regions } from 'src/app/models/regions';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-partner-info-dialog',
  imports: [CommonModule,MatDialogModule],
  templateUrl: './partner-info-dialog.component.html',
  styleUrl: './partner-info-dialog.component.scss'
})
export class PartnerInfoDialogComponent {

  partnerExtraDetails: PartnerExtraDetails = new PartnerExtraDetails();
  regionsList: Array<Regions>=[];
  partnerPackagesList: Array<PartnerPackage>=[];
  showExtraDetails: boolean = false;

  constructor(
    private partnerService:PartnerService,
    public dialogRef: MatDialogRef<PartnerInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public partner: Partners
  ) {}


ngOnInit(): void {
  this.getPartnerExtraDetails();
  this.gePartnerPackage();
}


  onClose(): void {
    this.dialogRef.close(); // Close the dialog
  }


  
  
  //extra details
  getPartnerExtraDetails(): void {
    this.partnerService.getPartnerExtraDetails(this.partner.id).subscribe({
      next: (data) => {
        this.partnerExtraDetails=data;
        this.regionsList=data.regions;
        console.log('Partners:', data);
        console.log('Partners:', this.regionsList);
      },
      error: (err) => {
        console.error('Failed to load partners:', err);
      }
    });
  }

  
  toggleExtraDetails(): void {
    this.showExtraDetails = !this.showExtraDetails;
  }


  //partner Packages
  gePartnerPackage(): void {
    this.partnerService.gePartnerPackage(this.partner.id).subscribe({
      next: (data) => {
        this.partnerPackagesList=data;
        console.log('partnerPackagesList:', data);
      },
      error: (err) => {
        console.error('Failed to load partners:', err);
      }
    });
  }
}
