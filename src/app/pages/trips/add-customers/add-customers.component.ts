import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.scss']
})
export class AddCustomersComponent implements OnInit {
  customerForm: FormGroup;
  dialogTitle: string;
  roleId: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private service: ServiceService,
    public router: Router,
    private dialogRef: MatDialogRef<AddCustomersComponent>,
    private spinner : NgxSpinnerService,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {

    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      phone:  ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required,Validators.minLength(1), Validators.maxLength(50)]],
      landmark: [''],
      notes: [''],
    })
    
    this.CheckAddEdit();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  back(){
    this.router.navigate(['/pages/Trips-detail'])
  }

  CheckAddEdit(){
    if(this.data.action == 'edit'){
      console.log("Edit DATA: ", this.data);
      this.setCustomerData();
      }
      else{
      // this.setCandidateData() ;
      return;
      }
  }

  setCustomerData(){
    this.customerForm.patchValue ({
      name: this.data.data.name,
      phone: this.data.data.phone,
      email: this.data.data.email,
      address: this.data.data.address,
      landmark: this.data.data.landmark,
      notes: this.data.data.notes,
    })
  }

  submit(){  
    if (!this.customerForm.valid) {
      alert("You have entered the invalid data");
      return;
    } else {
      if(this.data) {
        this.updateCustomer();
      } else {
        console.log("Create Customer Data: ", this.customerForm.value);
        this.createCustomer();
      }
    }   
  }

  createCustomer(){    
    this.spinner.show();
    const post = {
      "name": this.customerForm.value.name,
      "address": this.customerForm.value.address,
      "city": "string",
      "state": "string",
      "landmark": this.customerForm.value.landmark,
      "email": this.customerForm.value.email,
      "phone": this.customerForm.value.phone,
      "notes": this.customerForm.value.notes,
      "orgId": 0,
      "orgName": "Admin",
    }
    this.service.addCustomer(this.customerForm.value).subscribe((data: any) => {
      this.spinner.hide();
      console.log('addCustomer success', data)
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log('Error Response', error)
    })
   this.onNoClick()
  }

  updateCustomer(){    
    this.spinner.show();  
    this.customerForm.value.id = this.data.data.id;
    const post = {
      "id": this.customerForm.value.id,
      "name": this.customerForm.value.name,
      "address": this.customerForm.value.address,
      "city": "string",
      "state": "string",
      "landmark": this.customerForm.value.landmark,
      "email": this.customerForm.value.email,
      "phone": this.customerForm.value.phone,
      "notes": this.customerForm.value.notes,
      "orgId": 0,
      "orgName": "Admin",
    }
    this.service.editCustomer(post).subscribe((data: any) => {
      if(data.status){
        this.spinner.hide();  
        this.toastr.success(data.message)
        console.log('EditCustomer success', data)
      } else {
        this.toastr.info(data.message)
      }
     
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();  
      console.log('Error Response', error)
    })
   this.onNoClick()
  }

}
