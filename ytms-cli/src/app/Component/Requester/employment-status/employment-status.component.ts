import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TrainingRequestService } from 'src/app/services/training-request.service';

@Component({
  selector: 'app-employment-status',
  templateUrl: './employment-status.component.html',
  styleUrls: ['./employment-status.component.css']
})
export class EmploymentStatusComponent {
  selectedOption: string = '';
  myForm!: FormGroup;
  nomiee:any;
  status:any;
  options = [
    { value: 'Active', name: 'Active' },
    { value: 'Deploy', name: 'Deploy' },
    { value: 'Resign', name: 'Resign' },
    { value: 'Other', name: 'Other' }
  ];

  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<EmploymentStatusComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private ser:TrainingRequestService,private router: Router,public dialog: MatDialog){
       this.nomiee=data;
       this.status=data.employment_status
       console.log(this.nomiee);
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      selectedOption: ['']
    });

   this.myForm.controls['selectedOption'].setValue(this.status);
  }

  submit(){
    console.log(this.myForm.controls['selectedOption'].value)
    this.nomiee.employment_status=this.myForm.controls['selectedOption'].value;
    this.ser.updateNomination(this.nomiee).subscribe(data=>{
      this.dialogRef.close();
    });
  }


}
