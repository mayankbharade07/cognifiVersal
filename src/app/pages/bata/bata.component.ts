import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ServiceService } from 'src/app/service/service.service';
import { MY_FORMATS } from '../trips/add-income/add-income.component';
import { BataRuleViewComponent } from './bata-rule-view/bata-rule-view.component';
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
  selector: 'app-bata',
  templateUrl: './bata.component.html',
  styleUrls: ['./bata.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class BataComponent implements OnInit {
  private paginator: MatPaginator;
  private sort: MatSort;
  dataSource: any = new MatTableDataSource([]);
  displayedColumns: string[] = ['tripId', 'VehicleType', 'startDTplanned'
    , 'endDTplanned', 'plannedamount', 'startDTactual', 'endDTactual', 'actualamount', 'DriverName', 'Status', 'perfomance'];

  manufacturerdata: any;
  modaldata: any;
  tripsData: any;
  batashortdata: FormGroup;
  bataallowance: any;
  spinnerService: any;
  value: any;
  drivertripData: any;
  constructor(
    private service: ServiceService,
    private _liveAnnouncer: LiveAnnouncer,
    private fb: FormBuilder,
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
  }
  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnInit(): void {
    this.getManufacturer();
    this.getModal();
    this.getBataData();
    this.batashortdata = this.fb.group({
      manufacturer: [''],
      vehicletype: [''],
      modal: [''],
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  filterdat(t) {
    return moment(t).format('L');
  }

  // Get Manufacturer Of Vehicle
  getManufacturer() {
    this.service.getmanufacturerdata().subscribe((data: any) => {
      console.log('GET MANUFACTURER DATA: ', data)
      if (data) {
        this.manufacturerdata = data;
      } else {
        console.log("No Records Found Of Manufacturer Data");
      }
    }, (error: HttpErrorResponse) => {
      console.log("Something went wrong");
    })
  }

  // Get Modal Of Vehicle
  getModal() {
    this.service.getmodaldata().subscribe((data: any) => {
      console.log('GET Modat DATA: ', data)
      if (data) {
        this.modaldata = data;
      } else {
        console.log("No Records Found Of Modal Data");
      }
    }, (error: HttpErrorResponse) => {
      console.log("Something went wrong");
    })
  }

  // GET DRIVER TRIP DATA
  getBataData() {
    this.service.GetAllBataData().subscribe((data: any) => {
      console.log('GET All Bata DATA: ', data)
      if (data) {
        this.drivertripData = data;       
        this.dataSource = new MatTableDataSource(this.drivertripData);
        this.setPaginationAndSort()
      } else {
        // this.toastr.info("No Records Found");
        console.log("No Records Found Of trips Data");
      }
    }, (error: HttpErrorResponse) => {
      console.log("Something went wrong");
    })
  }

  setPaginationAndSort() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //FILTER API FUNCTION
  submitAdvanceData() {
    this.service.Createshortingvalue(this.batashortdata.value).subscribe((data: any) => {
      console.log(data)
      if (data) {
        this.bataallowance = data;
      } else {
        console.log('Data Not Found')
      }
    }, (error: HttpErrorResponse) => {
      console.log("Something went wrong");
    })
  }
  ViewRuleSet() {
    this.dialog.open(BataRuleViewComponent, {
      width: '50%',
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
      }
    })
  }

}
