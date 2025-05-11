import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PartnerService } from 'src/app/services/partner.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Question } from 'src/app/models/question';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-question-dialog',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-question-dialog.component.html',
  styleUrl: './edit-question-dialog.component.scss',
  standalone: true,
})
export class EditQuestionDialogComponent {
 question: Question;
  packageId: string;
  partnerId: string;
  
constructor(
    private service: PartnerService,
    @Inject(MAT_DIALOG_DATA) public data: { packageId: string, partnerId: string, question: Question },
    private dialogRef: MatDialogRef<EditQuestionDialogComponent>
  ) {
  }

  

    ngOnInit(): void {
      this.packageId = this.data.packageId;
    this.partnerId = this.data.partnerId;
    this.question = this.data.question;  
  }
onSubmit(form: any): void {
  if (form.valid) {
    // Send the question as an array
    this.service.updateQuestion(this.partnerId,this.packageId, [this.question]).subscribe(
      (response) => {
    Swal.fire({
        title: 'Success!',
        text: 'question was updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.dialogRef.close(response); // Close the dialog and return the new package
      });
      },
      (error) => {
        console.error('Error updating question:', error);
      }
    );
  } else {
    console.log("Form is invalid");
  }
}

}
