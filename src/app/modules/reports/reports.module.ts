import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReportComponent } from './route-report/route-report.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RouteReportComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableExporterModule,
    MatButtonModule,
    TranslateModule
  ],
  exports: [RouteReportComponent]
})
export class ReportsModule { }
