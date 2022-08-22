import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ROUTES } from '../../shared/constants';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  themes = [
    'Default',
    'Dark',
    'Light'
  ]
  languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'fr', label: 'français' }];
  isExpanded = false;
  isShowing = false;
  menuTitle: string;
  routes = ROUTES;
  @Output() themeEventListener: EventEmitter<any> = new EventEmitter();

  constructor(public translate: TranslateService, private keycloakService: KeycloakService) {
    translate.addLangs(['en', 'hi', 'fr']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    var currentLanguage = localStorage.getItem("currentLanguage");
    var lang = currentLanguage != 'undefined' ? currentLanguage : 'en';
    this.setLanguage(lang);
  }

  setTheme(theme: string) {
    this.themeEventListener.emit(theme);
  }

  setLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem("currentLanguage", language);
  }

  mouseenter() {
    // if (!this.isExpanded) {
    this.isShowing = true;
    // }
  }

  mouseleave() {
    // if (!this.isExpanded) {
    this.isShowing = false;
    // }
  }

  logout() {
    this.keycloakService.logout();
  }

  selectMenuItem(title: any) {
    this.menuTitle = title;
  }
}
