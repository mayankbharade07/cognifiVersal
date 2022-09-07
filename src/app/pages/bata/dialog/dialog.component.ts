import { Component,Inject,OnInit, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @ViewChild('select') select: MatSelect;

  allSelected=false;
   checks: any[] = [
    {value: 'Glanza-0', viewValue: 'Glanza'},
    {value: 'Urban Cruiser-1', viewValue: 'Urban Cruiser'},
    {value: 'Innova Crysta-2', viewValue: 'Innova Crysta'},
    {value: 'Fortuner-3', viewValue: 'Fortuner'},
    {value: 'Camry-4', viewValue: 'Camry'},
    {value: 'Hide required marker-5', viewValue: 'Hide required marker'}
  ];
  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }
   optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }
  constructor(private route: Router,private dialogRef: MatDialogRef<DialogComponent>){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

