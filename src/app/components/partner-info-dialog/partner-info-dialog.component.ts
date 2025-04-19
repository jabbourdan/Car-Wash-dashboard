import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PartnerExtraDetails } from 'src/app/models/partnerExtraDetails';
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
  showExtraDetails: boolean = false;

  constructor(
    private partnerService:PartnerService,
    public dialogRef: MatDialogRef<PartnerInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public partner: Partners
  ) {}


ngOnInit(): void {
  this.getPartnerExtraDetails();
}


  onClose(): void {
    this.dialogRef.close(); // Close the dialog
  }


  
  
  //extra details
  getPartnerExtraDetails(): void {
    console.log("here"+this.partner.id)
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
}
