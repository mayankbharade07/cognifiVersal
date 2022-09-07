import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from 'src/app/service/service.service';
import * as moment from 'moment';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ExpenseListComponent implements OnInit {
  displayedColumns: string[] = ['expenseId', 'date', 'expensetype', 'amount', 'tripid-name','vehical-number','driver-name'
  ,'user', 'bill', 'action'];

  expenses: any;
  income: any;
  view = "expense";
  expenseFilterForm: FormGroup;
  idFilter = new FormControl('');
  dataSource = new MatTableDataSource();
  
  expensesData: MatTableDataSource<unknown>;
  expensestype: any;
  constructor(
    public service : ServiceService,
    private router: Router,
    public fb :FormBuilder,
    private spinnerService: NgxSpinnerService,
    private _liveAnnouncer: LiveAnnouncer,
    private spinner : NgxSpinnerService
    
  ) {
    
   }
  @ViewChild(MatSort ) sort: MatSort; 
  @ViewChild(MatPaginator)paginator: MatPaginator;
  ngAfterViewInit() {
    this.expenses.sort = this.sort;
    this.expenses.paginator = this.paginator;
  }
  ngOnInit() {
    this.expenseFilterForm = this.fb.group({
      fdt: [null],
      tdt: [null],
      exptype: [null]

    })
    this.gettypeExpenses();
    this.getExpenses();
    this.getIncome();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.expensesData.filter = filterValue.trim().toLowerCase();

    if (this.expensesData.paginator) {
      this.expensesData.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
   
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  viewPage(data) {
    this.view = data
  }

  gettypeExpenses() {
    this.spinner.show();  
    this.service.getexpensestype().subscribe((data: any) => {
      console.log("Expense Data Type : ", data)
      if (data.status) {
        this.spinner.hide();  
        this.expensestype = data.data.jsonData
        // this.toastr.success(data.message)
      } else {
        // this.toastr.info(data.message)
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();  
      console.log("Something went wrong");
    })
  }

  expensesFilter(){
    this.spinner.show();  
    this.expenseFilterForm.value.fdt = moment(this.expenseFilterForm.value.fdt).format("YYYY-MM-DD HH:mm:ss");
    this.expenseFilterForm.value.tdt = moment(this.expenseFilterForm.value.tdt).format("YYYY-MM-DD HH:mm:ss");
    if (this.expenseFilterForm.value.fdt == "Invalid date") {
      this.expenseFilterForm.value.isdatefilter = false;
      delete this.expenseFilterForm.value.tdt,
      delete this.expenseFilterForm.value.fdt
    } else {
      this.expenseFilterForm.value.isdatefilter = true;
    }
    this.service.getexpensesfilter(this.expenseFilterForm.value).subscribe((res: any) => {
      console.log("Expense Data: ",res)
      if (res.status == true) {
        this.spinner.hide();  
        this.service.showToaster(res.message);
        this.expensesData = new MatTableDataSource(res.data.jsonData);
        this.setPaginationAndSort()
      }
      else {
        this.service.infoSuccess(res.message);
        console.log("No Records Found");
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();  
      console.log("Something went wrong");
    })
  }

  getIncome() {
    this.spinner.show();  
    this.service.getincome().subscribe((data: any) => {
      console.log("Income Data: ",data)
      if (data) {
        this.spinner.hide();  
        this.income = data
      }
      else {
        console.log("No Records Found");
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();  
      console.log("Something went wrong");
    })
  }

  getExpenses() {
    this.spinner.show();  
    this.service.getexpenses().subscribe((data: any) => {
      console.log("Expense Data: ",data)
      if (data.status == true) {
        this.spinner.hide();  
        this.expensesData = new MatTableDataSource(data.data.jsonData);
        this.setPaginationAndSort()
      }
      else {
        console.log("No Records Found");
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();  
      console.log("Something went wrong");
    })
  }

  setPaginationAndSort() {
    this.expensesData.paginator = this.paginator;
    this.expensesData.sort = this.sort;
  }

  viewExpenseDetails(data) {
    this.router.navigate(["/pages/Expenses-Details"],
    {
      queryParams: { data: btoa(unescape(encodeURIComponent(JSON.stringify(data)))) }
    });
  }


// Delete Expense Data
deleteExpense(data) {   
  this.spinnerService.show();
  this.service.deleteExpense(data).subscribe((res: any) => {
    if (res.status) {
      this.getExpenses();
      console.log('Data Deleted:-', res)
    }
    else {
      // this.toastr.info(data.message);
    }
  }, (error: HttpErrorResponse) => {
    
    console.log("Something went wrong", error);
  })  
  this.spinnerService.hide();
}

//  Edit Income Data
editExpenseData(data) {
  debugger
  this.router.navigate(["/pages/Add-Expenses"],
    {
      queryParams: { data: btoa(unescape(encodeURIComponent(JSON.stringify(data)))) }
    });
}




}