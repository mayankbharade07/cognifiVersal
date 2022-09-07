import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
export const MY_FORMATSD = {
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
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_FORMATSD
    }
  ],
})

export class IncomeComponent implements OnInit {
  private paginator: MatPaginator;
  private sort: MatSort;

  displayedColumns: string[] = [
    'incomeId',
    'incomeDate',
    'incomeTypeName',
    'currencynameandamount',
    'tripId',
    'vehical-number',
    'driver-name',
    'orgName',
    'status',
    'action'
  ];

  income: any;
  tabledata: any;
  incomeData: any = new MatTableDataSource([]);
  incomeFilterForm: FormGroup;
  allIncometype: any;

  constructor(
    private spinner: NgxSpinnerService,
    public service: ServiceService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  @ViewChild(MatPaginator, { static: false }) set matPaginator(
    mp: MatPaginator) {
    this.paginator = mp;
    this.setPaginationAndSort();
  }

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setPaginationAndSort();
  }

  ngOnInit() {
    this.incomeFilterForm = this.fb.group({
      fdt: [''],
      tdt: [''],
      exptype: ['']
    })
    this.gettypeIncome();
    this.getIncome();
    // this.getallTrips();
  }

  //GET ALL INCOMES DATA
  getIncome() {
    this.spinner.show();
    this.service.getincome().subscribe((data: any) => {
      console.log("Income Data: ", data)
      if (data.status) {
        this.spinner.hide();
        this.income = data.data.jsonData
        console.log("t-income", this.income)
        this.incomeData = new MatTableDataSource(this.income);
        this.setPaginationAndSort()
      }
      else {
        console.log("No Records Found");
      }
    }, (error: HttpErrorResponse) => {
      console.log("Something went wrong");
      this.spinner.hide();
    })
  }

  //Delete Income Data
  deleteIncome(data) {
    this.spinner.show();
    this.service.deleteIncome(data).subscribe((res: any) => {
      console.log("-Del res", res)
      if (res.status) {
        this.spinner.hide();
        this.getIncome();
        this.service.showToaster(res.message);
      }
      else {
        this.service.infoSuccess(res.message);
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log("Something went wrong", error);
    })
  }

  //  Edit Income Data
  editIncomeData(data) {
    this.router.navigate(["/pages/Add-income"],
      {
        queryParams: { data: btoa(unescape(encodeURIComponent(JSON.stringify(data)))) }
      });
  }

  viewExpenseDetails(data) {
    this.router.navigate(["/pages/View-Income"],
      {
        queryParams: { data: btoa(unescape(encodeURIComponent(JSON.stringify(data)))) }
      });
  }

  // getallTrips() {
  //   this.spinner.show();
  //   this.service.getallTripsData().subscribe((data: any) => {
  //     console.log('GET tripsData DATA: ', data)
  //     if (data.success == true) {
  //       this.spinner.hide();
  //       this.tabledata = data.list;
  //       // this.incomeData = new MatTableDataSource(data.list);
  //       // this.setPaginationAndSort()
  //       console.log(this.incomeData);

  //       console.log('GET tripsData DATA: ', this.tabledata)
  //     } else {
  //       console.log("No Records Found Of trips Data");
  //     }
  //   }, (error: HttpErrorResponse) => {
  //     console.log("Something went wrong");
  //   })
  // }

  setPaginationAndSort() {
    this.incomeData.paginator = this.paginator;
    this.incomeData.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.incomeData.filter = filterValue.trim().toLowerCase();

    if (this.incomeData.paginator) {
      this.incomeData.paginator.firstPage();
    }
  }

  //gettypeIncome -------------------------------------------> 
  gettypeIncome() {
    this.spinner.show();
    this.service.getallincometype().subscribe((data: any) => {
      console.log("Income Data Type : ", data)
      if (data.status == true) {
        this.spinner.hide();
        this.allIncometype = data.data.jsonData
      }
      else {
        console.log("No Records Found");
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log("Something went wrong");
    })
  }

  //FILTER ACCORDEING TO DATE RANGE AND TYPES
  incomeFilter() {
    this.spinner.show();
    this.incomeFilterForm.value.fdt = moment(this.incomeFilterForm.value.fdt).format("YYYY-MM-DD HH:mm:ss");
    this.incomeFilterForm.value.tdt = moment(this.incomeFilterForm.value.tdt).format("YYYY-MM-DD HH:mm:ss");
    this.incomeFilterForm.value.exptype = this.incomeFilterForm.value.exptype;
    if (this.incomeFilterForm.value.fdt == "Invalid date") {
      this.incomeFilterForm.value.isdatefilter = false;
      delete this.incomeFilterForm.value.tdt,
        delete this.incomeFilterForm.value.fdt
    } else {
      this.incomeFilterForm.value.isdatefilter = true;
    }
    this.service.getincomefilter(this.incomeFilterForm.value).subscribe((res: any) => {
      console.log("Income Data: ", res)
      if (res.status == true) {
        this.spinner.hide();
        // this.expenses = data
        this.service.showToaster(res.message);
        this.incomeData = new MatTableDataSource(res.data.jsonData);
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
}