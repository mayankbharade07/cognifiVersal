import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource}  from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator} from '@angular/material/paginator';
import { DialogComponent } from '../../bata/dialog/dialog.component';
import { MatDialog,  } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service/service.service';
import { AddBaseLocationComponent } from '../add-base-location/add-base-location.component';
import { AddCustomersComponent } from '../add-customers/add-customers.component';
import { NgxSpinnerService } from 'ngx-spinner';


export interface PeriodicElement {
  VehicleType: string;
  DriverName: string;
  VehicleNumber: string;
  startDTponword: string;
  endDTponword: string;  
  startDTactual: string;
  endDTactual: string;  
  perfomance: string;
  id: string;
}

@Component({
  selector: 'app-trips-details',
  templateUrl: './trips-details.component.html',
  styleUrls: ['./trips-details.component.scss']
})
export class TripsDetailsComponent implements OnInit {
  private paginator: MatPaginator;
  private sort: MatSort;

  dataSource: any = new MatTableDataSource([]); 
  displayedColumns: string[] = ['tripId', 'VehicleType','VehicleNumber', 'DriverName', 'startDTponword'
  ,'endDTponword','startDTpreturn','endDTpreturn', 'startDTactual', 'endDTactual','startDTactualreturn', 'endDTactualreturn' ,'perfomance'];
  allcustomerdata: any;
  tripdatabyid: any;
  tabledata: any;
  tripdetailsdata: any;
  trip_data: any;
  customerdata: any;
  trip_Id: any;
  drivertripdata: any;

  constructor(    
    public translate: TranslateService,
    public overlayContainer: OverlayContainer,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    public service: ServiceService,
    private activateRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { this.activateRoute.queryParams.subscribe(parsam => {
    this.tripdetailsdata = JSON.parse(atob(parsam.data));
    if (this.tripdetailsdata) {
      this.trip_data = this.tripdetailsdata;
      this.trip_Id = this.tripdetailsdata.tripId;
      this.dataSource = new MatTableDataSource(this.trip_data);
      // this.customerId = this.tripdetailsdata.id;      
    } 
    
  });
  console.log("<________> trip Details data :- ",this.trip_data)
    translate.addLangs(['en', 'hi', 'fr']);
    translate.setDefaultLang('en');
  }
  @ViewChild(MatPaginator, {static: false}) set matPaginator(
    mp: MatPaginator ) {
    this.paginator = mp;
    // this.setPaginationAndSort();
  }

  @ViewChild(MatSort, { static: false}) set matSort(ms: MatSort) {
    this.sort = ms;
    // this.setPaginationAndSort();
  }
  ngOnInit(): void {
      this.getcustomerdata();
       this.getTripDatabyId(this.trip_Id);
      this.getcustomerdatabyId();
      this.getDriverTripbyId(this.trip_Id)
  }

  announceSortChange(sortState: Sort) {   
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialog(data) {
    var editobject = {
      action: 'edit',
      data: data,
    }
    this.dialog.open(AddCustomersComponent, {
      width: '50%',
      data: editobject,
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
      }
    })
  }

  AddBaseDialog() {
    this.dialog.open(AddBaseLocationComponent, {
      width: '70%',
      data: this.trip_data,
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
      }
    })
  }

  getcustomerdata() {
    this.spinner.show();
    this.service.getallincometype().subscribe((data: any) => {
      console.log("Income Data Type : ", data)
      if (data) {
        this.spinner.hide();
        this.allcustomerdata = data
      }
      else {
        console.log("No Records Found");
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log("Something went wrong");
    })
  }

  getcustomerdatabyId() {
    this.spinner.show();
    this.service.getCustomerDatabyId().subscribe((res: any) => {
      console.log("--Customer Data By ID : ", res)
      if (res.status) {
        this.spinner.hide();
        this.customerdata = res.data.jsonData;
        console.log("--customerdata : ", this.customerdata)
      } else {
        console.log("No Records Found");
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log("Something went wrong");
    })
  }

  getDriverTripbyId(trip_Id) {
    this.spinner.show();
    console.log("Trip ID___ ",trip_Id)
    this.service.getdriverTripById(trip_Id).subscribe((res: any) => {
      console.log("--Driver Trip Data By ID : ", res)
      if (res.status) {
        this.spinner.hide();
        this.drivertripdata = res.data.jsonData;
        debugger
        console.log("--drivertripdata : ", this.drivertripdata)
        this.dataSource = new MatTableDataSource(this.drivertripdata);
      } else {
        console.log("No Records Found");
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log("Something went wrong");
    })
  }

  getTripDatabyId(trip_Id){
    this.spinner.show();
    this.service.gettripDatabyId(trip_Id).subscribe((data: any) => {
      console.log('GET Trip DATA by Trip Id : ', data)
      if(data){
        this.tripdatabyid = data;
        const tripobject = [{
          actualEndTime: data.actualEndTime,
          actualStartTime: data.actualStartTime,
          bataType: data.bataType,
          category: data.category,
          currencyId: data.currencyId,
          customerId: data.customerId,
          endLat: data.endLat,
          endLocation: data.endLocation,
          endLong: data.endLong,
          expectedEndTime: data.expectedEndTime,
          expectedStartTime: data.expectedStartTime,
          inStationOutStation: data.inStationOutStation,
          insurances: data.insurances,
          licensePlate: data.licensePlate,
          startLat: data.startLat,
          startLocation: data.startLocation,
          startLong: data.startLong,
          status: data.status,
          tripId: data.tripId,
          tripName: data.tripName,
          uuid: data.uuid,
          vehicleModel: data.vehicleModel,
          vehicleType: data.vehicleModel
        }]
        // this.dataSource = new MatTableDataSource(tripobject);
        this.spinner.hide();
        console.log('GET Trip DATA by Trip Id1 : ', tripobject)
      }else {
        console.log("No Records Found Of Trip Data");
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log("Something went wrong");
    })
  }
  
  // setPaginationAndSort() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

}
