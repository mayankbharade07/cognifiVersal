import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Vehicle } from '../../../shared/models/vehicle.model';
import { VehicleService } from '../../../shared/services/vehicle.service';
import { HttpResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';
@Component({
  selector: 'app-vehicle-home-page',
  templateUrl: './vehicle-home-page.component.html',
  styleUrls: ['./vehicle-home-page.component.scss']
})
export class VehicleHomePageComponent implements OnInit {

  constructor(private vehicleService: VehicleService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getVehicle();

  }
  public dataSource = new MatTableDataSource<Vehicle>();
  public displayedColumns = ['vehicleName', 'licensePlate', 'vehicleTypeName', 'depotName', 'vehicleSubtypeName', 'model', 'device'];
  @ViewChild(MatSort, { static: false }) set sort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  getVehicle() {
    this.vehicleService.getVehicles().subscribe(
      (res: HttpResponse<Vehicle[]>) => {
        (this.dataSource.data = res.body || [])
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getVehicleByRow(vehicle: Vehicle) {
    let dialogRef = this.dialog.open(VehicleDialogComponent, {
      data: { vehicle }, width: '1600px',
      height: '700px'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
