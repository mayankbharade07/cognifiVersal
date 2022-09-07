import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Inject, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-add-base-location',
  templateUrl: './add-base-location.component.html',
  styleUrls: ['./add-base-location.component.scss']
})
export class AddBaseLocationComponent implements OnInit {
  title = 'Developer';
  baselocationdata: any;
  AddBaseLocationForm: FormGroup;
  lat: any;
  lng: any;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

  // @ViewChild('search', { static: false }) search;
  @ViewChild('search', { static: true }) element: ElementRef;

  public searchElementRef: ElementRef;
  Formatted_Address: string;
  @Output() countChanged: EventEmitter<number> = new EventEmitter();

  TripdetailsDatabyId: any;
  startlatitude: any;
  startlongitude: any;
  endlatitude: any;
  endlongitude: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: ServiceService,
    public fb: FormBuilder,
    private dialogRef: MatDialogRef<AddBaseLocationComponent>,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private spinner : NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.AddBaseLocationForm = this.fb.group({
      startpoint: [''],
      endpoint: [''],
      basestartpoint: ['', [Validators.required]],
      baseendpoint: ['', [Validators.required]],
      distance1: ['',],
      distance2: ['',],
    })
    this.getbaselocationdata();
    this.TripdetailsDatabyId = this.data;
    console.log("TRIP DETATILS > ADD BASELOCATION: ", this.TripdetailsDatabyId)
    // CONVERT LAT-LANG TO ADDRESS STRAT
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
  }

  setCurrentLocation() {

    if ('geolocation' in navigator) {

      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = 23.28127;
        this.longitude = 72.44125;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getAddress(latitude, longitude) {
    this.spinner.show();
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        this.spinner.hide();
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          console.log("GEt address from lat-lng: ", this.address)
          this.AddBaseLocationForm.patchValue({
            startpoint: this.address,
            endpoint: this.address
          })
          this.getGeoLocation(this.address)
        } else {
          this.spinner.hide();
          alert('No results found');
        }
      } else {
        this.spinner.hide();
        alert('Geocoder failed due to: ' + status);
      }
    });
  }

  getGeoLocation(address: string): Observable<any> {
    console.log('Getting address: ', address);
    let geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
      geocoder.geocode({
        'address': address
      }, (results, status) => {

        if (status == google.maps.GeocoderStatus.OK) {
          observer.next(results[0].geometry.location);
          observer.complete();
          console.log("convert address to latlng: ", results)
        } else {
          console.log('Error: ', results, ' & Status: ', status);
          observer.error();
        }
      });      
    });
    
  }
  //  CONVERT LAT-LANG TO ADDRESS END

  onNoClick(): void {
    this.dialogRef.close();
  }



  submit() {

    this.updateTrip();
  }

  getbaselocationdata() {
    this.spinner.show();
    this.service.getbaselocationdata().subscribe((data: any) => {

      if (data) {
        this.spinner.hide();
        this.baselocationdata = data;
        console.log("baselocationdata Data Type : ", this.baselocationdata)
      }
      else {
        console.log("No Records Found");
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log("Something went wrong on base");
    })
  }

  getstartBaseLocation(event) {
    console.log("SELECTED START BASE LOCATION ", event)
    this.startlatitude = event.latitude;
    this.startlongitude = event.longitude;
  }

  getendBaseLocation(event) {
    console.log("SELECTED START BASE LOCATION ", event)
    this.endlatitude = event.latitude;
    this.endlongitude = event.longitude;
  }

  updateTrip() {
    this.spinner.show();
    console.log('updateTrip success', this.AddBaseLocationForm.value)
    const postTripData = {
      "applyForRecurring": true,
      "baseEndLat": this.startlatitude,
      "baseEndLong": this.startlongitude,
      "baseStartLat": this.endlatitude,
      "baseStartLong": this.endlongitude,
      "category": this.TripdetailsDatabyId.category,
      "driverId": this.TripdetailsDatabyId.driverId,
      "endDate": this.TripdetailsDatabyId.endDate,
      "isEnabled": true,
      "isRecurring": this.TripdetailsDatabyId.isRecurring,
      "onwardEndDate": this.TripdetailsDatabyId.onwardActualEndTime,
      "onwardStartDate": this.TripdetailsDatabyId.onwardActualStartTime,
      "onwardEndTime": this.TripdetailsDatabyId.onwardEndTime,
      "onwardStartTime": this.TripdetailsDatabyId.onwardStartTime,
      "orgId": 0,
      "returnEndTime": this.TripdetailsDatabyId.returnActualEndTime,
      "returnStartDate": this.TripdetailsDatabyId.returnActualStartTime,
      "returnEndDate": this.TripdetailsDatabyId.returnEndTime,
      "returnStartTime": this.TripdetailsDatabyId.returnStartTime,
      "status": this.TripdetailsDatabyId.status,
      "tripId": this.TripdetailsDatabyId.tripId,
      "tripName": this.TripdetailsDatabyId.tripName,
      "uuid": this.TripdetailsDatabyId.uuid,
      "vehicleId": this.TripdetailsDatabyId.vehicleId
    }

    this.service.updateTrip(postTripData).subscribe((data: any) => {
      this.spinner.hide();
      console.log('updateTrip success', data)
    }, (error: HttpErrorResponse) => {
      console.log('Error Response', error)
    })
    this.onNoClick()
  }

}
