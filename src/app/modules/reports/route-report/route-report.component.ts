import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-route-report',
  templateUrl: './route-report.component.html',
  styleUrls: ['./route-report.component.scss']
})
export class RouteReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getReports();
  }

  reports: any[] = [];
  public displayedColumns = ['SlNo', 'VehicleName', 'From', 'To'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: false }) set sort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  getReports() {
    this.reports = [{
      SlNo: 1,
      VehicleName: "Test1",
      From: "Trivandrum",
      To: "Alappuzha"
    },
    {
      SlNo: 2,
      VehicleName: "Test2",
      From: "Trivandrum",
      To: "Alappuzha"
    },
    {
      SlNo: 3,
      VehicleName: "Test3",
      From: "Kottayam",
      To: "Palakkad"
    },
    {
      SlNo: 4,
      VehicleName: "Test4",
      From: "Ernakulam",
      To: "Kozhikode"
    },
    {
      SlNo: 5,
      VehicleName: "Test5",
      From: "Kollam",
      To: "Alappuzha"
    },
    {
      SlNo: 6,
      VehicleName: "Test6",
      From: "Thrissur",
      To: "Ernakulam"
    },
    {
      SlNo: 7,
      VehicleName: "Test7",
      From: "Alappuzha",
      To: "Malappuram"
    },
    {
      SlNo: 8,
      VehicleName: "Test8",
      From: "Idukki",
      To: "Malappuram"
    },
    {
      SlNo: 9,
      VehicleName: "Test9",
      From: "Kollam",
      To: "Alappuzha"
    },
    {
      SlNo: 10,
      VehicleName: "Test10",
      From: "Kochi",
      To: "Alappuzha"
    },
    {
      SlNo: 11,
      VehicleName: "Test11",
      From: "Trivandrum",
      To: "Alappuzha"
    },
    ];
    this.dataSource.data = this.reports;
  }

}
