import { SelectionModel } from '@angular/cdk/collections';
import { MediaMatcher } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Inject, OnInit, Output, Renderer2 } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PeriodicElement } from 'src/app/pages/pages.component';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.scss']
})

export class NavSidebarComponent implements OnInit {
  themes = [
    { code: 'blue-n-indigo-light-theme', name: 'Blue and Indigo', isChecked: false },
    { code: 'deep-purple-n-amber-light-theme', name: 'Deep Purple and Amber', isChecked: false },
    { code: 'pink-n-blue-grey-dark-theme', name: 'Pink and Blue-grey', isChecked: false },
    { code: 'indigo-n-pink-light-theme', name: 'Indigo and Pink', isChecked: false }
  ]
  languages = [
    { code: 'en', label: 'English', isChecked: false },
    { code: 'hi', label: 'हिंदी', isChecked: false },
    { code: 'fr', label: 'français', isChecked: false }];
  sideNavMenu = [];

  isExpanded = false;
  isShowing = false;
  @Output() themeEventListener: EventEmitter<any> = new EventEmitter();
  @HostBinding('class') componentCssClass: any;
  mobileQuery: MediaQueryList;


  private _mobileQueryListener: () => void;
  hide: boolean;
  constructor( media: MediaMatcher,changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    public overlayContainer: OverlayContainer,
    public translate: TranslateService,
  ) { 
    translate.addLangs(['en', 'hi', 'fr']);
    translate.setDefaultLang('en');
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  ngOnInit(): void {
    var currentLanguage = localStorage.getItem("currentLanguage");
    var lang = currentLanguage ? currentLanguage : 'en';
    var currentTheme = localStorage.getItem("currentTheme");
    var theme = currentTheme ? currentTheme : 'blue-n-indigo-light-theme';
    this.languages.filter(x => x.code == lang).map(x => x.isChecked = true);
    this.themes.filter(x => x.code == theme).map(x => x.isChecked = true);
    this.setLanguage(lang);
    this.setTheme(theme);
    this.getSideMenu();
  }
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  // menu:NavItem[] =[
  //   {
  //     displayName: 'home',
  //     iconName: 'side-nav.dashboard',
  //     route: '/pages',
  //   }, 
  //   {
  //     displayName: 'wallet',
  //     iconName: 'Account',
  //     children: [
  //       {
  //         displayName: 'wallet',
  //         iconName: 'wallet',
  //         route: '/pages/Manage-Expenses'
  //       },
  //     ]
  //   },
  //   {
  //     displayName: 'balance',
  //     iconName: 'side-nav.dashboard',
  //     route: '/pages/Bata-Allowance',
  //   },
  // ]

 
  getSideMenu() {
    this.sideNavMenu = [
      {
        mainMenu: { icon: 'home', translationKey: 'side-nav.dashboard', route: '/pages' },
        
      },
      // {
      //   mainMenu: { icon: 'home', translationKey: 'side-nav.dashboard', route: '/pages/vehical' }
      // },
      {
        mainMenu: { icon: 'account_balance', translationKey: 'side-nav.account', 
        subMenu: [
          { icon: 'account_balance', translationKey: 'side-nav.expense', route: '/pages/Manage-Expenses'  },
          { icon: 'account_balance', translationKey: 'side-nav.income', route: '/pages/Income'  }
        ] }
      },
             
      {
        mainMenu: { icon: 'account_balance_wallet', translationKey: 'side-nav.bataAllowance', route: '/pages/Bata-Allowance'}
      },
      // {
      //   mainMenu: { icon: 'account_balance_wallet', translationKey: 'Bata Allowance', route: '/pages/Bata-Allowance'}
      // },
      {
        mainMenu: { icon: 'insert_chart', translationKey: 'side-nav.bataRulesList', route: '/pages/Bata-Rule-list'}
      },
      {
        mainMenu: { icon: 'person_add', translationKey: 'side-nav.customer' , route: '/pages/Customer'}
      }
      
    ];
  }

  ngOnDestroy() {
  }
  // hideshow(){
  //   debugger
  //   this.hide =!this.hide;
  // }

  setTheme(theme: string) {
    this.themeEventListener.emit(theme);
    this.themes.forEach(item => {
      this.overlayContainer.getContainerElement().classList.remove(item.code);
    });
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
    localStorage.setItem("currentTheme", theme);
  }

  setLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem("currentLanguage", language);
  }
 
  mouseenter() {
    this.isShowing = true;
    this.isExpanded = true;
  }

  mouseleave() {
    this.isShowing = false;
    this.isExpanded = false;
  }

}
