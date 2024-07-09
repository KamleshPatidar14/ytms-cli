import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';
import { Nomination } from 'src/app/Model/Nomination';
import { TrainingRequestService } from 'src/app/services/training-request.service';
import { EmploymentStatusComponent } from '../../Requester/employment-status/employment-status.component';

@Component({
  selector: 'app-edit-nomination',
  templateUrl: './edit-nomination.component.html',
  styleUrls: ['./edit-nomination.component.css']
})
export class EditNominationComponent {
  nomination: Nomination[] = [];
  activeData:any;
  resignData:any;
  otherData:any;
  deployData:any;

  activeDataCount:any;
  resignDataCount:any;
  otherDataCount:any;
  deployDataCount:any;
  totalCount:any;
  trainingId:any;
  realData:any;
  constructor(public dialogRef: MatDialogRef<EditNominationComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder, private router: Router, private ser: TrainingRequestService,
    private activatedRoute: ActivatedRoute, public dialog: MatDialog,private auth:AuthService,){
      this.trainingId = data;
      this.getNominationListByTrainingId(data);
  }
  ngOnInit(): void {

  }
  clickAll(){
    this.nomination=this.realData;
  }

  clickActive(){
    this.nomination=this.activeData
  }

  clickResign(){
    this.nomination=this.resignData
  }

  clickDeploy(){
    this.nomination=this.deployData
  }

  getNominationListByTrainingId(trainingId:any){
    if(trainingId != null && trainingId >0)
    this.ser.getNominationListByTrainingId(trainingId).subscribe(resp => {
      this.nomination = resp;
      this.totalCount=resp.length;
      this.realData=resp;
      this.activeData= resp.filter((p: { employment_status: string; })=>p.employment_status.toLocaleUpperCase()=='ACTIVE');
      this.activeDataCount=this.activeData.length;
      this.resignData= resp.filter((p: { employment_status: string; })=>p.employment_status.toLocaleUpperCase()=='RESIGN');
      this.resignDataCount=this.resignData.length;
      this.deployData=resp.filter((p: { employment_status: string; })=>p.employment_status.toLocaleUpperCase()=='DEPLOY');
      this.deployDataCount=this.deployData.length
      this.otherData=resp.filter((p: { employment_status: string; })=>p.employment_status.toLocaleUpperCase()=='OTHER');
      console.log(resp)
    });
  }

  deleteNominationById(nominationId: any){
    confirm("Are You Sure Want Delete Nomination ")
    this.ser.deleteNominationById(nominationId).subscribe(data=>{
      console.log(data)
      this.dialogRef.close();
    });
    //this.getNominationListByTrainingId(this.id);
    //this.reloadComponent();
  }

  editEmploymentStatus(nominee:any){
    const dialogRef =this.dialog.open(EmploymentStatusComponent,{
      data:nominee,
      width: '50%',
      height: '50%'
    } );
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The viewAttendance dialog was closed');
     // this.getTrainerTrainingList();
     this.getNominationListByTrainingId(this.trainingId);
    });
  }
  


}
