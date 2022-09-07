import { Component, HostBinding, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceService } from '../service/service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { OwlOptions } from 'ngx-owl-carousel-o';

export interface PeriodicElement {
  VehicleType: string;
  DriverName: string;
  Status: string;
  Category: string;
  startDTonword: string;
  endDTonword: string;
  startDTactual: string;
  endDTactual: string;
  perfomance: string;
  id: string;
  
}
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  slides: any = [[]];
  lengthMore = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  private paginator: MatPaginator;
  private sort: MatSort;

  dataSource: any = new MatTableDataSource([]);
  displayedColumns: string[] = ['tripId', 'VehicleType', 'DriverName', 'Status', 'Category', 'startDTonword'
    , 'endDTonword', 'startDTactual', 'endDTactual', 'perfomance'];
  // dataSource : MatTableDataSource<PeriodicElement>;

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
  tripsData: any;

  tabledata: any;
  todaytripdata: any;
  recentTrip: string = 'side-nav.dashboard';
  filterdatafortoday: any[];

  options: any
  DefaultMainImage: string;
  constructor(
    // private toastr:ToastrService,
    public translate: TranslateService,
    public overlayContainer: OverlayContainer,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    public service: ServiceService,
    private spinner: NgxSpinnerService,
  ) {
    translate.addLangs(['en', 'hi', 'fr']);
    translate.setDefaultLang('en');
    console.log("translate.get", translate.get);
    if (translate.store.currentLang === 'hi') {

    }

  }

  @ViewChild(MatPaginator, { static: false }) set matPaginator(
    mp: MatPaginator) {
    this.paginator = mp;
    this.setPaginationAndSort();
  }

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setPaginationAndSort();
  }

  applyFilter(event: Event) {
    console.log('Apply Filter ', this.dataSource)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    this.getallTrips();
    this.getTodayTrips();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getSideMenu() {
    this.sideNavMenu = [
      {
        mainMenu: { icon: 'home', translationKey: 'side-nav.dashboard', route: '/pages/navigation' }
      },
      {
        mainMenu: { icon: 'home', translationKey: 'side-nav.dashboard', route: '/pages/navigation' }
      }
    ];
  }

  ngOnDestroy() {
  }

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
  }

  mouseleave() {
    this.isShowing = false;
  }

  todaytrip() {
    this.spinner.show()
    this.service.getallTripsData().subscribe((data: any) => {
      console.log('GET tripsData DATA: ', data)
      // if(date == '2022-07-28 18:29:00')
      if (data.success == true) {
        this.spinner.hide();
        this.tabledata = data.list;
        console.log("this.ta", this.tabledata)
        this.dataSource = new MatTableDataSource(this.tabledata);
        this.setPaginationAndSort()
        console.log('GET tripsData DATA: ', this.dataSource)
      } else {
        console.log("No Records Found Of trips Data");
      }
    }, (error: HttpErrorResponse) => {
      console.log("Something went wrong");
    })
  }

  filterdat(t) {
    return moment(t).format('L');
  }

  getallTrips() {    
    this.spinner.show()
    this.service.getallTripsData().subscribe((data: any) => {
      console.log('GET tripsData DATA: ', data)
      if (data.success == true) {        
        this.tabledata = data.list;
        this.dataSource = new MatTableDataSource(this.tabledata);
        this.setPaginationAndSort()
        ///////////
        const d = new Date();
        const dm = moment(d).format('L');
        console.log("d", dm)
        var finalData = [];
        this.tabledata.forEach(element => {
          var trimDate = this.filterdat(element.onwardEndTime);
          if (trimDate === dm) {
            finalData.push(element);
            this.filterdatafortoday = finalData
            if(this.filterdatafortoday.length > 3) {
              this.lengthMore = true
              console.log("sad", this.lengthMore)
            }
            this.slides = this.chunk(this.filterdatafortoday, 3);
            console.log("-slides", this.slides)
          }
        });
        this.spinner.hide();
      } else {
        // this.toastr.info("No Records Found");
        console.log("No Records Found Of trips Data");

      }
    }, (error: HttpErrorResponse) => {
      this.spinner.hide();
      console.log("Something went wrong");
    })
  }

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  setPaginationAndSort() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTodayTrips() {

    this.spinner.show()
    const data = {
      "toTime": "2022-07-28 18:29:00",
      "fromTime": "2022-07-26 18:29:00",
      "userId": 869
    }

    this.service.gettodayTripsData(data).subscribe((data: any) => {

      console.log('GET today tripsData DATA: ', data)
      if (data.success == true) {
        this.spinner.hide();
        this.todaytripdata = data.list;
        console.log('GET today tripsData DATA: ', this.todaytripdata)
      } else {
        // this.toastr.info("No Records Found");
        console.log("No Records Found Of trips Data");

      }
    }, (error: HttpErrorResponse) => {
      console.log("Something went wrong");
      this.spinner.hide();
    })
  }

  //view Trip details data based on id 
  viewCustomer(data) {
    console.log("Checkin trip 1`: ", data.tripId)
    // return;
    this.router.navigate(["/pages/Trips-detail"],
      {
        queryParams: { data: btoa(JSON.stringify(data)) }
      });
  }

}
