import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss']
})
export class ExpenseDetailsComponent implements OnInit {
  expensedetailsdata: any;
  data: any;
  expenseId: any;
  expensebyid: any;

  constructor(
    private activateRoute: ActivatedRoute,
    public service:ServiceService,
    private spinner: NgxSpinnerService
  ) { 
    this.spinner.show();  
    this.activateRoute.queryParams.subscribe(parsam => {      
      this.expensedetailsdata = JSON.parse(atob(parsam.data));
      if (this.expensedetailsdata) {
        this.data = this.expensedetailsdata;
        this.expenseId = this.expensedetailsdata.expenseId;      
      } 
      this.spinner.hide();  
    });
    // console.log("Expense Details data:- ",this.data)
    this.getExpenseDetails(this.expenseId)
  }

  ngOnInit(): void {
  }

  getExpenseDetails(expenseId){    
    this.spinner.show();
    this.service.getExpenseDetailsbyId(expenseId).subscribe((data:any) =>{     
      if(data){
        this.spinner.hide();        
        this.expensebyid = data.data.jsonData
      }
      console.log("Expense Details Data:- ",this.expensebyid);
    })
  }

}
