import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtraPackageDetails } from 'src/app/models/extraPackageDetails';
import { PartnerExtraDetails } from 'src/app/models/partnerExtraDetails';
import { PartnerPackage } from 'src/app/models/partnerPackage';
import { Partners } from 'src/app/models/partners';
import { Regions } from 'src/app/models/regions';
import { PartnerDataService } from 'src/app/services/partner-data.service';
import { PartnerService } from 'src/app/services/partner.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPartnerPackageAndQuestionsComponent } from 'src/app/add-partner-package-and-questions/add-partner-package-and-questions.component';
import { EditQuestionDialogComponent } from '../edit-question-dialog/edit-question-dialog.component';
import { Question } from 'src/app/models/question';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-partner-info-dialog',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './partner-info-dialog.component.html',
  styleUrl: './partner-info-dialog.component.scss'
})
export class PartnerInfoDialogComponent {
  partnerExtraDetails: PartnerExtraDetails = new PartnerExtraDetails();
  regionsList: Array<Regions> = [];
  partnerPackagesList: Array<PartnerPackage> = [];
  showExtraDetails: boolean = false;
  public partnerId: string;
  partner: Partners;

  constructor(
    private partnerService: PartnerService,
    private route: ActivatedRoute,
    private router: Router,
    private partnerDataService: PartnerDataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const partner = this.partnerDataService.getPartner();

    if (partner) {
      this.partner = partner;
      this.partnerId = partner.id;
      this.getPartnerExtraDetails();
      this.gePartnerPackage();
    } else {
      console.error('No partner data found. Did you refresh the page or navigate directly?');
    }
  }

  //extra details
  getPartnerExtraDetails(): void {
    this.partnerService.getPartnerExtraDetails(this.partnerId).subscribe({
      next: (data) => {
        this.partnerExtraDetails = data;
        this.regionsList = data.regions;
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
    this.partnerService.gePartnerPackage(this.partnerId).subscribe({
      next: (data) => {
        console.log('getttt id' + this.partnerId);

        this.partnerPackagesList = data;
        console.log('partnerPackagesList:', data);
      },
      error: (err) => {
        console.error('Failed to load partners:', err);
      }
    });
  }

  goBackToPartnersList() {
    this.router.navigate(['/allPartners']);
  }
openAddPackageDialog(): void {
  const firstCountryCode = this.regionsList.length > 0 ? this.regionsList[0].countryCode : null;

  const dialogRef = this.dialog.open(AddPartnerPackageAndQuestionsComponent, {
    width: '1500px',
    height: '600px',
    data: { 
      partnerId: this.partnerId,
      countryCode: firstCountryCode
    }
    
  });
  this.gePartnerPackage();

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      console.log('New package:', result);
      this.partnerPackagesList.push(result);
      this.gePartnerPackage();
    }
    this.gePartnerPackage();
  });
  this.gePartnerPackage();
}


openEditQuestionDialog(packageId: string, question: Question): void {
  const dialogRef = this.dialog.open(EditQuestionDialogComponent, {
    width: '600px',
    data: { 
      packageId: packageId,
      partnerId: this.partnerId,
      question: question 
    }
  });

  dialogRef.afterClosed().subscribe((res) => {
    if (res) {
      // Handle response if needed
      console.log("Dialog closed with result:", res);
    }
  });
}

removePackage(pkg) {
  Swal.fire({
    title: "Delete this Package?",
    text: pkg.packageName,
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.value) {
      this.partnerService.removePackage(pkg.id, this.partnerId).subscribe(
        (res) => {
          Swal.fire("Deleted", pkg.packageName + " Deleted", "success");
          this.gePartnerPackage();
        },
        (error) => {
          Swal.fire("Deleted", pkg.packageName + " Deleted", "success");
          this.gePartnerPackage();
          // console.error("Error deleting package:", error);
          // Swal.fire("Error", "Failed to delete package", "error");
        }
      );
    }
  });
}


}
