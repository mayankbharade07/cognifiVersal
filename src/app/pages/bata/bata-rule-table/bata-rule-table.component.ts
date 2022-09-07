import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from 'src/app/service/service.service';
import { BataRuleVariableComponent } from '../bata-rule-variable/bata-rule-variable.component';

@Component({
  selector: 'app-bata-rule-table',
  templateUrl: './bata-rule-table.component.html',
  styleUrls: ['./bata-rule-table.component.scss']
})
export class BataRuleTableComponent implements OnInit {
  allbataruledata: any;

  constructor(
    public service:ServiceService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.getbataruledata();
  }

  // varShow(data){
  //   console.log("______", data.bataSettingTimeRanges)
  //   data = data.bataSettingTimeRanges
  //   this.router.navigate(["/pages"],
  //   {
  //     queryParams: { data: btoa(JSON.stringify(data))}
  //   }
  //   )
  // }

  varShow(data){
    var editobject = {
      type: data.bataType,
      currency: data.currencyName,
      data: data
    }
    this.dialog.open(BataRuleVariableComponent, {
      width: 'fit-content',
      data: editobject,
    }).afterClosed().subscribe(val => {
      if (val === 'save') {

      }
    })
  }

  getbataruledata() {
    this.service.getallbataruledata().subscribe((data: any) => {
      console.log("getallbataruledata Data Type : ", data)
      if (data) {
        this.allbataruledata = data
      }
      else {
        console.log("No Records Found");
      }
    }, (error: HttpErrorResponse) => {
      console.log("Something went wrong");
    })
  }

  updateBata(data){      
      this.router.navigate(["/pages/Bata-Rule"],
        {
          queryParams: { data: btoa(JSON.stringify(data)) }
        });
  }

  deleteBataData(data) {  
    debugger 
    this.spinnerService.show();
    this.service.deleteBataRule(data).subscribe((data: any) => {
      if (data) {
        this.getbataruledata();
        console.log('Data Deleted:-', data)
      }
      else {
        // this.toastr.info(data.message);
      }
    }, (error: HttpErrorResponse) => {
      
      console.log("Something went wrong", error);
    })  
    this.getbataruledata();
    this.spinnerService.hide();
  }

}
