import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BataRuleTableComponent } from './bata/bata-rule-table/bata-rule-table.component';
import { BataRuleComponent } from './bata/bata-rule/bata-rule.component';
import { BataComponent } from './bata/bata.component';
import { CustomerComponent } from './customer/customer.component';
import { VehicleComponent } from './fleet/vehicle/vehicle.component';
import { PagesComponent } from './pages.component';
import { IncomeComponent } from './trips/Accounts/income/income.component';
import { AddIncomeComponent } from './trips/add-income/add-income.component';
import { ExpenseDetailsComponent } from './trips/expense/expense-list/expense-details/expense-details.component';
import { ExpenseListComponent } from './trips/expense/expense-list/expense-list.component';
import { ExpenseComponent } from './trips/expense/expense.component';
import { LocationDetailsComponent } from './trips/location-details/location-details.component';
import { TripsDetailsComponent } from './trips/trips-details/trips-details.component';
import { BulkUploadComponent } from './customer/bulk-upload/bulk-upload.component';
import { BaseLoactionListComponent } from './trips/base-loaction-list/base-loaction-list.component';
import { ViewCutomerComponent } from './trips/view-cutomer/view-cutomer.component';
import { ViewIncomeComponent } from './trips/Accounts/view-income/view-income.component';
import { BataRuleViewComponent } from './bata/bata-rule-view/bata-rule-view.component';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent
  },
  {
    path: 'vehical',
    component: VehicleComponent
  },
  {
    path: 'Add-Expenses',
    component: ExpenseComponent
  },
  {
    path: 'Bata-Allowance',
    component: BataComponent
  },
  {
    path: 'Bata-Rule',
    component: BataRuleComponent
  },
  {
    path: 'Bata-Rule-list',
    component: BataRuleTableComponent
  },
  {
    path: 'Manage-Expenses',
    component: ExpenseListComponent
  },
  {
    path: 'Expenses-Details',
    component: ExpenseDetailsComponent  
  },
  {
    path: 'Trips-detail',
    component: TripsDetailsComponent
  },
  {
    path: 'Location-details',
    component: LocationDetailsComponent
  },
  {
    path: 'Add-income',
    component: AddIncomeComponent
  },
  {
    path: 'Income',
    component: IncomeComponent
  },
  {
    path: 'Customer',
    component: CustomerComponent
  },
  {
    path: 'Bulk-upload',
    component: BulkUploadComponent
  },
  {
    path: 'Base-loaction-list',
    component: BaseLoactionListComponent
  },
  {
    path: 'View-Customer',
    component: ViewCutomerComponent
  },
  {
    path: 'View-Income',
    component: ViewIncomeComponent
  },
  {
    path: 'View-Rule-Set',
    component: BataRuleViewComponent
  }
  
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
