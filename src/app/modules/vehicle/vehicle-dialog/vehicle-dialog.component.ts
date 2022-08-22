import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Vehicle } from 'src/app/shared/models/vehicle.model';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.scss']

})

export class VehicleDialogComponent implements OnInit {
  vehicleForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Vehicle,
    private formBuilder: FormBuilder) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.initializeForm();
  }


  initializeForm(): FormGroup {
    this.vehicleForm = this.formBuilder.group({
      vehicleName: ['', Validators.required],
      licensePlate: ['',Validators.required],
      vin: [''],
      vehicleTypeName: ['',Validators.required],
      vehicleSubtypeName: [''],
      color: [''],
      model: ['',Validators.required],
      depotName: [''],
      tag: [''],
      device:['']
    });
    return this.vehicleForm;
  }

  onSubmit(){}
}