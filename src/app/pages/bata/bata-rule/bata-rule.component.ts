import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { ServiceService } from 'src/app/service/service.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-bata-rule',
  templateUrl: './bata-rule.component.html',
  styleUrls: ['./bata-rule.component.scss']
})
export class BataRuleComponent implements OnInit {
  bataRuleForm: FormGroup;
  // orderForm: FormGroup;
  bataSettingSlabs: FormArray;
  bataSettingTimeRanges: FormArray;
  manufacturerdata: any;
  modaldata: any;
  selectedHour1 = 'Hours';
  selectedHour2 = 'Hours';
  selectedHour3 = 'Hours';
  selectedHour4 = 'Hours';
  selectedHour5 = 'Hours';
  selectedRs = 'Rs';
  basisvalue: boolean = false;
  selectBataData: any;
  Batadata: any;
  BataId: any;
  editData = false;
  arraydata=[];
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private route: Router,
    private service: ServiceService,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.activateRoute.queryParams.subscribe(parsam => {

      this.selectBataData = JSON.parse(atob(parsam.data));
      if (this.selectBataData) {
        debugger
        this.Batadata = this.selectBataData;
        this.BataId = this.selectBataData.id;
        console.log("Update bata data: ", this.Batadata)
        this.editData = true;
      } else {
        this.editData = false;
      }
    });
  }

  ngOnInit() {
    debugger
    if(this.Batadata)
    {
      this.bataRuleForm = this.fb.group({
        manufacturer: ['', [Validators.required]],
        vehicleType: ['',[Validators.required]],
        vehicleModel: ['',[Validators.required]],
        bataType: ['',[Validators.required]],
        inStationMinimumCriteria: ['', [Validators.required, Validators.pattern(/^(1|[1-9]\d{0,5})$/)]],
        inStationUnit: [''],
        inStationAmount:['', [Validators.required, Validators.pattern(/^(1|[1-9]\d{0,5})$/)]],
        instationAmountType: [''],
        outStationMinimumCriteria: ['', [Validators.required, Validators.pattern(/^(1|[1-9]\d{0,5})$/)]],
        outStationUnit: [''],
        outStationAmount: ['', [Validators.required, Validators.pattern(/^(1|[1-9]\d{0,5})$/)]],
        outstationAmountType: [''],
        duration: ['', [Validators.required, Validators.pattern(/^(1|[1-9]\d{0,5})$/)]],
        durationtimeType: [''],
        durationAmount: ['', [Validators.required, Validators.pattern(/^(1|[1-9]\d{0,5})$/)]],
        durationAmountType: [''],
        bataSettingSlabs: this.fb.array([
          // this.fb.group({
          //   timeOrKms: '',
          //   unit: '',
          //   amount: '',
          //   srNo: 0,
          //   orgId: 1,
          //   orgName: 'My-Qorganization',
          //   isEnabled: true,
          //   isDeleted: false,
          //   insertedBy: 0,
          //   insertedOn: "2022-08-22T10:04:43.044Z",
          //   lastUpdatedBy: 0,
          //   lastUpdatedOn: "2022-08-22T10:04:43.044Z",
          //   deletedBy: 0,
          //   deletedOn: "2022-08-22T10:04:43.044Z"
          // })
        ]),
  
        bataSettingTimeRanges: this.fb.array([
          // this.fb.group({
          //   fromTime: '',
          //   toTime: '',
          //   duration: '',
          //   unit: '',
          //   amount: '',
          //   srNo: 0,
          //   orgId: 1,
          //   orgName: 'My-Qorganization',
          //   isEnabled: true,
          //   isDeleted: false,
          //   insertedBy: 0,
          //   insertedOn: "2022-08-22T10:04:43.044Z",
          //   lastUpdatedBy: 0,
          //   lastUpdatedOn: "2022-08-22T10:04:43.044Z",
          //   deletedBy: 0,
          //   deletedOn: "2022-08-22T10:04:43.044Z"
          // })
        ]),
  
      });
    }
    else
    {
      this.bataRuleForm = this.fb.group({
        manufacturer: [''],
        vehicleType: [''],
        vehicleModel: [''],
        bataType: [''],
        inStationMinimumCriteria: ['', [Validators.required, Validators.pattern(/^(1|[1-9]\d{0,5})$/)]],
        inStationUnit: [''],
        inStationAmount: ['', [Validators.required, Validators.pattern(/^(1|[1-9]\d{0,5})$/)]],
        instationAmountType: [''],
        outStationMinimumCriteria:['', [Validators.required, Validators.pattern(/^(1|[1-9]\d{0,5})$/)]],
        outStationUnit: [''],
        outStationAmount: ['', [Validators.required, Validators.pattern(/^(1|[1-9]\d{0,5})$/)]],
        outstationAmountType: [''],
        durationTime: ['', [Validators.required, Validators.pattern(/^(1|[1-9]\d{0,5})$/)]],
        durationtimeType: [''],
        durationAmount: ['', [Validators.required, Validators.pattern(/^(1|[1-9]\d{0,5})$/)]],
        durationAmountType: [''],
       
        bataSettingSlabs: this.fb.array([
          this.fb.group({
            timeOrKms: '',
            unit: '',
            amount: '',
            srNo: 0,
            orgId: 1,
            orgName: 'My-Qorganization',
            isEnabled: true,
            isDeleted: false,
            insertedBy: 0,
            insertedOn: "2022-08-22T10:04:43.044Z",
            lastUpdatedBy: 0,
            lastUpdatedOn: "2022-08-22T10:04:43.044Z",
            deletedBy: 0,
            deletedOn: "2022-08-22T10:04:43.044Z"
          })
        ]),
  
        bataSettingTimeRanges: this.fb.array([
          this.fb.group({
            fromTime: '',
            toTime: '',
            duration: '',
            unit: '',
            amount: '',
            srNo: 0,
            orgId: 1,
            orgName: 'My-Qorganization',
            isEnabled: true,
            isDeleted: false,
            insertedBy: 0,
            insertedOn: "2022-08-22T10:04:43.044Z",
            lastUpdatedBy: 0,
            lastUpdatedOn: "2022-08-22T10:04:43.044Z",
            deletedBy: 0,
            deletedOn: "2022-08-22T10:04:43.044Z"
          })
        ]),
  
      });
    }
  
    // this.bataRuleForm = this.fb.group({
    //   batarulearray: this.fb.array([]),
    // })
    this.getManufacturer();
    this.getModal();
    if (this.editData) {
      this.setBataData();
    }
  }

  setBataData() {
    var arr = [];
    var arr1=[]
    this.bataRuleForm.patchValue({
      manufacturer: this.Batadata.manufacturer,
      vehicleType: this.Batadata.vehicleType,
      vehicleModel: this.Batadata.vehicleModel,
      bataType: this.Batadata.bataType,
      inStationMinimumCriteria: this.Batadata.inStationMinimumCriteria,
      inStationUnit: this.Batadata.inStationUnit,
      inStationAmount: this.Batadata.inStationAmount,
      instationAmountType: this.Batadata.currencyName,
      outStationMinimumCriteria: this.Batadata.outStationMinimumCriteria,
      outStationUnit: this.Batadata.outStationUnit,
      outStationAmount: this.Batadata.outStationAmount,
      outstationAmountType: this.Batadata.currencyName,

      // bataSettingSlabs: this.Batadata.bataSettingTimeRanges,

      // bataSettingTimeRanges: this.Batadata.bataSettingSlabs
    })
    // this.bataSettingSlabs = this.Batadata.bataSettingSlabs,
    //   this.bataSettingTimeRanges = this.Batadata.bataSettingTimeRanges
      debugger;
    // this.bataSettingSlabs

  

    for(var i=0;i<this.Batadata.bataSettingSlabs.length;i++)
      {
        this.adduser(this.Batadata.bataSettingSlabs[i])
      }
   
    
      for(var i=0;i<this.Batadata.bataSettingTimeRanges.length;i++)
      {
        this.addtimerrages(this.Batadata.bataSettingTimeRanges[i])
      }

  }

  adduser(user?: any) {
  
    
    let fg = this.fb.group({
      timeOrKms: user.timeOrKms,
      unit: user.unit,
      amount: user.amount,
    });
    debugger
   // (<FormArray>this.bataRuleForm.get('bataSettingSlabs')).length - 1;
    (<FormArray>this.bataRuleForm.get('bataSettingSlabs')).push(fg);
   //  let userIndex = (
    console.log(this.bataRuleForm)
  }

  addtimerrages(user?: any) {
  
    
    let fg = this.fb.group({
      fromTime: user.fromTime,
      toTime: user.toTime,
      duration: user.duration,
      unit: user.unit,
      amount: user.amount,
    });
    debugger
   // (<FormArray>this.bataRuleForm.get('bataSettingSlabs')).length - 1;
    (<FormArray>this.bataRuleForm.get('bataSettingTimeRanges')).push(fg);
   //  let userIndex = (
    console.log(this.bataRuleForm)
  }



  bataonbasis(value) {

    if (value == 'Time') {
      this.basisvalue = true
    } else {
      this.basisvalue = false
    }

  }

  createItem(): FormGroup {
    return this.fb.group({
      timeOrKms: '',
      unit: '',
      amount: '',
      srNo: 0,
      orgId: 1,
      orgName: 'My-Qorganization',
      isEnabled: true,
      isDeleted: false,
      insertedBy: 0,
      insertedOn: "2022-08-22T10:04:43.044Z",
      lastUpdatedBy: 0,
      lastUpdatedOn: "2022-08-22T10:04:43.044Z",
      deletedBy: 0,
      deletedOn: "2022-08-22T10:04:43.044Z"
    });
  }

  createItem1(): FormGroup {
    return this.fb.group({
      fromTime: '',
      toTime: '',
      duration: '',
      unit: '',
      amount: '',
      srNo: 0,
      orgId: 1,
      orgName: 'My-Qorganization',
      isEnabled: true,
      isDeleted: false,
      insertedBy: 0,
      insertedOn: "2022-08-22T10:04:43.044Z",
      lastUpdatedBy: 0,
      lastUpdatedOn: "2022-08-22T10:04:43.044Z",
      deletedBy: 0,
      deletedOn: "2022-08-22T10:04:43.044Z"
    });

  }

  removebataSettingSlabsValue(i) {
    if(this.bataSettingSlabs.length > 1) {
      this.bataSettingSlabs.removeAt(i);
    } else {
      this.toastr.error("You Cat not Delete All Fields")
    }   
  }

  removebataSettingTimeRangesValue(j){
    this.bataSettingTimeRanges.length
    if(this.bataSettingTimeRanges.length > 1) {
      this.bataSettingTimeRanges.removeAt(j);
    } else {
      this.toastr.error("You Cat not Delete All Fields")
    }
    
  }

  addItem(): void {
    this.bataSettingSlabs = this.bataRuleForm.get('bataSettingSlabs') as FormArray;

    // const timeamount = this.bataRuleForm.value['bataSettingSlabs'][0]['amount'];
    // this.bataRuleForm.value['bataSettingSlabs'][0]['amount'] = +timeamount;

    // const timeorkms = this.bataRuleForm.value['bataSettingSlabs'][0]['timeOrKms'];
    // this.bataRuleForm.value['bataSettingSlabs'][0]['timeOrKms'] = +timeorkms;

    this.bataSettingSlabs.push(this.createItem());
  }

  addtimerangearray() {
    this.bataSettingTimeRanges = this.bataRuleForm.get('bataSettingTimeRanges') as FormArray;
    let date = moment(this.bataRuleForm.value['bataSettingTimeRanges'][0]['fromTime']).format();

    // const timeduration = this.bataRuleForm.value['bataSettingTimeRanges'][0]['duration'];
    // this.bataRuleForm.value['bataSettingTimeRanges'][0]['duration'] = +timeduration;

    // const timeamount = this.bataRuleForm.value['bataSettingTimeRanges'][0]['amount'];
    // this.bataRuleForm.value['bataSettingTimeRanges'][0]['amount'] = +timeamount;

    this.bataSettingTimeRanges.push(this.createItem1());
    console.log("Form array for time: ", this.bataSettingTimeRanges)
  }
  //<-------------------------dialog ---------------------->
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
      }
    })
  }

  batarulearray(): FormArray {

    return this.bataRuleForm.get("batarulearray") as FormArray;
  }

  newPresent(): FormGroup {
    return this.fb.group({
      bataruletime: '',
      bataruletimetype: '',
      bataruleamount: '',
      batarulecurrency: '',
      batarulecurrencyType: ''
    })
  }

  back() {
    this.route.navigate(['/pages/Bata-Rule-list'])
  }

  addRules() {
    this.batarulearray().push(this.newPresent());
    console.log("bata rule as per time basis: ", this.batarulearray)

  }

  Submit() {
    debugger
    if(!this.bataRuleForm.invalid){
      this.toastr.warning("You have entered invalid data");
      return;
    } else {
      if (!this.editData) {
        this.addBata();
      } else {
        this.update();
      }
    }    
  }

  addBata() {
    debugger
    console.log("Bata Rule Data ", this.bataRuleForm.value);
    const timeamount = this.bataRuleForm.value['bataSettingSlabs'][0]['amount'];
    this.bataRuleForm.value['bataSettingSlabs'][0]['amount'] = +timeamount;

    const timeorkms = this.bataRuleForm.value['bataSettingSlabs'][0]['timeOrKms'];
    this.bataRuleForm.value['bataSettingSlabs'][0]['timeOrKms'] = +timeorkms;

    let date = moment(this.bataRuleForm.value['bataSettingTimeRanges'][0]['fromTime']).format();
    // const timeduration = this.bataRuleForm.value['bataSettingTimeRanges'][0]['fromTime']
    const inamount = this.bataRuleForm.value.inStationAmount;
    const inStationMinimumCriteria = this.bataRuleForm.value.inStationMinimumCriteria;
    const instationunit = this.bataRuleForm.value.inStationUnit;
    const outStationMinimumCriteria = this.bataRuleForm.value.outStationMinimumCriteria;
    const outStationUnit = this.bataRuleForm.value.outStationUnit;
    const outStationAmount = this.bataRuleForm.value.outStationAmount;
    var p = this.bataRuleForm.value.bataSettingTimeRanges;

    for (var key in this.bataRuleForm.value.bataSettingTimeRanges) {
      this.bataRuleForm.value.bataSettingTimeRanges[key].fromTime = moment(this.bataRuleForm.value.bataSettingTimeRanges[key].fromTime).format();
      this.bataRuleForm.value.bataSettingTimeRanges[key].toTime = moment(this.bataRuleForm.value.bataSettingTimeRanges[key].toTime).format();
    };

    for (var key1 in this.bataRuleForm.value.bataSettingTimeRanges) {
      const timeduration = this.bataRuleForm.value['bataSettingTimeRanges'][key1]['duration'];
      this.bataRuleForm.value['bataSettingTimeRanges'][key1]['duration'] = +timeduration;

      const timeamount = this.bataRuleForm.value['bataSettingTimeRanges'][key1]['amount'];
      this.bataRuleForm.value['bataSettingTimeRanges'][key1]['amount'] = +timeamount;
    };

    for (var key2 in this.bataRuleForm.value.bataSettingSlabs) {
      const timeamount = this.bataRuleForm.value['bataSettingSlabs'][key2]['amount'];
      this.bataRuleForm.value['bataSettingSlabs'][key2]['amount'] = +timeamount;

      const timeorkms = this.bataRuleForm.value['bataSettingSlabs'][key2]['timeOrKms'];
      this.bataRuleForm.value['bataSettingSlabs'][key2]['timeOrKms'] = +timeorkms;
    };

    console.log("value", this.bataRuleForm.value.bataSettingTimeRanges);

    console.log("Format: ", this.bataRuleForm.value.bataSettingTimeRangeste)


    const postdata = {
      "manufacturer": this.bataRuleForm.value.manufacturer,
      "vehicleTypeId": 1,
      "vehicleType": this.bataRuleForm.value.vehicleType,
      "vehicleModel": this.bataRuleForm.value.vehicleModel,
      "bataType": this.bataRuleForm.value.bataType,
      "currencyId": 1,
      "currencyName": this.bataRuleForm.value.outstationAmountType,
      "inStationMinimumCriteria": +inStationMinimumCriteria,
      "inStationUnit": this.bataRuleForm.value.inStationUnit,
      "inStationAmount": +inamount,
      "outStationMinimumCriteria": +outStationMinimumCriteria,
      "outStationUnit": this.bataRuleForm.value.outStationUnit,
      "outStationAmount": +outStationAmount,
      "orgId": 0,
      "orgName": "MY ORGANISATION",
      "isEnabled": true,
      "isDeleted": false,
      "insertedBy": 1,
      "insertedOn": "2022-08-22T10:04:43.044Z",
      "lastUpdatedBy": 0,
      "lastUpdatedOn": "2022-08-22T10:04:43.044Z",
      "deletedBy": 0,
      "deletedOn": "2022-08-22T10:04:43.044Z",
      "bataSettingSlabs": this.bataRuleForm.value['bataSettingSlabs'],
      "bataSettingTimeRanges": this.bataRuleForm.value['bataSettingTimeRanges']
    }
    console.log("Bata Rule postdata ", postdata);

    this.service.AddBataRule(postdata).subscribe((data: any) => {
      console.log('addBata success', data)
      if (data.status) {
        this.toastr.success(data.message)
      } else {
        this.toastr.info(data.message)
      }
    }, (error: HttpErrorResponse) => {
      console.log('Error Response', error)
    })
    this.back()
  }

  update() {
    debugger
    console.log("Bata Rule Data ", this.bataRuleForm.value);

    let date = moment(this.bataRuleForm.value['bataSettingTimeRanges'][0]['fromTime']).format();

    var p = this.bataRuleForm.value.bataSettingTimeRanges;
    console.log("bataSettingTimeRanges", p)

    for (var key in this.bataRuleForm.value.bataSettingTimeRanges) {
      this.bataRuleForm.value.bataSettingTimeRanges[key].fromTime = moment(this.bataRuleForm.value.bataSettingTimeRanges[key].fromTime).format();
      this.bataRuleForm.value.bataSettingTimeRanges[key].toTime = moment(this.bataRuleForm.value.bataSettingTimeRanges[key].toTime).format();
    }

    for (var key in this.bataRuleForm.value.bataSettingTimeRanges) {
      const timeduration = this.bataRuleForm.value['bataSettingTimeRanges'][key]['duration'];
      this.bataRuleForm.value['bataSettingTimeRanges'][key]['duration'] = +timeduration;

      const timeamount = this.bataRuleForm.value['bataSettingTimeRanges'][key]['amount'];
      this.bataRuleForm.value['bataSettingTimeRanges'][key]['amount'] = +timeamount;
    }

    for (var key in this.bataRuleForm.value.bataSettingSlabs) {
      const timeamount = this.bataRuleForm.value['bataSettingSlabs'][key]['amount'];
      this.bataRuleForm.value['bataSettingSlabs'][key]['amount'] = +timeamount;

      const timeorkms = this.bataRuleForm.value['bataSettingSlabs'][key]['timeOrKms'];
      this.bataRuleForm.value['bataSettingSlabs'][key]['timeOrKms'] = +timeorkms;
    }


    console.log("value", this.bataRuleForm.value.bataSettingTimeRanges);

    console.log("Format: ", this.bataRuleForm.value.bataSettingTimeRangeste)


    const postdata = {
      "id": this.BataId,
      "manufacturer": this.bataRuleForm.value.manufacturer,
      "vehicleTypeId": 1,
      "vehicleType": this.bataRuleForm.value.vehicleType,
      "vehicleModel": this.bataRuleForm.value.vehicleModel,
      "bataType": this.bataRuleForm.value.bataType,
      "currencyId": 1,
      "currencyName": this.bataRuleForm.value.outstationAmountType,
      "inStationMinimumCriteria": this.bataRuleForm.value.inStationMinimumCriteria,
      "inStationUnit": this.bataRuleForm.value.inStationUnit,
      "inStationAmount": this.bataRuleForm.value.inStationAmount,
      "outStationMinimumCriteria": this.bataRuleForm.value.outStationMinimumCriteria,
      "outStationUnit": this.bataRuleForm.value.outStationUnit,
      "outStationAmount": this.bataRuleForm.value.outStationAmount,
      "orgId": 0,
      "orgName": "MY ORGANISATION",
      "isEnabled": true,
      "isDeleted": false,
      "insertedBy": 1,
      "insertedOn": "2022-08-22T10:04:43.044Z",
      "lastUpdatedBy": 0,
      "lastUpdatedOn": "2022-08-22T10:04:43.044Z",
      "deletedBy": 0,
      "deletedOn": "2022-08-22T10:04:43.044Z",
      "bataSettingSlabs": this.bataRuleForm.value['bataSettingSlabs'],
      "bataSettingTimeRanges": this.bataRuleForm.value['bataSettingTimeRanges']
    }
    console.log("Bata Rule postdata ", postdata);


    this.service.UpdateBataRule(postdata).subscribe((data: any) => {
      console.log('UpdateBataRule success', data)
      if (data.status) {
        this.toastr.success(data.message)
      } else {
        this.toastr.info(data.message)
      }
    }, (error: HttpErrorResponse) => {
      console.log('Error Response', error)
    })
    this.back()
  }

  timeselect() {

  }

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

}
