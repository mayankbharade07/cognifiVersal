import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from 'src/app/service/service.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent implements OnInit {
  public tableData = [];
  public tableTitle: any;
  public tableRecords = [];
  public pageStartCount = 0;
  public pageEndCount = 10;
  public totalPageCount = 0;
  public recordsPerPage = 10;
  arr: any;
  constructor(
    private spinner: NgxSpinnerService,
    private service: ServiceService,
    private dialogRef: MatDialogRef<BulkUploadComponent>
  ) { }

  ngOnInit(): void {
  }
  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }

  public uploadData(e) {
    this.spinner.show();
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(<unknown>event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      console.log(data); // Data will be logged in array format containing objects
      this.tableData = data;
      console.log("Excel data: ", this.arr)

      this.tableTitle = Object.keys(data[0]);
      this.spinner.hide();
      this.tableRecords = data.slice(
        this.pageStartCount,
        this.pageEndCount
      );
      this.totalPageCount = data.length / this.recordsPerPage;
    };
  }

  uploadimportData() {
    this.spinner.show();
    for (var i = 0; i < this.tableData.length; i++) {
      // this.tableData[i]['address']= this.tableData[i]['address']
      // this.tableData[i]['city']=this.tableData[i]['city']
      // this.tableData[i]['email']=this.tableData[i]['email']
      // this.tableData[i]['landmark']=this.tableData[i]['landmark']
      // this.tableData[i]['name']=this.tableData[i]['name']
      // this.tableData[i]['notes']=this.tableData[i]['notes']
      // this.tableData[i]['orgId']=this.tableData[i]['orgId']
      // this.tableData[i]['orgName']=this.tableData[i]['orgName']
      // this.tableData[i]['state']=this.tableData[i]['state']
      // this.tableData[i]['phone'] = String(this.tableData[i]['phone']);      
      this.tableData[i].phone = String(this.tableData[i].phone);
      // this.tableData.push(this.tableData[i])
    }
    this.arr = this.tableData
    console.log("Excel data: ", this.arr)
    this.service.importcustomerdata(this.arr).subscribe((data: any) => {
      console.log("Import excel of customer bulk data ", data);
      if (data.ok) {
        this.spinner.hide();
        this.dialogRef.close();
      } else {
        this.spinner.hide();
        console.log("error", data.statusText)
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log("Something went wrong");
    })
    this.dialogRef.close();
  }
}
