import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleHomePageComponent } from './modules/vehicle/vehicle-home-page/vehicle-home-page.component';
import { RouteReportComponent } from '././modules/reports/route-report/route-report.component';

const routes: Routes = [
  { path: 'routereport', component: RouteReportComponent },
  { path: 'vehicle', component: VehicleHomePageComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
