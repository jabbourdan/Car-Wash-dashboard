import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PartnerPackage } from '../models/partnerPackage';
import { ExtraPackageDetails } from '../models/extraPackageDetails';
import { Question } from '../models/question';
import { PartnerService } from '../services/partner.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-add-partner-package-and-questions',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './add-partner-package-and-questions.component.html',
  styleUrls: ['./add-partner-package-and-questions.component.scss']
})
export class AddPartnerPackageAndQuestionsComponent implements OnInit {
  packageForm: FormGroup;
  public partnerPackageObj: PartnerPackage = new PartnerPackage(null, '', '', '', '', '', '');
  public extraPackageDetailsObj: ExtraPackageDetails = new ExtraPackageDetails(null, '', '', '', '', '', '');

  constructor(
    private partnerService: PartnerService,
    public dialogRef: MatDialogRef<AddPartnerPackageAndQuestionsComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {}

  ngOnInit(): void {
  }

 

  addQuestion(): void {

  }

  removeQuestion(index: number): void {
  }

  addPackage(): void {
    this.partnerPackageObj.extraDetails=this.extraPackageDetailsObj
    console.log('id:', this.data.partnerId);

    console.log('After User Input ALl:', this.partnerPackageObj);
    console.log('After User Input Extra Package Details :', this.extraPackageDetailsObj);
    this.partnerService.addPartnerPackage(this.data.partnerId,this.partnerPackageObj).subscribe((data) => {
      if (data) {
      console.log("yees")
      } else {
        console.log("nooo")

      }
    });
  }
  

  backAllCompanies(): void {
  }


}
