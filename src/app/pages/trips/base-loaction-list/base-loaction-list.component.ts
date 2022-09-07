import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/service/service.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { DIR_DOCUMENT } from '@angular/cdk/bidi';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
export interface PeriodicElement {
  VehicleType: string;
  DriverName: string;
  id: string;
}
@Component({
  selector: 'app-base-loaction-list',
  templateUrl: './base-loaction-list.component.html',
  styleUrls: ['./base-loaction-list.component.scss']
})
export class BaseLoactionListComponent implements OnInit {
  private paginator: MatPaginator;
  private sort: MatSort;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  
  addbaseLocationForm : FormGroup;
  baselocationdata: any;
  // setPaginationAndSort() {
  //   throw new Error('Method not implemented.');
  // }
 
  baselocationData: any = new MatTableDataSource([]); 
  displayedColumns: string[] = ['Id','BaseLocationName'
  ,'Address','Action'];
  tripsData: any;
  
  tabledata: any;
  todaytripdata: any; 
  editdata: any;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private fb : FormBuilder,
    private service: ServiceService,
    private toastr: ToastrService,
    private spinner : NgxSpinnerService
  ) { }

  @ViewChild(MatPaginator, {static: false}) set matPaginator(
    mp: MatPaginator ) {
    this.paginator = mp;
    this.setPaginationAndSort();
  }

  ngOnInit(): void {
    this.addbaseLocationForm = this.fb.group({
      baseLocation : ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      // address : ['', [Validators.required,Validators.minLength(5), Validators.maxLength(50)]]
      address : ['']

    })

    this.getBaselocationData();


    // Map code //
    //#region 

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
  //#endregion

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  


  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getEnterAddress(event){
    console.log(event.target.value);
    this.address = event.target.value
  }



  getAddress(latitude, longitude) {
    this.spinner.show();
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
      this.spinner.hide();

    });
  }

  getBaselocationData(){
    this.spinner.show();
    this.service.getbaselocationdata().subscribe((data: any) => {
      if (data) {
        this.spinner.hide();
        this.baselocationdata = data;
        console.log("baselocationdata Data Type : ", this.baselocationdata)
        this.baselocationData = new MatTableDataSource(this.baselocationdata);
        this.setPaginationAndSort()
      }
      else {
        console.log("No Records Found");
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log("Something went wrong on base");
    })
  }

  setPaginationAndSort() {
    this.baselocationData.paginator = this.paginator;
    this.baselocationData.sort = this.sort;
  }

  setBaselocationData(){
    this.addbaseLocationForm.patchValue({
      baseLocation : this.editdata.baseLocation,
      address : this.editdata.address
    })
  }

  submit(){
     if(!this.editdata){
      this.addBaseLocation();
     } else {
       this.updateBaseLocation();
     }
    
  }

  addBaseLocation(){   
    this.spinner.show();
  this.addbaseLocationForm.value.latitude = this.latitude,
  this.addbaseLocationForm.value.longitude = this.longitude,
  this.addbaseLocationForm.value.geofenceId = 0,
  this.addbaseLocationForm.value.geofenceName = "Geo",
  this.addbaseLocationForm.value.orgId = 0,
  this.addbaseLocationForm.value.orgName = "MY ORGNATION",
  this.addbaseLocationForm.value.isDefault= true,
  this.addbaseLocationForm.value.isEnabled= true,
  this.addbaseLocationForm.value.isDeleted= false,
  this.addbaseLocationForm.value.insertedBy= 0,
  // this.addbaseLocationForm.value.insertedOn= "2022-08-30T11:16:04.124Z",
    console.log("add base loaction data : ", this.addbaseLocationForm.value)       
    
    this.service.addBaselocationData(this.addbaseLocationForm.value).subscribe((data: any) => {
      
      console.log('addBaselocationData success', data)
      if (data.staus) {
        this.spinner.hide();
        this.toastr.success(data.message)
      } else (
        this.toastr.info(data.message)
      )
      this.getBaselocationData();
    }, (error: HttpErrorResponse) => {
      this.toastr.error
      this.spinner.hide();
      console.log('Error Response', error)
    })
    setTimeout(() => this.formGroupDirective.resetForm(), 0)
    // window.location.reload();
  }

  deleteBaseLoction(data) { 
    this.spinner.show();  
    // this.spinnerService.show();
    this.service.deleteBaselocation(data).subscribe((data: any) => {
      if (data) {
        this.spinner.hide();
        this.getBaselocationData();
        console.log('Data Deleted:-', data)
      }
      else {
        // this.toastr.info(data.message);
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log("Something went wrong", error);
    })  
    this.getBaselocationData();
    // this.spinnerService.hide();
  }

  editbaseLocation(data){
  this.editdata = data;
  this.setBaselocationData();
  }

  updateBaseLocation(){ 
    this.spinner.show();
    const postbaslocationData = {
      "id": this.editdata.id,
      "baseLocation": this.addbaseLocationForm.value.baseLocation,
      "address": this.addbaseLocationForm.value.address,
      "isDefault": true,
      "latitude": this.editdata.latitude,
      "longitude": this.editdata.latitude,
      "geofenceId": this.editdata.geofenceId,
      "geofenceName": this.editdata.geofenceName,
      "orgId": this.editdata.orgId,
      "orgName": this.editdata.orgName,
      "isEnabled": true,
      "isDeleted": true,
      "insertedBy": 0,
    }
    console.log("add base loaction dat : ", postbaslocationData)       
    this.service.editBaselocationData(postbaslocationData).subscribe((data: any) => {
      console.log('addBaselocationData success', data)
      if (data) {
        this.spinner.hide();
        this.toastr.success("data.message")
      } else (
        this.toastr.info(data.message)
      )
      this.getBaselocationData();
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log('Error Response', error)
    })
    setTimeout(() => this.formGroupDirective.resetForm(), 0)
  }

}
