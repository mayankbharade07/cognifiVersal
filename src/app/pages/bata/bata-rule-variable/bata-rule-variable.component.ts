import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bata-rule-variable',
  templateUrl: './bata-rule-variable.component.html',
  styleUrls: ['./bata-rule-variable.component.scss']
})
export class BataRuleVariableComponent implements OnInit {
  dataVariable: any;
  type: any;
  currency: any;
  view = "variable";
  dataGeneral: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    debugger
    console.log("BATA-data_ ", data)
    
    this.dataVariable = data.data.bataSettingTimeRanges;
    this.dataGeneral = data.data.bataSettingSlabs;
    this.type = data.type;
    this.currency = data.currency;
   }

  ngOnInit(): void {
  }

  viewPage(data) {
    this.view = data
  }

}
