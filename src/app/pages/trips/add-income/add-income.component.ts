import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ServiceService } from 'src/app/service/service.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


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
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddIncomeComponent implements OnInit {

  url = environment.config.API_URL;
  value: string;
  imageSrc: string;
  incomeForm: FormGroup;
  allIncometype: any;
  picker1: any;
  fileurl: any;
  fileName: string;
  filedata: any;
  showhideTripDropdown: boolean = false;
  showhideDriverDropdown: boolean = false;
  showhideVehicleDropdown: boolean = false;
  selectedIncomedata: any;
  data: any;
  editData = false;
  incomeId: number;
  allCurrency: any;
  tripsId: any;
  driversId: any;
  vehiclesId: any;
  incometypeselectId: any;
  incometypeselectName: any;
  currencyselectId: any;
  currencyselectName: any;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  currencyName: any;
  currencySymbol: any;
  tripIdclick: any;
  VehicleIdclick: any;
  DriverIdclick: any;
  currencyID: any;
  CurrencySymbolofid: any;
  constructor(
    private activateRoute: ActivatedRoute,
    public fb: FormBuilder,
    public service: ServiceService,
    private spinnerService: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.activateRoute.queryParams.subscribe(parsam => {
      this.selectedIncomedata = JSON.parse(atob(parsam.data));
      if (this.selectedIncomedata) {
        this.data = this.selectedIncomedata;
        this.incomeId = this.selectedIncomedata.incomeId;
        // this.currencyID = this.selectedIncomedata.currencyId
        console.log("Edit Income Data: ",this.data)
        this.getCurrencyById(this.selectedIncomedata.currencyId)
        this.editData = true;
      } else {
        this.editData = false;
      }
    });
    if (this.editData) {
      this.getCurrency();
      this.gettypeIncome();
    }
  }
  ngOnInit() {
    
    if (this.editData == false) {
      this.getCurrency();
      this.gettypeIncome();
    }
    //Validattion Income Form
    this.incomeForm = this.fb.group({
      imageUrl1: [null],
      incomeDate: ['', Validators.required],
      incomeTypeName: ['', Validators.required],
      incometitle: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      currencyName: ['', Validators.required],
      descrption: ['',],
      amount: ['', [Validators.required,Validators.pattern(/^(1|[1-9]\d{0,5})$/)]],
      reference: ['',],
      linktype: ['', Validators.required],
      tripId: [null],
      deviceId: [null],
      vehicleId: [null],
    })
    if (this.editData) {
     this.setIncomeData();
   }
    this.gettypeIncome();
    this.getCurrency();
    this.getallDriversId();
    this.getallTrips();
    this.getallVehicleId();
  }
  get f() {
    return this.incomeForm.controls;
  }
  openDropdown(event) {
    if (event == 'Trip') {
      this.showhideTripDropdown = true;
      this.showhideDriverDropdown = false;
      this.showhideVehicleDropdown = false;
    } else if (event == 'Driver') {
      this.showhideTripDropdown = false;
      this.showhideDriverDropdown = true;
      this.showhideVehicleDropdown = false;
    } else if (event == 'Vehicle') {
      this.showhideTripDropdown = false;
      this.showhideVehicleDropdown = true;
      this.showhideDriverDropdown = false;
    } else if (event == 'Other') {
      this.showhideTripDropdown = false;
      this.showhideVehicleDropdown = false;
      this.showhideDriverDropdown = false;
    }

  }
  async getIncomeType(value) {
    value = await this.allIncometype.filter(x => x.typeId == value);
    let value2 = value[0]
    console.log(value, 'value', value2, 'value2');
    this.incometypeselectId = value2.typeId;
    this.incometypeselectName = value2.typeName;

  }
  async getCurrency1(value) {
    value = await this.allCurrency.filter(x => x.id == value);
    let value1 = value[0]
    console.log(value, 'value', value1, 'value1');
    this.currencyselectId = value1.id;
    this.currencyselectName = value1.name;
    this.currencyName = value1.name;
    this.currencySymbol = value1.currencySymbol;
  }
  setIncomeData() {
    debugger
    if (this.selectedIncomedata.tripId != null) {
        this.selectedIncomedata.linktype = "Trip"; 
    } else if(this.selectedIncomedata.deviceId != null) {
      this.selectedIncomedata.linktype = "Driver";
    } else if (this.selectedIncomedata.vehicleId != null){
      this.selectedIncomedata.linktype = "Vehicle";
    } else {
      this.selectedIncomedata.linktype = "Other";
    }
    this.incomeForm.patchValue({
      imageUrl1: this.selectedIncomedata.imageUrl1,
      incomeDate: this.selectedIncomedata.incomeDate,
      incomeTypeName: this.selectedIncomedata.incomeTypeId,
      incometitle: this.selectedIncomedata.incomeTypeName,
      currencyName: this.selectedIncomedata.currencyId,
      amount: this.selectedIncomedata.amount,
      descrption: this.selectedIncomedata.description,
      reference: this.selectedIncomedata.reference,
      linktype: this.selectedIncomedata.linktype,
      tripId: this.selectedIncomedata.tripId,
      deviceId: this.selectedIncomedata.deviceId,
      vehicleId: this.selectedIncomedata.vehicleId,
    })
    this.fileName = this.selectedIncomedata.imageUrl1;
    this.currencyselectId = this.selectedIncomedata.currencyId;
    this.currencyselectName = this.selectedIncomedata.currencyName;
    this.incometypeselectId = this.selectedIncomedata.incomeTypeId;
    this.incometypeselectName = this.selectedIncomedata.incomeTypeName;
    this.currencySymbol = this.CurrencySymbolofid;
  }

  resetimg() {
    this.fileName = undefined;
  }

//SaveAndNew -----------------------------------------> 
  SaveAndNew() {
    debugger
    if (!this.incomeForm.valid) {
      this.toastr.warning("You have entered invalid data");
      return;
    }
    if (!this.data) {
      this.addIncome();

    } else {
      this.updateIncome();
    }
    setTimeout(() => this.formGroupDirective.resetForm(), 0)
    this.resetimg()
  }

//SaveAndClose -------------------------------------------> 
  SaveAndClose() {
    debugger
    if (!this.incomeForm.valid) {
      this.toastr.warning("You have entered invalid data");
      return;
    } else {
      
      if (!this.data) {
        this.addIncome();

      } else {
        this.updateIncome();
      }
      this.back();
    }
  }

  openDropdownTrip(event) {
    console.log(event)
    this.tripIdclick = event
  }

  openDropdownVehicle(event) {
    console.log(event)
    this.VehicleIdclick = event
  }
  openDropdownDriver(event) {
    console.log(event)
    this.DriverIdclick = event
  }

  back() {
    this.router.navigate(['/pages/Income'])
  }
  
//gettypeIncome -------------------------------------------> 
  gettypeIncome() {
    this.service.getallincometype().subscribe((data: any) => {
      this.spinnerService.show();
      console.log("Income Data Type : ", data)
      if (data.status == true) {
        this.spinnerService.hide();
        this.allIncometype = data.data.jsonData
      }
      else {
        console.log("No Records Found");
      }
    }, (error: HttpErrorResponse) => {
      this.spinnerService.hide();
      console.log("Something went wrong");
    })
  }

//getCurrency -------------------------------------------> 
  getCurrency() {
    this.service.GetCurrency().subscribe((data: any) => {
      this.spinnerService.show();
      console.log("GetCurrency Data : ", data)
      if (data.status == true) {
        this.spinnerService.hide();
        this.allCurrency = data.data.jsonData
        if (this.editData) {
          this.setIncomeData();
        }
      }
      else {
        console.log("No Records Found");
      }
    }, (error: HttpErrorResponse) => {
      this.spinnerService.hide();
      console.log("Something went wrong");
    })
  }

  //getCurrency by CurrencyId -------------------------------------------> 
  getCurrencyById(id) {
    this.spinnerService.show();
    this.service.GetCurrencybyid(id).subscribe((data: any) => {
      console.log("GetCurrencybyid Data : ", data)
      if (data.status == true) {
        this.CurrencySymbolofid = data.data.jsonData.currencySymbol;        
      }
      else {
        console.log("No Records Found");
      }
    }, (error: HttpErrorResponse) => {
      console.log("Something went wrong");
      this.spinnerService.hide();
    })
  }

  // GET ALL DRIVER ID --------------------------------------->
  getallDriversId() {
    this.spinnerService.show()
    this.service.getallDriversData().subscribe((data: any) => {
      console.log('GET Driver DATA: ', data)
      if (data.success == true) {
        this.driversId = data.list;
        this.spinnerService.hide()
        console.log('GET Deriver DATA: ', this.driversId)
      } else {
        // this.toastr.info("No Records Found");
        console.log("No Records Found Of trips Data");

      }
    }, (error: HttpErrorResponse) => {
      this.spinnerService.hide();
      console.log("Something went wrong");
    })
  }

  // GET ALL VEHICLE ID  ------------------------------------------>
  getallVehicleId() {
    this.spinnerService.show()
    this.service.getallvehicleData().subscribe((data: any) => {
      console.log('GET vehicle DATA: ', data)
      if (data) {
        this.spinnerService.hide()
        this.vehiclesId = data;
        console.log('GET vehicle DATA: ', this.vehiclesId)
      } else {
        // this.toastr.info("No Records Found");
        console.log("No Records Found Of trips Data");
      }
    }, (error: HttpErrorResponse) => {
      this.spinnerService.hide();
      console.log("Something went wrong");
    })
  }

  // GET ALL TRIPS ID ------------------------------------------>
  getallTrips() {
    this.spinnerService.show()
    this.service.getallTripsData().subscribe((data: any) => {
      console.log('GET tripsData DATA: ', data)
      if (data.success == true) {
        this.spinnerService.hide()
        this.tripsId = data.list;
        console.log('GET tripsData DATA: ', this.tripsId)
      } else {
        // this.toastr.info("No Records Found");
        console.log("No Records Found Of trips Data");

      }
    }, (error: HttpErrorResponse) => {
      console.log("Something went wrong");
      this.spinnerService.hide();
    })
  }

  handleFileInput2(event) {
    console.log(event.target.files[0])
    this.filedata = event.target.files[0];
    if (this.filedata.size > 500000) {
      alert("Image Size should not be greater than 500kb");
      return;
    }
    this.onUpload(this.filedata);
  }

  onUpload(filedata) {
    this.spinnerService.show();
    var file = new FormData();
    file.append("file", filedata);
    this.service.uploaddocs(file).subscribe(res => {
      console.log('upload docs response:', res)
      if (res['data'].jsonData) {
        this.fileName = this.url + '/' + res['data'].jsonData;
        console.log('File data :-', this.fileName)
      }
      this.spinnerService.hide();
    });
  }

  // UPDATE Income API  -------------------------------------------->
  updateIncome() {
    debugger
    if (this.tripIdclick) {
      this.incomeForm.value.tripId = this.tripIdclick;
      this.selectedIncomedata.deviceId = null;
      this.selectedIncomedata.vehicleId = null;
      this.incomeForm.value.vehicleId = null;
      this.incomeForm.value.deviceId = null;
    }
    else if (this.VehicleIdclick) {
      this.incomeForm.value.vehicleId = this.VehicleIdclick;
      this.selectedIncomedata.deviceId = null;
      this.selectedIncomedata.tripId = null;
      this.incomeForm.value.tripId = null;
      this.incomeForm.value.deviceId = null;
    }
    else if (this.DriverIdclick) {
      this.incomeForm.value.deviceId = this.DriverIdclick;
      this.selectedIncomedata.vehicleId = null;
      this.selectedIncomedata.tripId = null;
      this.incomeForm.value.vehicleId = null;
      this.incomeForm.value.tripId = null;
    }
    this.incomeForm.value.incomeId = this.incomeId;
    this.spinnerService.show();
    this.incomeForm.value.incomeDate = this.incomeForm.value.incomeDate;
    this.incomeForm.value.currencyName = this.currencyselectName;
    this.incomeForm.value.currencyId = this.currencyselectId;
    this.incomeForm.value.currencySymbol = this.currencySymbol;
    this.incomeForm.value.imageUrl1 = this.fileName;
    let post = {
      "incomeId": this.incomeId,
      // "incomeDate": "2022-08-23 11:45:05",
      "incomeDate": this.incomeForm.value.incomeDate,
      "incomeTypeId": this.incometypeselectId,
      "amount": this.incomeForm.value.amount,
      "incomeTypeName": this.incometypeselectName,
      "reference": this.incomeForm.value.reference,
      "description": this.incomeForm.value.descrption,
      "tripId": this.incomeForm.value.tripId,
      "vehicleId": this.incomeForm.value.vehicleId,
      "deviceId": this.incomeForm.value.deviceId,
      "currencyId": this.currencyselectId,
      "currencyName": this.currencyselectName,
      "currencysymbol":this.incomeForm.value.currencySymbol,
      "imageUrl1": this.incomeForm.value.imageUrl1,
      "imageUrl2": null,
      "orgId": 1,
      "orgName": "My Organization",
    }
    console.log("Data On Edit", post);
    this.service.editIncomeData(post).subscribe((data: any) => {
      if(data.status){
        this.spinnerService.hide()
        this.toastr.success(data.message)
      } else {
        this.toastr.info(data.message)
      }
    }, (error: HttpErrorResponse) => {
      this.spinnerService.hide();
      // this.toastr.error("Something went wrong");
    })
    this.back();
  }

  //ADD INCOME ------------------------------------->
  addIncome(): any {
    this.spinnerService.show()
    this.incomeForm.value.imageUrl1 = this.fileName;
    this.incomeForm.value.currencySymbol = this.currencySymbol;
    const post = {
      "incomeDate": this.incomeForm.value.incomeDate,
      "incomeTypeId": this.incometypeselectId,
      "amount": this.incomeForm.value.amount,
      "incomeTypeName": this.incometypeselectName,
      "reference": this.incomeForm.value.reference,
      "description": this.incomeForm.value.descrption,
      "tripId": this.incomeForm.value.tripId,
      "vehicleId": this.incomeForm.value.vehicleId,
      "deviceId": this.incomeForm.value.deviceId,
      "currencyId": this.currencyselectId,
      "currencyName": this.currencyselectName,
      "currencysymbol":this.incomeForm.value.currencySymbol,
      "imageUrl1": this.incomeForm.value.imageUrl1,
      "imageUrl2": null,
      "orgId": 1,
      "orgName": "My Organization",
    }
    console.log("add income data:-", post)
    this.service.addIncome(post).subscribe((data: any) => {
      console.log('success', data)
      if(data.status){
        this.spinnerService.hide()
        this.toastr.success(data.message)
      } else {
        this.toastr.info(data.message)
      }
    }, (error: HttpErrorResponse) => {
      this.spinnerService.hide();
      console.log('Error Response', error)
    })
  }
}
