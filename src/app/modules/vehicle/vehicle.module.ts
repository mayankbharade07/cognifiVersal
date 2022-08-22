import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleHomePageComponent } from './vehicle-home-page/vehicle-home-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { VehicleService } from '../../shared/services/vehicle.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule ,MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import { VehicleDialogComponent } from './vehicle-dialog/vehicle-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule} from '@angular/material/list';
@NgModule({
  declarations: [
    VehicleHomePageComponent,
    VehicleDialogComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableExporterModule,
    MatButtonModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatListModule
  ],
  exports: [VehicleHomePageComponent, VehicleDialogComponent],
  providers: [VehicleService,{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}]
})
export class VehicleModule { }
