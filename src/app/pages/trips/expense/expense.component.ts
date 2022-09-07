import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

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
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ExpenseComponent implements OnInit {
  _filterChange = new BehaviorSubject("");
  currencySymbol: any;
  tripIdclick: any;
  VehicleIdclick: any;
  DriverIdclick: any;
  CurrencySymbolofid: any;
  get filter(): string {
    return this._filterChange.value;
  }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }
  url = environment.config.API_URL;
  value: string;
  imageSrc: string;
  expenseForm: FormGroup;
  expensestype: any;
  fileurl: any;
  fileName: string;
  filedata: any;
  selectedExpensedata: any;
  data: any;
  expenseId: any;
  editData = false;
  allCurrency: any;
  tripsId: any;
  showhideTripDropdown: boolean = false;
  showhideDriverDropdown: boolean = false;
  driversId: any;
  showhideVehicleDropdown: boolean = false;
  vehiclesId: any;
  currencyselectName: any;
  currencyselectId: any;
  expensetypeId: any;
  expensetypeName: any;
  currencyName: any;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(
    public fb: FormBuilder, public service: ServiceService,
    private activateRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    debugger
    this.activateRoute.queryParams.subscribe(parsam => {
      this.selectedExpensedata = JSON.parse(atob(parsam.data));
      if (this.selectedExpensedata) {
        this.data = this.selectedExpensedata;
        this.expenseId = this.selectedExpensedata.expenseId;
        console.log("Edit Expense DAta: ", this.data)
        this.getCurrencyById(this.selectedExpensedata.currencyId)
        this.editData = true;
      } else {
        this.editData = false;
      }
    });
    if (this.editData) {
      this.getCurrency();
      this.gettypeExpenses();
    }


  }
  ngOnInit() {
    this.spinner.show()
    if (this.editData == false) {
      this.getCurrency();
      this.gettypeExpenses();
    }
    //Validattion Expense Form
    this.expenseForm = this.fb.group({
      imageUrl1: [null],
      expenseDate: ['', Validators.required],
      expenseTypeId: ['', Validators.required],
      expensetitle: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      currencyName: ['', Validators.required],
      description: [''],
      amount: ['', [Validators.required, Validators.pattern(/^(1|[1-9]\d{0,5})$/)]],
      reference: [''],
      linktype: ['', Validators.required],
      tripId: [null],
      deviceId: [null],
      vehicleId: [null],
    })
    if (this.editData) {
      this.setExpenseData();
    }
    this.spinner.hide();
    this.gettypeExpenses();
    this.getCurrency();
    this.getallDriversId();
    this.getallVehicleId();
    this.getallTrips();
  }
  get f() {
    return this.expenseForm.controls;
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


  async getexpensetype(value) {

    value = await this.expensestype.filter(x => x.typeId == value);
    let value2 = value[0]
    console.log(value, 'value', value2, 'value2');
    this.expensetypeId = value2.typeId;
    this.expensetypeName = value2.typeName;
  }

  async getCurrency1(value) {
    //currencyName = value1.name
    //this.allCurrency
    value = await this.allCurrency.filter(x => x.id == value);
    let value1 = value[0]
    console.log(value, 'value', value1, 'value1');
    this.currencyselectId = value1.id;
    this.currencyselectName = value1.name;
    this.currencyName = value1.name;
    this.currencySymbol = value1.currencySymbol;
  }

  gettypeExpenses() {
    this.spinner.show();
    this.service.getexpensestype().subscribe((data: any) => {
      console.log("Expense Data Type : ", data)
      if (data.status) {
        this.spinner.hide();
        this.expensestype = data.data.jsonData
        // this.toastr.success(data.message)
      } else {
        // this.toastr.info(data.message)
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log("Something went wrong");
    })
  }

  // GET ALL DRIVER ID
  getallDriversId() {
    this.spinner.show()
    this.service.getallDriversData().subscribe((data: any) => {
      console.log('GET Driver DATA: ', data)
      if (data.success == true) {
        this.spinner.hide();
        this.driversId = data.list;
        console.log('GET Deriver DATA: ', this.tripsId)
      } else {
        // this.toastr.info("No Records Found");
        console.log("No Records Found Of trips Data");

      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log("Something went wrong");
    })
  }

   // GET ALL TRIPS ID ------------------------------------------>
   getallTrips() {
    this.spinner.show()
    this.service.getallTripsData().subscribe((data: any) => {
      console.log('GET tripsData DATA: ', data)
      if (data.success == true) {
        this.spinner.hide()
        this.tripsId = data.list;
        console.log('GET tripsData DATA: ', this.tripsId)
      } else {
        // this.toastr.info("No Records Found");
        console.log("No Records Found Of trips Data");

      }
    }, (error: HttpErrorResponse) => {
      console.log("Something went wrong");
      this.spinner.hide();
    })
  }

  // GET ALL VEHICLE ID
  getallVehicleId() {
    this.spinner.show();
    this.service.getallvehicleData().subscribe((data: any) => {
      console.log('GET vehicle DATA: ', data)
      if (data) {
        this.spinner.hide();
        this.vehiclesId = data;
        console.log('GET vehicle DATA: ', this.vehiclesId)
      } else {
        // this.toastr.info("No Records Found");
        console.log("No Records Found Of trips Data");

      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log("Something went wrong");
    })
  }

  // Get Currency API
  getCurrency() {
    this.spinner.show();
    this.service.GetCurrency().subscribe((data: any) => {
      console.log("GetCurrency Data : ", data)
      if (data.status == true) {
        this.spinner.hide();
        this.allCurrency = data.data.jsonData
        if (this.editData) {
          this.setExpenseData();
        }
      }
      else {
        console.log("No Records Found");
      }
    }, (error: HttpErrorResponse) => {
      console.log("Something went wrong");
      this.spinner.hide();
    })
  }

  //getCurrency by CurrencyId -------------------------------------------> 
  getCurrencyById(id) {
    this.spinner.show();
    this.service.GetCurrencybyid(id).subscribe((data: any) => {
      console.log("GetCurrencybyid Data : ", data)
      if (data.status == true) {
        this.spinner.hide();
        this.CurrencySymbolofid = data.data.jsonData.currencySymbol;        
      }
      else {
        this.spinner.hide();
        console.log("No Records Found");
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log("Something went wrong");
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
    // console.log(this.file);
    var file = new FormData();
    file.append("file", filedata);
    this.service.uploaddocs(file).subscribe(res => {
      console.log('upload docs response:', res)
      if (res['data'].jsonData) {
        this.fileName = this.url + '/' + res['data'].jsonData;
        console.log('File data :-', this.fileName)
      }
    });
  }

  back() {
    this.router.navigate(['/pages/Manage-Expenses'])

  }

  async setExpenseData() {
    debugger
    if (this.selectedExpensedata.tripId != null) {
      this.selectedExpensedata.linktype = "Trip";
    }  else if (this.selectedExpensedata.deviceId != null) {
      this.selectedExpensedata.linktype = "Driver";
    } else if (this.selectedExpensedata.vehicleId != null) {
      this.selectedExpensedata.linktype = "Vehicle";
    } else {
      this.selectedExpensedata.linktype = "Other";
    }
    this.expenseForm.patchValue({
      imageUrl1: this.selectedExpensedata.imageUrl1,
      expenseDate: this.selectedExpensedata.expenseDate,
      expenseTypeId: this.selectedExpensedata.expenseTypeId,
      expensetitle: this.selectedExpensedata.expenseTypeName,
      currencyName: this.selectedExpensedata.currencyId,
      description: this.selectedExpensedata.description,
      amount: this.selectedExpensedata.amount,
      reference: this.selectedExpensedata.reference,
      linktype: this.selectedExpensedata.linktype,
      tripId: this.selectedExpensedata.tripId,
    })
    this.fileName = this.selectedExpensedata.imageUrl1;
    this.currencyselectId = this.selectedExpensedata.currencyId;
    this.currencyselectName = this.selectedExpensedata.currencyName;
    this.expensetypeId = this.selectedExpensedata.expenseTypeId;
    this.expensetypeName = this.selectedExpensedata.expenseTypeName;
    this.currencySymbol = this.CurrencySymbolofid;

  }

  reset() {
    this.expenseForm.reset();
    // this.campaignOne.reset();
    this.expenseForm = this.fb.group({
      imageUrl1: [''],
      expenseDate: [''],
      expenseTypeId: [''],
      expensetitle: [''],
      currencyName: [''],
      description: [''],
      amount: [''],
      reference: [''],
      linktype: [''],
      tripId: [''],
      deviceId: [''],
      vehicleId: [''],
    });
    this.fileName = undefined;
  }

  SaveAndNew() {
    debugger

    if (!this.expenseForm.valid) {
      alert("You have entered the invalid data");
      return;
    }
    if (!this.data) {
      this.addExpenses();
    } else {
      this.UpdateExpense();
    }
    setTimeout(() => this.formGroupDirective.resetForm(), 0)
    this.resetimg()
  }

  SaveAndClose() {
    if (!this.expenseForm.valid) {
      return;
    } else {

      if (!this.data) {
        this.addExpenses();

      } else {
        this.UpdateExpense();
      }
      this.back();
    }
  }

  addExpenses() {
    this.spinner.show();
    this.expenseForm.value.expenseDate = moment(this.expenseForm.value.expenseDate).format("YYYY-MM-DD HH:mm:ss");
    this.expenseForm.value.currencyName = this.currencyselectName;
    this.expenseForm.value.currencyId = this.currencyselectId;
    this.expenseForm.value.imageUrl1 = this.fileName;
    this.expenseForm.value.currencySymbol = this.currencySymbol;
    var post =
    {
      "expenseDate": this.expenseForm.value.expenseDate,
      "expenseTypeId": this.expensetypeId,
      "amount": this.expenseForm.value.amount,
      "expenseTypeName": this.expensetypeName,
      "reference": this.expenseForm.value.reference,
      "tripId": this.expenseForm.value.tripId,
      "description": this.expenseForm.value.description,
      "vehicleId": this.expenseForm.value.vehicleId,
      "deviceId": this.expenseForm.value.deviceId,
      "currencyId": this.expenseForm.value.currencyId,
      "currencyName": this.expenseForm.value.currencyName,
      "currencysymbol": this.expenseForm.value.currencySymbol,
      "imageUrl1": this.fileName,
      "imageUrl2": null,
      "orgId": 1,
    }
    console.log("add expenses data:-", post)
    this.service.addExpenses(post).subscribe((data: any) => {
      if (data.status) {
        this.spinner.hide();
        this.toastr.success(data.message)
      } else {
        this.toastr.info(data.message)
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log('Error Response', error)
    })
  }

  // UPDATE EMPLOYEE API  ------------------------->
  UpdateExpense() {
    this.spinner.show();
    if (this.tripIdclick) {
      this.expenseForm.value.tripId = this.tripIdclick;
      this.selectedExpensedata.deviceId = null;
      this.selectedExpensedata.vehicleId = null;
      this.expenseForm.value.vehicleId = null;
      this.expenseForm.value.deviceId = null;
    }
    else if (this.VehicleIdclick) {
      this.expenseForm.value.vehicleId = this.VehicleIdclick;
      this.selectedExpensedata.deviceId = null;
      this.selectedExpensedata.tripId = null;
      this.expenseForm.value.tripId = null;
      this.expenseForm.value.deviceId = null;
    }
    else if (this.DriverIdclick) {
      this.expenseForm.value.deviceId = this.DriverIdclick;
      this.selectedExpensedata.vehicleId = null;
      this.selectedExpensedata.tripId = null;
      this.expenseForm.value.vehicleId = null;
      this.expenseForm.value.tripId = null;
    }
    // this.selectedExpensedata.tripId = null;
    // this.selectedExpensedata.deviceId = null;
    // this.selectedExpensedata.vehicleId = null;
    this.expenseForm.value.expenseId = this.expenseId;
    this.expenseForm.value.expenseDate = moment(this.expenseForm.value.expenseDate).format("YYYY-MM-DD HH:mm:ss");;
    this.expenseForm.value.currencyName = this.currencyselectName;
    this.expenseForm.value.currencyId = this.currencyselectId;
    this.expenseForm.value.imageUrl1 = this.fileName;
    this.expenseForm.value.currencySymbol = this.currencySymbol;
    var post =
    {
      "expenseId": this.expenseId,
      "expenseDate": this.expenseForm.value.expenseDate,
      "expenseTypeId": this.expensetypeId,
      "amount": this.expenseForm.value.amount,
      "expenseTypeName": this.expensetypeName,
      "reference": this.expenseForm.value.reference,
      "description": this.expenseForm.value.description,
      "tripId": this.expenseForm.value.tripId,
      "vehicleId": this.expenseForm.value.vehicleId,
      "deviceId": this.expenseForm.value.deviceId,
      "currencyId": this.expenseForm.value.currencyId,
      "currencyName": this.expenseForm.value.currencyName,
      "currencysymbol": this.expenseForm.value.currencySymbol,
      "imageUrl1": this.fileName,
      "imageUrl2": null,
      "orgId": 1,
      "orgName": "My Organization",

    }
    console.log("post", post)
    this.service.editExpenseData(post).subscribe((data: any) => {
      console.log("Upadte Expense", data)

      if (data.status) {
        this.spinner.hide();
        this.toastr.success(data.message)
      } else {
        this.toastr.info(data.message)
      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      // this.toastr.error("Something went wrong");
    })
    this.back();
  }
  resetimg() {
    this.fileName = undefined;
  }
}
