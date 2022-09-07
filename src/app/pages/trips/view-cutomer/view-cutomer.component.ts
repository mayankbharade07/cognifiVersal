import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-view-cutomer',
  templateUrl: './view-cutomer.component.html',
  styleUrls: ['./view-cutomer.component.scss']
})
export class ViewCutomerComponent implements OnInit {
  customerdetailsdata: any;
  data: any;
  customerId: any;
  cutomerdetailsdatabyid: any;

  constructor(
    private activateRoute: ActivatedRoute,
    public service:ServiceService,
  ) { 
    this.activateRoute.queryParams.subscribe(parsam => {
      
      this.customerdetailsdata = JSON.parse(atob(parsam.data));
      if (this.customerdetailsdata) {
        this.data = this.customerdetailsdata;
        this.customerId = this.customerdetailsdata.id;      
      } 

    });
    // console.log("Expense Details data:- ",this.data)
    this.getCustomerDetails(this.customerId)
  }

  ngOnInit(): void {
  }

  getCustomerDetails(customerId){
    
    this.service.getcustomerDetailsbyId(customerId).subscribe((data:any) =>{
     
      if(data){
        
        this.cutomerdetailsdatabyid = data.data.jsonData
      }
      console.log("Expense Details Data:- ",this.cutomerdetailsdatabyid);
    })
  }

}
