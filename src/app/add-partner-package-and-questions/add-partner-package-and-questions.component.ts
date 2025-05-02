import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PartnerPackage } from '../models/partnerPackage';
import { ExtraPackageDetails } from '../models/extraPackageDetails';
import { Question } from '../models/question';
import { PartnerService } from '../services/partner.service';

@Component({
  selector: 'app-add-partner-package-and-questions',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-partner-package-and-questions.component.html',
  styleUrls: ['./add-partner-package-and-questions.component.scss']
})
export class AddPartnerPackageAndQuestionsComponent implements OnInit {
  packageForm: FormGroup;

  constructor(
    private partnerService: PartnerService,
    public dialogRef: MatDialogRef<AddPartnerPackageAndQuestionsComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.packageForm = this.fb.group({
      packageName: ['', Validators.required],
      vat: ['', Validators.required],
      country: ['', Validators.required],
      countryCode: ['', Validators.required],
      city: ['', Validators.required],
      currency: ['', Validators.required],

      extraDetails: this.fb.group({
        id: [this.generateRandomId()],
        duration: [''],
        packageDescription: [''],
        PrivateCars: [''],
        VansOrSimilar: [''],
        SUVs: [''],
        numberOfServices: [''],
        packageName: [''],
        caravans: ['']
      }),

      questions: this.fb.array([])
    });
  }

  get questionsFormArray(): FormArray {
    return this.packageForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    const questionGroup = this.fb.group({
      id: [this.generateRandomId()],
      text: ['', Validators.required],
      type: [0, Validators.required],
      expectedAnswer: [''],
      mandatory: [false]
    });
    this.questionsFormArray.push(questionGroup);
  }

  removeQuestion(index: number): void {
    this.questionsFormArray.removeAt(index);
  }

  addPackage(): void {
    if (this.packageForm.valid) {
      const formValues = this.packageForm.value;

      const extraDetails = formValues.extraDetails
        ? ExtraPackageDetails.fromJson(formValues.extraDetails)
        : undefined;

      const questions = formValues.questions
        ? formValues.questions.map((q: any) => Question.fromJson(q))
        : [];

      const newPackage = new PartnerPackage(
        this.generateRandomId(),
        formValues.packageName,
        formValues.vat,
        formValues.country,
        formValues.countryCode,
        formValues.city,
        formValues.currency,
        extraDetails,
        questions
      );

      this.partnerService.addPartnerPackage(newPackage).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  backAllCompanies(): void {
    this.dialogRef.close();
  }

  generateRandomId(): string {
    return Math.random().toString(36).substring(2, 10);
  }
}
