import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    TranslateModule,
    MatListModule,
    AppRoutingModule,
    MatMenuModule,
    MatExpansionModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
