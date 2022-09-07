import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  VehicleType: string;
  DriverName: string;
  Status: string;
  Category:string;
  startDTonword: string;
  endDTonword: string;  
  startDTactual: string;
  endDTactual: string;  
  perfomance: string;
  id: string;
}
@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {
  private _liveAnnouncer: any;
  spinner: any;
  service: any;
  
  private paginator: MatPaginator;
  private sort: MatSort;

  dataSource: any = new MatTableDataSource([]); 
  displayedColumns: string[] = ['tripId','startDTonword'
  ,'endDTonword', 'startDTactual', 'endDTactual','perfomance'];

  tripsData: any;
  
  tabledata: any;
  todaytripdata: any; 
  constructor() { }
  @ViewChild(MatPaginator, {static: false}) set matPaginator(
    mp: MatPaginator ) {
    this.paginator = mp;
    this.setPaginationAndSort();
  }

  @ViewChild(MatSort, { static: false}) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setPaginationAndSort();
  }
  applyFilter(event: Event) {
    console.log('Apply Filter ',this.dataSource)
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
  ngOnInit(): void {
  }
  getallTrips(){
    
    this.spinner.show()
     
    this.service.getallTripsData().subscribe((data: any) => {
      console.log('GET tripsData DATA: ', data)
      if(data.success == true){
        //
        this.tabledata = data.list;
        this.dataSource = new MatTableDataSource(this.tabledata);
        this.setPaginationAndSort()
        console.log('GET tripsData DATA: ', this.tabledata)
      }else {
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
}
