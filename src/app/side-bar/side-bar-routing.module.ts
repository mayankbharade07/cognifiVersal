import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar.component';

const routes: Routes = [
  {
    path: 'navigation',
    component: NavSidebarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideBarRoutingModule { }
