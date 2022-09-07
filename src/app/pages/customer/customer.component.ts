import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomersComponent } from '../trips/add-customers/add-customers.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { ServiceService } from 'src/app/service/service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  private paginator: MatPaginator;
  private sort: MatSort;
  allcustomerData: any = new MatTableDataSource([]);
  displayedColumns: string[] = ['expenseId', 'date', 'expensetype', 'amount', 'tripid-name'
    , 'user', 'action'];
  customer: any;
  income: any;
  view = "customer";
  expenseFilterForm: FormGroup;
  modalService: any;
  customerdatalist: any;
  templatedata: any[];
  customers: any;
  phone: string;
  constructor(
    private router: Router,
    public service: ServiceService,
    private spinner: NgxSpinnerService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
  ) { }

  @ViewChild(MatPaginator, { static: false }) set matPaginator(
    mp: MatPaginator) {
    this.paginator = mp;
    this.setPaginationAndSort();
  }

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setPaginationAndSort();
  };


//-----------------------------------------------------


applyFilter(event: Event) {
  console.log('Apply Filter ',this.allcustomerData)
  const filterValue = (event.target as HTMLInputElement).value;
  this.allcustomerData.filter = filterValue.trim().toLowerCase();

  if (this.allcustomerData.paginator) {
    this.allcustomerData.paginator.firstPage();
  }
  }

  ngOnInit() {
    this.getallCustomers();
  }

  viewPage(data) {
    this.view = data
  }

  BulkDialog() {
    this.dialog.open(BulkUploadComponent, {
      width: '25%',
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
      }
    })
  }

  ImportEmployeeValidation(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }, (reason) => {
    });
  }

  openDialog() {
    this.dialog.open(AddCustomersComponent, {
      width: '50%',
    }).afterClosed().subscribe(val => {
      if (val === 'save') {

      }
    })
  }

  downloadTemplate(): void {
    this.templatedata = [{
      "name" : "",
      "address" : "",
      "city" : "",
      "state" : "",
      "landmark" : "",
      "email" : "",
      "phone" : this.phone,
      "notes" : "",
      "orgId" : "",
      "orgName" : "",
    }];

    this.service.exportAsExcelLeaveBalance(this.templatedata, 'Template');
  }

  getallCustomers() {
    this.spinner.show()
    this.service.getallCustomersData().subscribe((data: any) => {
      console.log('GET Customer DATA: ', data)
      if (data) {
        this.spinner.hide();  
        this.customerdatalist = data;
        this.allcustomerData = new MatTableDataSource(this.customerdatalist);
        this.setPaginationAndSort()
        console.log('GET tripsData DATA: ', this.allcustomerData)
      } else {
        console.log("No Records Found Of Customer Data");
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();  
      console.log("Something went wrong");
    })
  }

  setPaginationAndSort() {
    this.allcustomerData.paginator = this.paginator;
    this.allcustomerData.sort = this.sort;
  }

  // Edit Customer Data
  editCustomerData(data) {
    var editobject = {
      action: 'edit',
      data: data,
    }
    this.dialog.open(AddCustomersComponent, {
      width: '50%',
      data: editobject,
    })
  }

  //view customer data 
  viewCustomer(data) {
    this.router.navigate(["/pages/View-Customer"],
      {
        queryParams: { data: btoa(JSON.stringify(data)) }
      });
  }

  //Delete Customer Data
  deleteCustomer(data) {
    this.spinner.show();  
    this.service.deleteCustomerdata(data).subscribe((data: any) => {
      if (data) {
        this.spinner.hide();  
        this.getallCustomers();
        console.log('Data Deleted:-', data)
      }
      else {
        // this.toastr.info(data.message);
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();  
      console.log("Something went wrong", error);
    })
  }

}
