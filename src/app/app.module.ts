import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';

//Angular Material Components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReportsModule } from './modules/reports/reports.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './core/keycloak-init';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    OverlayModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    KeycloakAngularModule,
    ReportsModule,
    VehicleModule,
    CoreModule,
    SharedModule
  ],

  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}