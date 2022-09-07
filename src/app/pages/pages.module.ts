import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../shared/shared.module';
import { SideBarModule } from '../side-bar/side-bar.module';
import { VehicleComponent } from './fleet/vehicle/vehicle.component';
import { ExpenseComponent } from './trips/expense/expense.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {  MatCheckboxModule } from '@angular/material/checkbox'
import { BataComponent } from './bata/bata.component';
import { BataRuleComponent } from './bata/bata-rule/bata-rule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BataRuleTableComponent } from './bata/bata-rule-table/bata-rule-table.component';
import { ExpenseListComponent } from './trips/expense/expense-list/expense-list.component';
import { ExpenseDetailsComponent } from './trips/expense/expense-list/expense-details/expense-details.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TripsDetailsComponent } from './trips/trips-details/trips-details.component';
import { LocationDetailsComponent } from './trips/location-details/location-details.component';
import { AddIncomeComponent } from './trips/add-income/add-income.component';
import { DialogComponent } from './bata/dialog/dialog.component';
import { AddBaseLocationComponent } from './trips/add-base-location/add-base-location.component';
import { AddCustomersComponent } from './trips/add-customers/add-customers.component';
import { IncomeComponent } from './trips/Accounts/income/income.component';
import { CustomerComponent } from './customer/customer.component';
import { BulkUploadComponent } from './customer/bulk-upload/bulk-upload.component';
import { BaseLoactionListComponent } from './trips/base-loaction-list/base-loaction-list.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {MatCardModule} from '@angular/material/card';
import { ViewCutomerComponent } from './trips/view-cutomer/view-cutomer.component';
import { AgmCoreModule } from '@agm/core';
import { ViewIncomeComponent } from './trips/Accounts/view-income/view-income.component';
import { BataRuleVariableComponent } from './bata/bata-rule-variable/bata-rule-variable.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from "ngx-spinner";
import { BataRuleViewComponent } from './bata/bata-rule-view/bata-rule-view.component';



@NgModule({
  declarations: [PagesComponent, 
    VehicleComponent, 
    ExpenseComponent, 
    BataComponent, 
    BataRuleComponent, 
    BataRuleTableComponent, 
    ExpenseListComponent, 
    ExpenseDetailsComponent, 
    TripsDetailsComponent, 
    LocationDetailsComponent, 
    AddIncomeComponent, 
    DialogComponent, 
    AddBaseLocationComponent, 
    AddCustomersComponent, 
    IncomeComponent, 
    CustomerComponent, 
    BulkUploadComponent, 
    BaseLoactionListComponent, 
    ViewCutomerComponent, 
    ViewIncomeComponent, BataRuleVariableComponent, BataRuleViewComponent],
  imports: [
    NgxSpinnerModule,
    CarouselModule,
    SlickCarouselModule,
    CommonModule,
    PagesRoutingModule,    
    MatButtonModule,
    TranslateModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatTooltipModule,
    SharedModule,
    SideBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatCardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHPaQI4Y4Lm9NZdSXXt3W4l_qqKAHM5x0'
    }),
  ],
})
export class PagesModule { }
