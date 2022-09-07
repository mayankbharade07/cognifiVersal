import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-view-income',
  templateUrl: './view-income.component.html',
  styleUrls: ['./view-income.component.scss']
})
export class ViewIncomeComponent implements OnInit {
  incomeIdData: any;
  incomeId: any;

  imgSrc = ""
  constructor(
    private activateRoute: ActivatedRoute,
    public service:ServiceService,
    private spinner: NgxSpinnerService
  ) { 
    this.activateRoute.queryParams.subscribe(parsam => {      
      this.incomeId = JSON.parse(atob(parsam.data));
    });
    this.getExpenseDetails(this.incomeId)
  }

  ngOnInit(): void {
  }

  getExpenseDetails(Id){
    this.spinner.show();
    this.service.getIncomeDetailsbyId(Id).subscribe((data:any) =>{
      console.log("Income Details Data:- ",data);
      if(data){
        this.spinner.hide();
        this.incomeIdData = data.data.jsonData;
      }
      console.log("Income Details Data:- ",this.incomeIdData);
    })
  }

}
